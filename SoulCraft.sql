CREATE DATABASE SoulCraft_Hackathon;
USE SoulCraft_Hackathon;

SHOW TABLES;

CREATE TABLE users (

id INT AUTO_INCREMENT PRIMARY KEY,

full_name VARCHAR(255) NOT NULL,

email VARCHAR(255) UNIQUE NOT NULL,

phone VARCHAR(20) UNIQUE NOT NULL,

password VARCHAR(255) NOT NULL,

address TEXT,

city VARCHAR(100),

state VARCHAR(100),

pincode VARCHAR(10),

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE products (

    id INT AUTO_INCREMENT PRIMARY KEY,

    artisan_id INT NOT NULL,

    title VARCHAR(255) NOT NULL,

    description TEXT,

    price INT NOT NULL,

    image_url TEXT,

    category VARCHAR(150),

    quantity INT DEFAULT 1,

    status VARCHAR(50) DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (artisan_id)
    REFERENCES artisans(id)
);

CREATE TABLE orders (

    id INT AUTO_INCREMENT PRIMARY KEY,

    product_id INT NOT NULL,

    buyer_name VARCHAR(150),

    buyer_phone VARCHAR(20),

    razorpay_order_id VARCHAR(100),

    razorpay_payment_id VARCHAR(100),

    payment_status VARCHAR(50) DEFAULT 'pending',

    amount INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id)
    REFERENCES products(id)

);
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    buyer_name VARCHAR(255),
    buyer_phone VARCHAR(20),
    payment_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (product_id) REFERENCES products(id)
);


CREATE TABLE artisans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150),
    phone VARCHAR(20) UNIQUE,
    whatsapp_number VARCHAR(20),
    email VARCHAR(150),
    upi_id VARCHAR(150),
    razorpay_contact_id VARCHAR(100),
    razorpay_fund_account_id VARCHAR(100),
    village VARCHAR(150),
    district VARCHAR(150),
    state VARCHAR(150),
    craft_type VARCHAR(150),
    profile_image TEXT,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
   

CREATE TABLE logistics (
id INT AUTO_INCREMENT PRIMARY KEY,
order_id INT,
courier VARCHAR(100) DEFAULT 'India Post',
pickup_date DATE,
pickup_time VARCHAR(50),
tracking_status VARCHAR(100) DEFAULT 'Pickup Scheduled',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE whatsapp_messages (

    id INT AUTO_INCREMENT PRIMARY KEY,

    phone VARCHAR(20),

    message TEXT,

    processed BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

SELECT * FROM users;

SELECT * FROM products;
SELECT * FROM orders;


-- Delete all records from Products
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE products;
SET FOREIGN_KEY_CHECKS = 1;


# SQL - Node : server.js , Issue resolve for denied permission
ALTER USER 'root'@'localhost'
IDENTIFIED BY '2255';