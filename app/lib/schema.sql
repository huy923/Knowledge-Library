-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS document_db;
USE document_db;

-- Create the documents table
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

-- Insert some sample data
INSERT INTO documents (title, description, file_size, file_type, category) VALUES
('Introduction to React', 'Learn the basics of React.js framework', '2.5MB', 'PDF', 'programming'),
('Machine Learning Basics', 'A comprehensive guide to ML concepts', '3.2MB', 'PDF', 'ai-ml'),
('Database Design Patterns', 'Best practices for database design', '1.8MB', 'PDF', 'database'),
('DevOps Fundamentals', 'Introduction to DevOps practices', '2.1MB', 'PDF', 'devops'); 