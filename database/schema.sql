-- Create the database if it doesn't exist
DROP DATABASE IF NOT EXISTS senselib;
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    image VARCHAR(99),
    link_fille VARCHAR(99)
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
INSERT INTO documents (title, description, file_size, file_type, category, image, link_fille) VALUES
('Lập trình Python cơ bản', 'Tài liệu hướng dẫn Python từ cơ bản đến nâng cao, phù hợp cho người mới bắt đầu.', '2.5MB', 'PDF', 'programming','/img/product/python cơ bản.png','/data/Python cơ bản.pdf'),
('Machine Learning với TensorFlow', 'Hướng dẫn thực hành về Machine Learning sử dụng TensorFlow framework.', '3.8MB', 'PDF', 'ai-ml'); 

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password, email, role)
VALUES ('admin', 'admin123', 'admin@example.com', 'admin')
ON DUPLICATE KEY UPDATE id=id;


CREATE TABLE IF NOT EXISTS admin (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO admin (username, password, email)
VALUES ('admin', '$2b$10$wQwQwQwQwQwQwQwQwQwQOQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQw', 'admin@example.com')
ON DUPLICATE KEY UPDATE id=id;