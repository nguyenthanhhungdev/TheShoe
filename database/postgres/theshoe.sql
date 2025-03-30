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