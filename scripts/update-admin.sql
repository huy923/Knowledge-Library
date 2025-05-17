-- Update admin user with hashed password (password: admin123)
UPDATE users 
SET password = '$2b$10$YourHashedPasswordHere' 
WHERE username = 'admin' AND role = 'admin';

-- If admin doesn't exist, create one
INSERT INTO users (username, password, email, role)
SELECT 'admin', '$2b$10$YourHashedPasswordHere', 'admin@example.com', 'admin'
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE username = 'admin' AND role = 'admin'
); 