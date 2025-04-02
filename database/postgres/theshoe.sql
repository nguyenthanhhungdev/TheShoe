-- Kích hoạt extension unaccent nếu chưa có
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Tạo bảng User
CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    sodienthoai VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Role
CREATE TABLE "Role" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng UserRole
CREATE TABLE "UserRole" (
    user_id UUID,
    role_id UUID,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES "User"(id),
    FOREIGN KEY (role_id) REFERENCES "Role"(id)
);

-- Tạo bảng Product
CREATE TABLE "Product" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    stock_price DECIMAL(10,2) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    FOREIGN KEY category_id UUID REFERENCES "Category"(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Order
CREATE TABLE "Order" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    FOREIGN KEY user_id UUID REFERENCES "User"(id),
    status VARCHAR(20) CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    total_amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY discount_code_id UUID REFERENCES "DiscountCode"(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng OrderDetail
CREATE TABLE "OrderDetail" (
    order_id UUID,
    product_id UUID,
    quantity INT,
    price_at_purchase DECIMAL(10,2),
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES "Order"(id),
    FOREIGN KEY (product_id) REFERENCES "Product"(id)
);

-- Tạo bảng Category
CREATE TABLE "Category" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Address
CREATE TABLE "Address" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    FOREIGN KEY user_id UUID REFERENCES "User"(id) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Payment
CREATE TABLE "Payment" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    FOREIGN KEY order_id UUID REFERENCES "Order"(id) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    method VARCHAR(50) CHECK (method IN ('credit_card', 'ewallet', 'cash')),
    status VARCHAR(20) CHECK (status IN ('success', 'failed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Shipping
CREATE TABLE "Shipping" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    FOREIGN KEY order_id UUID REFERENCES "Order"(id) NOT NULL,
    FOREIGN KEY address_id UUID REFERENCES "Address"(id) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'shipping', 'delivered')),
    FOREIGN KEY shipper_id UUID REFERENCES "User"(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Promotion
CREATE TABLE "Promotion" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    discount_percentage DECIMAL(5,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng DiscountCode
CREATE TABLE "DiscountCode" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL,
    discount_percentage DECIMAL(5,2) NOT NULL,
    max_uses INT NOT NULL,
    uses_count INT DEFAULT 0,
    min_order_value DECIMAL(10,2),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

-- Tạo bảng Review
CREATE TABLE "Review" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    FOREIGN KEY product_id UUID REFERENCES "Product"(id) NOT NULL,
    FOREIGN KEY user_id UUID REFERENCES "User"(id) NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Wishlist
CREATE TABLE "Wishlist" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    FOREIGN KEY user_id UUID REFERENCES "User"(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng Cart
CREATE TABLE "Cart" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    FOREIGN Key user_id UUID REFERENCES "User"(id) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Bảng trung gian CartItem (N:M)
CREATE TABLE "CartItem" (
    FOREIGN KEY cart_id UUID REFERENCES "Cart"(id),
    FOREIGN KEY product_id UUID REFERENCES "Product"(id),
    quantity INT NOT NULL,
    PRIMARY KEY (cart_id, product_id)
);

-- Bảng trung gian PromotionProduct (N:M)
CREATE TABLE "PromotionProduct" (
    FOREIGN KEY promotion_id UUID REFERENCES "Promotion"(id),
    FOREIGN KEY product_id UUID REFERENCES "Product"(id),
    PRIMARY KEY (promotion_id, product_id)
);

-- Bảng trung gian RolePermission (N:M)
CREATE TABLE "RolePermission" (
    FOREIGN KEY role_id UUID REFERENCES "Role"(id),
    FOREIGN KEY permission_id UUID REFERENCES "Permission"(id),
    PRIMARY KEY (role_id, permission_id)
);


-- Tạo bảng Permission
CREATE TABLE "Permission" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE PROCEDURE sp_update_order_status(
    p_order_id UUID,
    p_new_status VARCHAR(20)
)
LANGUAGE plpgsql
AS $$
BEGINTừ 1. Stored Procedures (SP) Hợp Lệ trong file đã cung cấp hãy viết plsql trong postgres
    -- Kiểm tra xem trạng thái mới có hợp lệ không (tùy chọn, có thể thêm kiểm tra dựa trên CHECK constraint)
    IF p_new_status NOT IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled') THEN
        RAISE EXCEPTION 'Trạng thái đơn hàng không hợp lệ: %', p_new_status;
    END IF;

    UPDATE "Order"
    SET status = p_new_status,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_order_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Không tìm thấy đơn hàng với ID: %', p_order_id;
    END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE sp_remove_from_cart(
    p_cart_id UUID,
    p_product_id UUID
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM "CartItem"
    WHERE cart_id = p_cart_id AND product_id = p_product_id;

    IF NOT FOUND THEN
        RAISE WARNING 'Không tìm thấy sản phẩm (ID: %) trong giỏ hàng (ID: %)', p_product_id, p_cart_id;
    END IF;

    -- Cập nhật thời gian updated_at cho giỏ hàng (tùy chọn)
    UPDATE "Cart"
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = p_cart_id;
END;
$$;

CREATE OR REPLACE PROCEDURE sp_add_address(
    p_user_id UUID,
    p_street VARCHAR(255),
    p_city VARCHAR(100),
    p_postal_code VARCHAR(20),
    p_is_default BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Kiểm tra user tồn tại
    IF NOT EXISTS (SELECT 1 FROM "User" WHERE id = p_user_id) THEN
        RAISE EXCEPTION 'Người dùng không tồn tại';
    END IF;

    IF p_is_default THEN
        UPDATE "Address"
        SET is_default = false
        WHERE user_id = p_user_id;
    END IF;

    INSERT INTO "Address" (user_id, street, city, postal_code, is_default)
    VALUES (p_user_id, p_street, p_city, p_postal_code, p_is_default);
END;
$$;

CREATE OR REPLACE PROCEDURE sp_set_default_address(
    p_user_id UUID,
    p_address_id UUID
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Bỏ cờ mặc định cho tất cả địa chỉ khác của người dùng
    UPDATE "Address"
    SET is_default = false,
        updated_at = CURRENT_TIMESTAMP
    WHERE user_id = p_user_id AND id <> p_address_id AND is_default = true;

    -- Đặt cờ mặc định cho địa chỉ được chỉ định
    UPDATE "Address"
    SET is_default = true,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_address_id AND user_id = p_user_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Không tìm thấy địa chỉ với ID: % cho người dùng ID: %', p_address_id, p_user_id;
    END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE sp_create_payment(
    p_order_id UUID,
    p_amount DECIMAL(10,2),
    p_method VARCHAR(50),
    p_status VARCHAR(20)
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Kiểm tra giá trị hợp lệ cho method và status (tùy chọn, có thể thêm kiểm tra dựa trên CHECK constraint)
    IF p_method NOT IN ('credit_card', 'ewallet', 'cash') THEN
        RAISE EXCEPTION 'Phương thức thanh toán không hợp lệ: %', p_method;
    END IF;
    IF p_status NOT IN ('success', 'failed') THEN
        RAISE EXCEPTION 'Trạng thái thanh toán không hợp lệ: %', p_status;
    END IF;

    INSERT INTO "Payment" (order_id, amount, method, status)
    VALUES (p_order_id, p_amount, p_method, p_status);
END;
$$;

CREATE OR REPLACE PROCEDURE sp_update_payment_status(
    p_payment_id UUID,
    p_new_status VARCHAR(20)
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Kiểm tra giá trị hợp lệ cho status (tùy chọn)
    IF p_new_status NOT IN ('success', 'failed') THEN
        RAISE EXCEPTION 'Trạng thái thanh toán không hợp lệ: %', p_new_status;
    END IF;

    UPDATE "Payment"
    SET status = p_new_status
    -- Không cập nhật updated_at vì bảng Payment không có trường này, chỉ có created_at
    WHERE id = p_payment_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Không tìm thấy thanh toán với ID: %', p_payment_id;
    END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE sp_assign_shipper(
    p_order_id UUID,
    p_shipper_id UUID
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Kiểm tra shipper có role phù hợp
    IF NOT EXISTS (
        SELECT 1 FROM "UserRole" ur
        JOIN "Role" r ON ur.role_id = r.id
        WHERE ur.user_id = p_shipper_id AND r.name = 'shipper'
    ) THEN
        RAISE EXCEPTION 'Người dùng không phải shipper';
    END IF;

    UPDATE "Shipping"
    SET shipper_id = p_shipper_id
    WHERE order_id = p_order_id;
END;
$$;

CREATE OR REPLACE PROCEDURE sp_update_shipping_status(
    p_shipping_id UUID,
    p_new_status VARCHAR(20)
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Kiểm tra giá trị hợp lệ cho status (tùy chọn)
    IF p_new_status NOT IN ('pending', 'shipping', 'delivered') THEN
        RAISE EXCEPTION 'Trạng thái giao hàng không hợp lệ: %', p_new_status;
    END IF;

    UPDATE "Shipping"
    SET status = p_new_status,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_shipping_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Không tìm thấy bản ghi giao hàng với ID: %', p_shipping_id;
    END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE sp_register_user(
    p_name VARCHAR(100),
    p_email VARCHAR(255),
    p_sodienthoai VARCHAR(20),
    p_hashed_password VARCHAR(255) -- Nhận mật khẩu đã được mã hóa
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_new_user_id UUID;
BEGIN
    -- Kiểm tra email và số điện thoại đã tồn tại chưa (có thể xử lý lỗi UNIQUE constraint)
    IF EXISTS (SELECT 1 FROM "User" WHERE email = p_email) THEN
        RAISE EXCEPTION 'Email đã tồn tại: %', p_email;
    END IF;
    IF EXISTS (SELECT 1 FROM "User" WHERE sodienthoai = p_sodienthoai) THEN
        RAISE EXCEPTION 'Số điện thoại đã tồn tại: %', p_sodienthoai;
    END IF;

    INSERT INTO "User" (name, email, sodienthoai, password)
    VALUES (p_name, p_email, p_sodienthoai, p_hashed_password)
    RETURNING id INTO v_new_user_id;

    -- Có thể trả về ID người dùng mới nếu cần
    -- RAISE NOTICE 'Đã đăng ký người dùng mới với ID: %', v_new_user_id;

    -- Tự động tạo giỏ hàng cho người dùng mới
    INSERT INTO "Cart" (user_id) VALUES (v_new_user_id);
    -- Tự động tạo danh sách yêu thích cho người dùng mới
    INSERT INTO "Wishlist" (user_id) VALUES (v_new_user_id);

END;
$$;

CREATE OR REPLACE PROCEDURE sp_update_user_profile(
    p_user_id UUID,
    p_name VARCHAR(100)
    -- Có thể thêm các trường khác cần cập nhật nếu muốn, ví dụ: avatar_url,...
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE "User"
    SET name = p_name,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_user_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Không tìm thấy người dùng với ID: %', p_user_id;
    END IF;
END;
$$;


CREATE OR REPLACE FUNCTION fn_check_stock(
    p_product_id UUID,
    p_requested_quantity INT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
    v_current_stock INT;
BEGIN
    SELECT stock_quantity INTO v_current_stock
    FROM "Product"
    WHERE id = p_product_id;

    IF NOT FOUND THEN
        -- Xử lý trường hợp không tìm thấy sản phẩm (có thể trả về FALSE hoặc raise exception)
        RETURN FALSE;
        -- RAISE EXCEPTION 'Không tìm thấy sản phẩm với ID: %', p_product_id;
    END IF;

    RETURN v_current_stock >= p_requested_quantity;
END;
$$;

-- Cách sử dụng ví dụ:
-- SELECT fn_check_stock('your-product-uuid', 5);

CREATE OR REPLACE FUNCTION fn_search_products(
    p_search_term TEXT DEFAULT NULL,         -- Từ khóa tìm kiếm trong tên hoặc mô tả
    p_category_id UUID DEFAULT NULL,         -- Lọc theo ID danh mục
    p_min_price DECIMAL(10, 2) DEFAULT NULL, -- Giá tối thiểu
    p_max_price DECIMAL(10, 2) DEFAULT NULL  -- Giá tối đa
)
RETURNS SETOF "Product" -- Trả về một tập hợp các dòng từ bảng Product
LANGUAGE sql STABLE -- STABLE vì nó không sửa đổi dữ liệu và luôn trả về kết quả giống nhau cho cùng input trong một transaction
AS $$
SELECT *
FROM "Product"
WHERE
    (p_search_term IS NULL OR name ILIKE '%' || p_search_term || '%' OR description ILIKE '%' || p_search_term || '%')
AND
    (p_category_id IS NULL OR category_id = p_category_id)
AND
    (p_min_price IS NULL OR price >= p_min_price)
AND
    (p_max_price IS NULL OR price <= p_max_price)
ORDER BY created_at DESC; -- Sắp xếp theo sản phẩm mới nhất (tùy chọn)
$$;

-- Cách sử dụng ví dụ:
-- SELECT * FROM fn_search_products(p_search_term := 'áo', p_max_price := 500.00);
-- SELECT * FROM fn_search_products(p_category_id := 'your-category-uuid');
-- SELECT * FROM fn_search_products(p_min_price := 100.00, p_max_price := 200.00);

-- Tạo các index

-- Bảng Order
CREATE INDEX idx_order_user ON "Order" (user_id);
CREATE INDEX idx_order_discount_code ON "Order" (discount_code_id);
CREATE INDEX idx_order_status ON "Order" (status);
CREATE INDEX idx_order_created_at ON "Order" (created_at);

-- Bảng Product
CREATE INDEX idx_product_category ON "Product" (category_id);

-- Bảng Address
CREATE INDEX idx_address_user ON "Address" (user_id);

-- Bảng Payment
CREATE INDEX idx_payment_order ON "Payment" (order_id);

-- Bảng Shipping
CREATE INDEX idx_shipping_order ON "Shipping" (order_id);
CREATE INDEX idx_shipping_address ON "Shipping" (address_id);
CREATE INDEX idx_shipping_shipper ON "Shipping" (shipper_id);

-- Bảng Review
CREATE INDEX idx_review_product ON "Review" (product_id);
CREATE INDEX idx_review_user ON "Review" (user_id);

-- Bảng Wishlist
CREATE INDEX idx_wishlist_user ON "Wishlist" (user_id);

-- Bảng Cart
CREATE INDEX idx_cart_user ON "Cart" (user_id);

-- Bảng OrderDetail
CREATE INDEX idx_orderdetail_product ON "OrderDetail" (product_id);

-- Bảng CartItem
CREATE INDEX idx_cartitem_cart ON "CartItem" (cart_id);
CREATE INDEX idx_cartitem_product ON "CartItem" (product_id);

-- Bảng PromotionProduct
CREATE INDEX idx_promotionproduct_promotion ON "PromotionProduct" (promotion_id);
CREATE INDEX idx_promotionproduct_product ON "PromotionProduct" (product_id);

-- Thêm các index mới
-- Address
CREATE INDEX idx_address_user_default ON "Address" (user_id, is_default);

-- Payment
CREATE INDEX idx_payment_status ON "Payment" (status);

-- Shipping
CREATE INDEX idx_shipping_status ON "Shipping" (status);
CREATE INDEX idx_shipping_shipper_status ON "Shipping" (shipper_id, status);

-- DiscountCode
CREATE INDEX idx_discountcode_dates ON "DiscountCode" (start_date, end_date);

-- Promotion
CREATE INDEX idx_promotion_dates ON "Promotion" (start_date, end_date);

-- UserRole
CREATE INDEX idx_userrole_composite ON "UserRole" (user_id, role_id);

-- Tạo các index cho truy vấn thường xuyên

-- User:
-- Index cho vai trò (role) thông qua bảng UserRole
-- Tạo index cho user_id (đã là một phần của PK tổ hợp, nhưng có thể cần index riêng)
CREATE INDEX idx_userrole_user ON "UserRole" (user_id);

-- Tạo index cho role_id để tối ưu truy vấn lọc theo vai trò
CREATE INDEX idx_userrole_role ON "UserRole" (role_id);

-- 3. Composite index cho cả user_id và role_id (nếu cần truy vấn kết hợp)
CREATE INDEX idx_userrole_user_role ON "UserRole" (user_id, role_id);

-- Product:

-- 1. Tạo Full-Text Index cho cột name (và description nếu cần tìm kiếm cả mô tả)
-- Sử dụng GIN index với cấu hình 'simple' để hỗ trợ tìm kiếm đa ngôn ngữ (bao gồm tiếng Việt cơ bản)
CREATE INDEX idx_product_name_fts ON "Product"
USING GIN (to_tsvector(to_tsvector('vietnamese_unaccent', name) || ' ' || COALESCE(to_tsvector('vietnamese_unaccent', name), '')))
WHERE description IS NOT NULL; -- Chỉ index nếu description tồn tại (tùy chọn)

-- 2. Index cho khóa ngoại category_id
CREATE INDEX idx_product_category ON "Product" (category_id);

-- 3. Index cho cột price (B-tree phù hợp cho khoảng giá)
CREATE INDEX idx_product_price ON "Product" (price);

-- 4. Index cho cột stock_quantity (kiểm tra tồn kho nhanh)
CREATE INDEX idx_product_stock ON "Product" (stock_quantity);

-- 5. Composite Index cho các truy vấn phức tạp (Ví dụ: lọc theo danh mục và giá)
CREATE INDEX idx_product_category_price ON "Product" (category_id, price);

-- Category:
-- Index cho cột name để tìm kiếm/lọc (Tối ưu cho tìm kiếm text tiếng Việt với unaccent)
-- Index này giả định configuration 'vietnamese_unaccent' hoặc tương tự đã tồn tại, hoặc sử dụng unaccent trực tiếp.
CREATE INDEX idx_category_name_fts ON "Category" USING GIN (to_tsvector('vietnamese_unaccent', name)); -- Sử dụng unaccent trực tiếp

