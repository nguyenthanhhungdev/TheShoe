-- Kích hoạt extension unaccent nếu chưa có
CREATE EXTENSION IF NOT EXISTS unaccent;



-- Tạo text search configuration tùy chỉnh nếu chưa có (ví dụ: vietnamese_unaccent)
CREATE TEXT SEARCH CONFIGURATION vietnamese_unaccent (COPY = simple);
ALTER TEXT SEARCH CONFIGURATION vietnamese_unaccent ALTER MAPPING FOR hword, hword_part, word WITH unaccent, simple, vietnamese_stem;
-- Lưu ý: Lệnh tạo configuration thường được chạy một lần riêng biệt, không nhất thiết trong script này.
