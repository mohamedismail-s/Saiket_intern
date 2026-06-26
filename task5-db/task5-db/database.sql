-- Task 5: Database Integration
-- Mohamed Ismail | SaiKet Systems Internship
-- Run this file first in MySQL Workbench or CMD

-- create the database
CREATE DATABASE IF NOT EXISTS saiket_task5;

-- use it
USE saiket_task5;

-- create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  age INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- insert some sample data
INSERT INTO users (name, email, age) VALUES
('Mohamed Ismail', 'ismail@example.com', 21),
('Yogesh Nimankar', 'yogesh@example.com', 28),
('Rahul Kumar', 'rahul@example.com', 24);
