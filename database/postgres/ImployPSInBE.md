Kiểm tra và Triển khai PS trong BE NestTS với Clean Achitecture
===
Dưới đây là phân tích chi tiết tại sao chúng phù hợp và cách chúng tích hợp tốt:

**Ưu điểm và Sự phù hợp với Clean Architecture:**

1.  **Tách biệt Rõ ràng Trách nhiệm (Separation of Concerns):**
    *   **Infrastructure Layer:** Các PS này nằm gọn trong tầng Infrastructure (cụ thể là tầng Data Access). Chúng là chi tiết triển khai của việc truy cập dữ liệu.
    *   **Repository Pattern:** Các PS này là nền tảng hoàn hảo để triển khai các phương thức trong Repository của bạn. Ví dụ:
        *   `get_user_by_identity` sẽ được gọi bên trong phương thức `findByIdentity(id?, email?, phone?)` của `UserRepository`.
        *   `search_products` sẽ được gọi bên trong `ProductRepository.search(...)`.
        *   `add_or_update_cart_item` sẽ được gọi bên trong `CartRepository.addItem(...)` hoặc `CartRepository.updateItemQuantity(...)`.
    *   **Use Cases/Application Layer:** Tầng Use Case chỉ tương tác với các interface của Repository (ví dụ: `IUserRepository`, `IProductRepository`), hoàn toàn không biết về sự tồn tại của các PS này. Use Case chỉ định nghĩa *cần* dữ liệu gì hoặc *thao tác* gì, còn *cách* lấy/thao tác là việc của Repository và PS.

2.  **Tối ưu hóa Hiệu năng:**
    *   **Pre-compilation:** Postgres biên dịch kế hoạch truy vấn cho PS một lần và tái sử dụng, giúp giảm overhead cho các truy vấn được gọi thường xuyên (`get_user_by_identity`, `search_products`, `update_product_stock`).
    *   **Logic gần Dữ liệu:** Các thao tác phức tạp như tìm kiếm full-text (`search_products`), kiểm tra và cập nhật tồn kho nguyên tử (`update_product_stock`, `add_or_update_cart_item`), áp dụng mã giảm giá (`apply_discount_code`) được thực hiện trực tiếp trong CSDL, nơi có hiệu năng tốt nhất cho các tác vụ này và đảm bảo tính toàn vẹn dữ liệu (atomicity).
    *   **Giảm Network Latency:** Các PS trả về chính xác dữ liệu cần thiết (`RETURNING`), tránh việc phải thực hiện nhiều lượt truy vấn hoặc lấy thừa dữ liệu rồi xử lý ở backend.

3.  **Bảo mật:**
    *   Sử dụng PS với tham số hóa là phương pháp hàng đầu để chống lại tấn công SQL Injection. Driver `pg` của Node.js (hoặc các ORM như TypeORM khi cấu hình đúng) sẽ xử lý việc truyền tham số một cách an toàn.

4.  **Tính Nguyên tử và Đồng bộ (Atomicity & Concurrency):**
    *   Các PS như `update_product_stock`, `add_or_update_cart_item`, `apply_discount_code` được thiết kế để thực hiện nhiều bước kiểm tra và cập nhật trong một thao tác CSDL duy nhất. Điều này cực kỳ quan trọng để tránh race conditions (ví dụ: hai người cùng thêm sản phẩm cuối cùng vào giỏ hàng, hoặc áp dụng mã giảm giá đã hết lượt). Việc sử dụng `FOR UPDATE` trong `add_or_update_cart_item` là một ví dụ điển hình cho việc xử lý đồng bộ đúng đắn ở tầng CSDL.

5.  **Dễ Bảo trì và Quản lý:**
    *   Tập trung logic truy vấn phức tạp vào CSDL giúp mã nguồn backend (NestJS) gọn gàng hơn, tập trung vào business logic và điều phối luồng.
    *   DBA hoặc người quản lý CSDL có thể tối ưu các PS này độc lập mà không cần thay đổi mã nguồn ứng dụng (miễn là signature của PS không đổi).

**Cách Tích hợp vào NestJS:**

Bạn sẽ triển khai các Repository (ví dụ sử dụng TypeORM's `Repository` hoặc custom repository) và trong các phương thức của Repository đó, bạn sẽ sử dụng driver `pg` (hoặc phương thức `query` của TypeORM) để `EXECUTE` các PS này.

*Ví dụ (sử dụng TypeORM và `query`):*

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity'; // Your TypeORM entity
import { User } from './entities/user.entity'; // Your TypeORM entity
import { CartItem } from './entities/cart-item.entity'; // Your TypeORM entity

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User) // Inject if using TypeORM entities, or just Inject DataSource/Connection
        private readonly dataSource: import('typeorm').DataSource, // Inject DataSource
    ) {}

    async findByIdentity(
        id?: string,
        email?: string,
        sodienthoai?: string,
    ): Promise<User | null> {
        const result = await this.dataSource.query(
            'EXECUTE get_user_by_identity($1, $2, $3)',
            [id ?? null, email ?? null, sodienthoai ?? null],
        );
        // query result might be an array, handle accordingly
        return result.length > 0 ? (result[0] as User) : null;
    }

    // ... other methods
}

