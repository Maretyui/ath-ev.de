-- ATH Database Setup Script
-- Run this against your MySQL database to set up all required tables

CREATE DATABASE IF NOT EXISTS ath_berichte;
USE ath_berichte;

-- Admin users table (for login/auth)
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin', 'manager') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Members table (Mitgliederliste)
CREATE TABLE IF NOT EXISTS members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  adresse TEXT DEFAULT '',
  geburtstag DATE DEFAULT NULL,
  telefon VARCHAR(100) DEFAULT '',
  mitglied_seit DATE DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Berichte/News table
CREATE TABLE IF NOT EXISTS berichte (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(500) DEFAULT 'https://placehold.co/600x400',
  alt VARCHAR(255) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Termine/Events table
CREATE TABLE IF NOT EXISTS termine (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(500) DEFAULT 'https://placehold.co/600x400',
  alt VARCHAR(255) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default manager account (password: admin123 - CHANGE THIS!)
-- The bcrypt hash below is for 'admin123'
INSERT INTO admin_users (email, password_hash, role) VALUES
('admin@ath-ev.de', '$2a$12$LJ3m4ys5Rn9GZChXwEKXzOCPQPxKbS.zQnLy8kX0AQXQK7YLqKfHe', 'manager')
ON DUPLICATE KEY UPDATE email = email;
