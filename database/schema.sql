-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS senselib;
USE senselib;

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_size VARCHAR(50),
    file_type VARCHAR(50),
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some default categories
INSERT INTO categories (name, slug, description) VALUES
('Programming', 'programming', 'Programming languages and development tools'),
('AI & ML', 'ai-ml', 'Artificial Intelligence and Machine Learning'),
('Database', 'database', 'Database management and design'),
('DevOps', 'devops', 'Development Operations and Infrastructure');

-- Insert some sample documents
INSERT INTO documents (title, description, file_size, file_type, category) VALUES
('Lập trình Python cơ bản', 'Tài liệu hướng dẫn Python từ cơ bản đến nâng cao, phù hợp cho người mới bắt đầu.', '2.5MB', 'PDF', 'programming'),
('Machine Learning với TensorFlow', 'Hướng dẫn thực hành về Machine Learning sử dụng TensorFlow framework.', '3.8MB', 'PDF', 'ai-ml'); 