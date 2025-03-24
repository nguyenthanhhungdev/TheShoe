-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  image_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO users (username, email, password_hash) VALUES
  ('testuser', 'test@example.com', '$2a$10$rBV2JDeWW3.rKyXFPEyhr.Sox3tFkV0rz5FDJlBGMjQHxFzDysU2e'), -- password: password123
  ('admin', 'admin@example.com', '$2a$10$GMfV9aLnYpFnTL5Tk4Qj0eqZVY9qYsKMcWxLCfGJRRqoGMrHapMxW'); -- password: admin123

INSERT INTO products (name, description, price, stock_quantity, image_url) VALUES
  ('Air Max 90', 'Classic Nike Air Max 90 sneakers', 129.99, 50, 'airmax90.jpg'),
  ('Ultra Boost', 'Adidas Ultra Boost running shoes', 179.99, 25, 'ultraboost.jpg'),
  ('Classic Leather', 'Reebok Classic Leather sneakers', 89.99, 35, 'classic-leather.jpg'),
  ('Chuck Taylor', 'Converse Chuck Taylor All Star', 59.99, 100, 'chuck-taylor.jpg');