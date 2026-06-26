-- Task 6: Full Stack App - Database Setup
-- Run this in MySQL Workbench first!

CREATE DATABASE IF NOT EXISTS saiket_task6;
USE saiket_task6;

CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(100) NOT NULL UNIQUE,
  age        INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- sample data
INSERT INTO users (name, email, age) VALUES
('Mohamed Ismail', 'ismail@example.com', 21),
('Rahul Kumar',    'rahul@example.com',  24);
