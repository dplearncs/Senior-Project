-- Inserting sample data for customers
INSERT INTO customers (first_name, email, password) VALUES
('John', 'john@example.com', 'password123'),
('Alice', 'alice@example.com', 'securepass'),
('Bob', 'bob@example.com', 'bobspassword');

-- Inserting sample data for boxes
INSERT INTO box (box_name, total_items, description, customer_id) VALUES
('Living Room Cabinet', 5, 'Storage cabinet in the living room', 1),
('Kitchen Pantry', 5, 'Pantry cupboard in the kitchen', 1),
('Bedroom Closet', 5, 'Closet in the bedroom', 1),
('Storage Room', 5, 'Room for storing various items', 2),
('Garage Shelf', 5, 'Shelf in the garage', 2),
('Attic Storage', 5, 'Storage space in the attic', 2),
('Office Cabinet', 5, 'Cabinet in the office', 3),
('Basement Storage', 5, 'Storage area in the basement', 3),
('Garden Shed', 5, 'Shed in the garden', 3);

-- Inserting sample data for items
INSERT INTO items (item_name, item_description, box_id) VALUES
('Blue Bottle', 'A blue water bottle', 1),
('HDMI Cable', 'High-definition multimedia interface cable', 1),
('Playstation Controller', 'Wireless controller for Playstation gaming console', 1),
('Laptop', 'Personal laptop for work and entertainment', 1),
('T-shirt', 'Blue T-shirt', 1),
('Cookware Set', 'Complete set of pots, pans, and cooking utensils', 2),
('Cutlery Set', 'Set of knives, forks, and spoons', 2),
('Coffee Maker', 'Automatic coffee maker', 2),
('Books', 'A collection of novels and magazines', 3),
('Utensils', 'Kitchen utensils and cooking tools', 3),
('Clothing', 'Assorted clothing items', 3),
('Blue Bottle', 'A blue water bottle', 4),
('HDMI Cable', 'High-definition multimedia interface cable', 4),
('Playstation Controller', 'Wireless controller for Playstation gaming console', 4),
('Laptop', 'Personal laptop for work and entertainment', 4),
('T-shirt', 'Blue T-shirt', 4),
('Cookware Set', 'Complete set of pots, pans, and cooking utensils', 5),
('Cutlery Set', 'Set of knives, forks, and spoons', 5),
('Coffee Maker', 'Automatic coffee maker', 5),
('Books', 'A collection of novels and magazines', 6),
('Utensils', 'Kitchen utensils and cooking tools', 6),
('Clothing', 'Assorted clothing items', 6),
('Blue Bottle', 'A blue water bottle', 7),
('HDMI Cable', 'High-definition multimedia interface cable', 7),
('Playstation Controller', 'Wireless controller for Playstation gaming console', 7),
('Laptop', 'Personal laptop for work and entertainment', 7),
('T-shirt', 'Blue T-shirt', 7),
('Cookware Set', 'Complete set of pots, pans, and cooking utensils', 8),
('Cutlery Set', 'Set of knives, forks, and spoons', 8),
('Coffee Maker', 'Automatic coffee maker', 8),
('Books', 'A collection of novels and magazines', 9),
('Utensils', 'Kitchen utensils and cooking tools', 9),
('Clothing', 'Assorted clothing items', 9);
