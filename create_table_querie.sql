-- Customers Table
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100)
);

-- Box Table (formerly Containers Table)
CREATE TABLE box (
    box_id INT AUTO_INCREMENT PRIMARY KEY,
    box_name VARCHAR(100),
    total_items INT,
    description TEXT,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Items Table
CREATE TABLE items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100),
    item_description TEXT,
    box_id INT,
    FOREIGN KEY (box_id) REFERENCES box(box_id)
);
