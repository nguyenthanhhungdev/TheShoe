Khi kiểm tra số lượng tồn kho trong database thì có vi phạm Dependency Rule trong Clean Architecture không
===
Đây là một câu hỏi rất hay và chạm đúng vào một điểm tranh luận phổ biến khi áp dụng Clean Architecture với các hệ thống CSDL quan hệ, đặc biệt là khi xử lý các ràng buộc liên quan đến trạng thái dữ liệu thay đổi liên tục (như tồn kho).

**Câu trả lời ngắn gọn:** Việc đặt kiểm tra tồn kho (`p.stock_quantity >= $3`) bên trong Prepared Statement `add_or_update_cart_item` **không nhất thiết vi phạm** nguyên tắc cốt lõi của Clean Architecture, và trong nhiều trường hợp, đây là **giải pháp thực tế và hiệu quả nhất** để đảm bảo tính toàn vẹn dữ liệu và tránh race condition.

**Giải thích chi tiết:**

1.  **Phân biệt Loại Validation:**
    *   **Domain Logic Validation (Business Rule Validation):** Đây là loại validation thuộc về tầng Domain/Use Case. Nó xác định các quy tắc bất biến của nghiệp vụ *không phụ thuộc vào trạng thái hiện tại của cơ sở dữ liệu*. Ví dụ:
        *   Số lượng sản phẩm thêm vào giỏ hàng phải là số dương (`quantity > 0`).
        *   Email người dùng phải đúng định dạng.
        *   Tổng giá trị đơn hàng không được âm.
        *   *Lý thuyết:* "Số lượng trong giỏ hàng không được vượt quá một giới hạn tối đa cho phép của sản phẩm đó" (nếu có giới hạn cố định).
    *   **Data Integrity / Concurrency Validation:** Đây là loại validation đảm bảo tính đúng đắn của dữ liệu *tại thời điểm thao tác*, đặc biệt khi có nhiều tiến trình/yêu cầu cùng truy cập và thay đổi dữ liệu. Việc kiểm tra tồn kho *hiện tại* trong CSDL rơi vào loại này.

2.  **Tại sao Kiểm tra Tồn kho trong PS là Hợp lý (và thường là cần thiết):**
    *   **Atomicity (Tính nguyên tử):** Vấn đề cốt lõi của tồn kho là nó có thể thay đổi bất cứ lúc nào bởi các yêu cầu khác. Nếu bạn kiểm tra tồn kho ở tầng Use Case:
        1.  Use Case đọc số lượng tồn kho từ Repository.
        2.  Use Case kiểm tra: `requestedQuantity <= currentStock`.
        3.  Use Case gọi Repository để cập nhật giỏ hàng.
        *   **Vấn đề (Race Condition):** Giữa bước 1 và bước 3, một yêu cầu khác có thể đã mua hết sản phẩm đó. Việc kiểm tra ở Use Case trở nên vô nghĩa vì dữ liệu đã cũ.
    *   **Đảm bảo tại Nguồn (Source of Truth):** CSDL là nơi lưu trữ trạng thái cuối cùng và đáng tin cậy nhất của tồn kho. Thực hiện kiểm tra và cập nhật trong cùng một thao tác CSDL (nhờ `WITH`, `FOR UPDATE`, và `INSERT...ON CONFLICT...DO UPDATE` trong PS) đảm bảo rằng việc kiểm tra và hành động diễn ra một cách nguyên tử, dựa trên trạng thái *chính xác* tại thời điểm đó. `FOR UPDATE` khóa dòng Product lại, ngăn không cho giao dịch khác thay đổi tồn kho trong khi giao dịch hiện tại đang kiểm tra và cập nhật CartItem.
    *   **Hiệu năng:** Giảm số lượt gọi đến CSDL (không cần đọc tồn kho riêng rồi mới cập nhật giỏ hàng).

3.  **Clean Architecture và Sự Thực tế:**
    *   **Dependency Rule:** Nguyên tắc quan trọng nhất là Use Case/Domain không phụ thuộc vào Infrastructure (Database). Điều này vẫn được đảm bảo. Use Case chỉ gọi một phương thức trừu tượng trên Repository (ví dụ: `cartRepository.addItem(cartId, productId, quantity)`). Use Case không biết về sự tồn tại của PS `add_or_update_cart_item` hay `FOR UPDATE`. Việc triển khai phương thức Repository đó sử dụng PS là chi tiết của tầng Infrastructure.
    *   **Trách nhiệm:** Use Case vẫn chịu trách nhiệm *khởi tạo* hành động ("thêm sản phẩm vào giỏ") và *xử lý kết quả* (thành công hoặc lỗi - ví dụ: lỗi "Không đủ tồn kho"). Logic nghiệp vụ chính vẫn nằm ở Use Case. Tuy nhiên, việc *đảm bảo tính nhất quán của dữ liệu trong môi trường đồng thời* là một trách nhiệm mà tầng Infrastructure (cụ thể là CSDL) thực hiện hiệu quả nhất cho trường hợp này.
    *   **"Leaky Abstraction"?** Có thể coi đây là một "rò rỉ" nhỏ, vì Repository có thể trả về một lỗi cụ thể ("Insufficient Stock") mà nguyên nhân sâu xa là do logic bên trong PS. Tuy nhiên, đây là sự đánh đổi cần thiết để có được sự đúng đắn và hiệu năng. Use Case vẫn xử lý lỗi này như một lỗi nghiệp vụ thông thường.

**Kết luận:**

Việc đặt kiểm tra tồn kho (một dạng Data Integrity/Concurrency Validation) bên trong Prepared Statement là một **kỹ thuật phổ biến và được chấp nhận** trong các kiến trúc như Clean Architecture khi xử lý trạng thái dữ liệu dễ thay đổi và cần tính nguyên tử cao. Nó không vi phạm nguyên tắc cốt lõi về Dependency Rule và giúp giải quyết hiệu quả vấn đề race condition, đảm bảo dữ liệu luôn nhất quán tại tầng Persistence. Use Case vẫn giữ vai trò điều phối và xử lý logic nghiệp vụ chính.