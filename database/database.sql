DROP DATABASE senselib;
CREATE DATABASE IF NOT EXISTS senselib;
USE senselib;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password, email)
VALUES ('admin', 'admin123', 'admin@example.com')
ON DUPLICATE KEY UPDATE id=id;

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_size VARCHAR(50),
  file_type VARCHAR(50),
  category VARCHAR(100),
  author VARCHAR(255),
  pages INT,
  downloads INT DEFAULT 0,
  image VARCHAR(255),
  link_file VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  document_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  likes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample documents
INSERT INTO documents (title, description, file_size, file_type, category, author, pages, image, link_file)
VALUES 
('Lập trình Python cơ bản', 'Tài liệu hướng dẫn Python từ cơ bản đến nâng cao, phù hợp cho người mới bắt đầu.', '2.5MB', 'PDF', 'programming','John Doe', 150,'/img/product/python cơ bản.png', '/data/Python cơ bản.pdf'),
('Introduction to Programming', 'A comprehensive guide to programming basics', '2.5MB', 'PDF', 'Programming', 'John Doe', 150, '/placeholder.svg', '/files/intro.pdf'),
('Web Development Fundamentals', 'Learn the basics of web development', '3.1MB', 'PDF', 'Web Development', 'Jane Smith', 200, '/placeholder.svg', '/files/web-dev.pdf'),
('Data Structures and Algorithms', 'Advanced concepts in computer science', '4.2MB', 'PDF', 'Computer Science', 'Mike Johnson', 300, '/placeholder.svg', '/files/dsa.pdf')
ON DUPLICATE KEY UPDATE id=id;

-- Insert sample comments
INSERT INTO comments (document_id, user_id, content, likes)
VALUES 
(1, 1, 'Great introduction to programming concepts!', 15),
(1, 1, 'Very helpful for beginners.', 8),
(2, 1, 'Clear explanations and good examples.', 12),
(3, 1, 'Excellent coverage of data structures.', 20)
ON DUPLICATE KEY UPDATE id=id; 

CREATE TABLE IF NOT EXISTS admin (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL ,
  password VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO admin (username, password, email)
VALUES ('admin', 'admin', 'admin@example.com')
ON DUPLICATE KEY UPDATE id=id;

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`) VALUES
(1, 'Programming', 'programming', 'Programming languages and development tools', '2025-05-17 02:05:59'),
(2, 'AI & ML', 'ai-ml', 'Artificial Intelligence and Machine Learning', '2025-05-17 02:05:59'),
(3, 'Database', 'database', 'Database management and design', '2025-05-17 02:05:59'),
(4, 'DevOps', 'devops', 'Development Operations and Infrastructure', '2025-05-17 02:05:59');