@Injectable()
export class ProductRepository {
    constructor(
        private readonly dataSource: import('typeorm').DataSource,
    ) {}

    async search(
        searchTerm: string | null,
        categoryId: string | null,
        minPrice: number | null,
        maxPrice: number | null,
        limit: number | null,
        offset: number | null,
    ): Promise<Product[]> {
        return this.dataSource.query(
            'EXECUTE search_products($1, $2, $3, $4, $5, $6)',
            [searchTerm, categoryId, minPrice, maxPrice, limit, offset],
        );
    }

    async updateStock(
        productId: string,
        quantityChange: number,
    ): Promise<{ id: string; name: string; new_quantity: number; price: number; category_id: string } | null> {
        try {
            const result = await this.dataSource.query(
                'EXECUTE update_product_stock($1, $2)',
                [productId, quantityChange],
            );
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            // Handle specific errors like constraint violations (e.g., stock < 0)
            // Re-throw or return a specific error state
            console.error('Error updating stock:', error.message);
            if (error.message.includes('violates check constraint')) { // Example check
                 throw new Error(`Stock update failed for product ${productId}: Insufficient stock or invalid quantity.`);
            }
            throw error; // Re-throw generic errors
        }
    }

    // ... other methods
}


@Injectable()
export class CartRepository {
     constructor(
        private readonly dataSource: import('typeorm').DataSource,
    ) {}

    async addOrUpdateItem(cartId: string, productId: string, quantity: number): Promise<CartItem | null> {
         try {
            const result = await this.dataSource.query(
                'EXECUTE add_or_update_cart_item($1, $2, $3)',
                [cartId, productId, quantity]
            );
            // If the query succeeds but stock is insufficient/validation fails inside the PS,
            // it might return an empty array depending on how the PS is written (especially if validation logic prevents INSERT/UPDATE)
            // Or it might throw an error if constraints are violated.
            // The current PS returns the updated row if successful.
             if (result.length > 0) {
                 // Map the raw result to your CartItem entity/interface if necessary
                 return result[0] as CartItem;
             } else {
                 // This could mean stock was insufficient based on the PS logic
                 // Or the item was removed completely (if quantity + existing resulted in 0 or less)
                 // You might need more specific error handling or return values from the PS.
                 // For now, let's assume insufficient stock if nothing is returned and quantity > 0
                 if (quantity > 0) {
                    throw new Error(`Could not add/update item ${productId} to cart ${cartId}: Insufficient stock or product not found.`);
                 }
                 return null; // Indicate item removal or no change needed
             }
         } catch (error) {
             console.error(`Error adding/updating cart item ${productId}:`, error);
             // Handle potential deadlocks if `FOR UPDATE` causes issues, though less likely with single-row locks.
             throw new Error(`Database error processing cart item ${productId}.`);
         }
    }

     async getItems(cartId: string, limit: number = 20, offset: number = 0): Promise<any[]> { // Define a proper return type/interface
        return this.dataSource.query('EXECUTE get_cart_items($1, $2, $3)', [cartId, limit, offset]);
    }

    // ... other cart methods like remove, summary
}
```

**Lưu ý nhỏ:**

*   **`register_user_basic`**: Như bạn đã ghi chú, PS này chỉ tạo User. Trong Clean Architecture, Use Case `RegisterUser` sẽ cần gọi `UserRepository.create` (sử dụng PS này), và sau đó gọi `CartRepository.create` và `WishlistRepository.create` (nếu có). Hoặc bạn có thể tạo một Stored Procedure `sp_register_user` như đã đề cập để gói gọn tất cả logic này trong CSDL nếu muốn đảm bảo tính nguyên tử tuyệt đối cho cả quá trình đăng ký. Cả hai cách đều hợp lệ.
*   **Quản lý Prepared Statements**: Đảm bảo rằng ứng dụng của bạn `PREPARE` các câu lệnh này một lần khi khởi động hoặc khi kết nối CSDL được thiết lập lần đầu cho một session/pool connection, và `DEALLOCATE` chúng khi không cần thiết hoặc khi kết nối đóng lại. Các connection pool thường có cơ chế quản lý việc này. TypeORM và các ORM/driver khác cũng có thể hỗ trợ tự động.
*   **Xử lý Lỗi**: Repository nên bắt các lỗi CSDL cụ thể (ví dụ: unique constraint violation, check constraint violation như stock âm) và chuyển đổi chúng thành các lỗi nghiệp vụ rõ ràng hơn để Use Case có thể xử lý.

**Kết luận:**

Bộ Prepared Statements này là một ví dụ tuyệt vời về cách tận dụng sức mạnh của CSDL Postgres trong khi vẫn tuân thủ các nguyên tắc của Clean Architecture. Chúng giúp tạo ra một tầng Data Access mạnh mẽ, hiệu quả và an toàn cho ứng dụng NestJS của bạn.