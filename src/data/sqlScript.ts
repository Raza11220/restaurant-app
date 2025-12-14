export const oracleSqlScript = `-- ============================================================
-- RESTAURANT ORDERING SYSTEM - Oracle SQL Database Project
-- 3rd Semester Database Project
-- Normalized to 3NF
-- ============================================================

-- ============================================================
-- SECTION 1: DROP EXISTING OBJECTS (Clean Start)
-- ============================================================

-- Drop triggers first
DROP TRIGGER trg_customers_id;
DROP TRIGGER trg_employees_id;
DROP TRIGGER trg_menu_categories_id;
DROP TRIGGER trg_menu_items_id;
DROP TRIGGER trg_orders_id;
DROP TRIGGER trg_order_items_id;
DROP TRIGGER trg_payments_id;

-- Drop sequences
DROP SEQUENCE seq_customers;
DROP SEQUENCE seq_employees;
DROP SEQUENCE seq_menu_categories;
DROP SEQUENCE seq_menu_items;
DROP SEQUENCE seq_orders;
DROP SEQUENCE seq_order_items;
DROP SEQUENCE seq_payments;

-- Drop views
DROP VIEW vw_order_details;
DROP VIEW vw_daily_sales;
DROP VIEW vw_popular_items;

-- Drop tables (in reverse order of dependencies)
DROP TABLE Payments;
DROP TABLE Order_Items;
DROP TABLE Orders;
DROP TABLE Menu_Items;
DROP TABLE Menu_Categories;
DROP TABLE Employees;
DROP TABLE Customers;

-- ============================================================
-- SECTION 2: CREATE SEQUENCES
-- ============================================================

CREATE SEQUENCE seq_customers START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_employees START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_menu_categories START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_menu_items START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_orders START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_order_items START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_payments START WITH 1 INCREMENT BY 1;

-- ============================================================
-- SECTION 3: CREATE TABLES
-- ============================================================

-- Customers Table
CREATE TABLE Customers (
    customer_id     NUMBER PRIMARY KEY,
    first_name      VARCHAR2(50) NOT NULL,
    last_name       VARCHAR2(50) NOT NULL,
    email           VARCHAR2(100) UNIQUE NOT NULL,
    phone           VARCHAR2(20),
    address         VARCHAR2(200),
    registration_date DATE DEFAULT SYSDATE,
    CONSTRAINT chk_email CHECK (email LIKE '%@%.%')
);

-- Employees Table
CREATE TABLE Employees (
    employee_id     NUMBER PRIMARY KEY,
    first_name      VARCHAR2(50) NOT NULL,
    last_name       VARCHAR2(50) NOT NULL,
    email           VARCHAR2(100) UNIQUE NOT NULL,
    phone           VARCHAR2(20) NOT NULL,
    position        VARCHAR2(50) NOT NULL,
    hire_date       DATE DEFAULT SYSDATE,
    salary          NUMBER(10,2) NOT NULL,
    CONSTRAINT chk_emp_email CHECK (email LIKE '%@%.%'),
    CONSTRAINT chk_salary CHECK (salary > 0),
    CONSTRAINT chk_position CHECK (position IN ('Manager', 'Chef', 'Waiter', 'Cashier', 'Host'))
);

-- Menu Categories Table
CREATE TABLE Menu_Categories (
    category_id     NUMBER PRIMARY KEY,
    category_name   VARCHAR2(50) NOT NULL UNIQUE,
    description     VARCHAR2(200)
);

-- Menu Items Table
CREATE TABLE Menu_Items (
    item_id         NUMBER PRIMARY KEY,
    category_id     NUMBER NOT NULL,
    item_name       VARCHAR2(100) NOT NULL,
    description     VARCHAR2(300),
    price           NUMBER(8,2) NOT NULL,
    is_available    CHAR(1) DEFAULT 'Y',
    CONSTRAINT fk_menu_category FOREIGN KEY (category_id) 
        REFERENCES Menu_Categories(category_id),
    CONSTRAINT chk_price CHECK (price > 0),
    CONSTRAINT chk_available CHECK (is_available IN ('Y', 'N'))
);

-- Orders Table
CREATE TABLE Orders (
    order_id        NUMBER PRIMARY KEY,
    customer_id     NUMBER NOT NULL,
    employee_id     NUMBER NOT NULL,
    order_date      TIMESTAMP DEFAULT SYSTIMESTAMP,
    order_status    VARCHAR2(20) DEFAULT 'Pending',
    order_type      VARCHAR2(20) NOT NULL,
    table_number    NUMBER,
    total_amount    NUMBER(10,2) DEFAULT 0,
    CONSTRAINT fk_order_customer FOREIGN KEY (customer_id) 
        REFERENCES Customers(customer_id),
    CONSTRAINT fk_order_employee FOREIGN KEY (employee_id) 
        REFERENCES Employees(employee_id),
    CONSTRAINT chk_status CHECK (order_status IN ('Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled')),
    CONSTRAINT chk_order_type CHECK (order_type IN ('Dine-in', 'Takeaway', 'Delivery'))
);

-- Order Items Table
CREATE TABLE Order_Items (
    order_item_id   NUMBER PRIMARY KEY,
    order_id        NUMBER NOT NULL,
    item_id         NUMBER NOT NULL,
    quantity        NUMBER NOT NULL,
    unit_price      NUMBER(8,2) NOT NULL,
    subtotal        NUMBER(10,2) NOT NULL,
    special_instructions VARCHAR2(200),
    CONSTRAINT fk_orderitem_order FOREIGN KEY (order_id) 
        REFERENCES Orders(order_id) ON DELETE CASCADE,
    CONSTRAINT fk_orderitem_item FOREIGN KEY (item_id) 
        REFERENCES Menu_Items(item_id),
    CONSTRAINT chk_quantity CHECK (quantity > 0)
);

-- Payments Table
CREATE TABLE Payments (
    payment_id      NUMBER PRIMARY KEY,
    order_id        NUMBER NOT NULL UNIQUE,
    payment_date    TIMESTAMP DEFAULT SYSTIMESTAMP,
    amount          NUMBER(10,2) NOT NULL,
    payment_method  VARCHAR2(20) NOT NULL,
    payment_status  VARCHAR2(20) DEFAULT 'Completed',
    CONSTRAINT fk_payment_order FOREIGN KEY (order_id) 
        REFERENCES Orders(order_id),
    CONSTRAINT chk_payment_method CHECK (payment_method IN ('Cash', 'Credit Card', 'Debit Card', 'Mobile Payment')),
    CONSTRAINT chk_payment_status CHECK (payment_status IN ('Pending', 'Completed', 'Failed', 'Refunded'))
);

-- ============================================================
-- SECTION 4: CREATE TRIGGERS FOR AUTO-INCREMENT IDs
-- ============================================================

CREATE OR REPLACE TRIGGER trg_customers_id
BEFORE INSERT ON Customers
FOR EACH ROW
BEGIN
    IF :NEW.customer_id IS NULL THEN
        SELECT seq_customers.NEXTVAL INTO :NEW.customer_id FROM DUAL;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_employees_id
BEFORE INSERT ON Employees
FOR EACH ROW
BEGIN
    IF :NEW.employee_id IS NULL THEN
        SELECT seq_employees.NEXTVAL INTO :NEW.employee_id FROM DUAL;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_menu_categories_id
BEFORE INSERT ON Menu_Categories
FOR EACH ROW
BEGIN
    IF :NEW.category_id IS NULL THEN
        SELECT seq_menu_categories.NEXTVAL INTO :NEW.category_id FROM DUAL;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_menu_items_id
BEFORE INSERT ON Menu_Items
FOR EACH ROW
BEGIN
    IF :NEW.item_id IS NULL THEN
        SELECT seq_menu_items.NEXTVAL INTO :NEW.item_id FROM DUAL;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_orders_id
BEFORE INSERT ON Orders
FOR EACH ROW
BEGIN
    IF :NEW.order_id IS NULL THEN
        SELECT seq_orders.NEXTVAL INTO :NEW.order_id FROM DUAL;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_order_items_id
BEFORE INSERT ON Order_Items
FOR EACH ROW
BEGIN
    IF :NEW.order_item_id IS NULL THEN
        SELECT seq_order_items.NEXTVAL INTO :NEW.order_item_id FROM DUAL;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER trg_payments_id
BEFORE INSERT ON Payments
FOR EACH ROW
BEGIN
    IF :NEW.payment_id IS NULL THEN
        SELECT seq_payments.NEXTVAL INTO :NEW.payment_id FROM DUAL;
    END IF;
END;
/

-- Trigger to update order total when items are added
CREATE OR REPLACE TRIGGER trg_update_order_total
AFTER INSERT OR UPDATE OR DELETE ON Order_Items
FOR EACH ROW
DECLARE
    v_order_id NUMBER;
BEGIN
    IF INSERTING OR UPDATING THEN
        v_order_id := :NEW.order_id;
    ELSE
        v_order_id := :OLD.order_id;
    END IF;
    
    UPDATE Orders o
    SET total_amount = (
        SELECT NVL(SUM(subtotal), 0)
        FROM Order_Items
        WHERE order_id = v_order_id
    )
    WHERE order_id = v_order_id;
END;
/

-- ============================================================
-- SECTION 5: CREATE VIEWS
-- ============================================================

-- View: Complete Order Details
CREATE OR REPLACE VIEW vw_order_details AS
SELECT 
    o.order_id,
    c.first_name || ' ' || c.last_name AS customer_name,
    c.phone AS customer_phone,
    e.first_name || ' ' || e.last_name AS served_by,
    o.order_date,
    o.order_type,
    o.table_number,
    mi.item_name,
    oi.quantity,
    oi.unit_price,
    oi.subtotal,
    o.order_status,
    o.total_amount
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
JOIN Employees e ON o.employee_id = e.employee_id
JOIN Order_Items oi ON o.order_id = oi.order_id
JOIN Menu_Items mi ON oi.item_id = mi.item_id;

-- View: Daily Sales Report
CREATE OR REPLACE VIEW vw_daily_sales AS
SELECT 
    TRUNC(o.order_date) AS sale_date,
    COUNT(DISTINCT o.order_id) AS total_orders,
    SUM(o.total_amount) AS total_revenue,
    ROUND(AVG(o.total_amount), 2) AS avg_order_value
FROM Orders o
WHERE o.order_status = 'Delivered'
GROUP BY TRUNC(o.order_date)
ORDER BY sale_date DESC;

-- View: Popular Menu Items
CREATE OR REPLACE VIEW vw_popular_items AS
SELECT 
    mi.item_name,
    mc.category_name,
    SUM(oi.quantity) AS times_ordered,
    SUM(oi.subtotal) AS total_revenue
FROM Order_Items oi
JOIN Menu_Items mi ON oi.item_id = mi.item_id
JOIN Menu_Categories mc ON mi.category_id = mc.category_id
GROUP BY mi.item_name, mc.category_name
ORDER BY times_ordered DESC;

-- ============================================================
-- SECTION 6: CREATE FUNCTIONS
-- ============================================================

-- Function: Calculate Order Total
CREATE OR REPLACE FUNCTION fn_calculate_order_total(p_order_id NUMBER)
RETURN NUMBER
IS
    v_total NUMBER(10,2);
BEGIN
    SELECT NVL(SUM(subtotal), 0)
    INTO v_total
    FROM Order_Items
    WHERE order_id = p_order_id;
    
    RETURN v_total;
END;
/

-- Function: Get Customer Order Count
CREATE OR REPLACE FUNCTION fn_get_customer_orders(p_customer_id NUMBER)
RETURN NUMBER
IS
    v_count NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO v_count
    FROM Orders
    WHERE customer_id = p_customer_id;
    
    RETURN v_count;
END;
/

-- Function: Check Item Availability
CREATE OR REPLACE FUNCTION fn_is_item_available(p_item_id NUMBER)
RETURN VARCHAR2
IS
    v_available CHAR(1);
BEGIN
    SELECT is_available
    INTO v_available
    FROM Menu_Items
    WHERE item_id = p_item_id;
    
    IF v_available = 'Y' THEN
        RETURN 'Available';
    ELSE
        RETURN 'Not Available';
    END IF;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 'Item Not Found';
END;
/

-- ============================================================
-- SECTION 7: CREATE STORED PROCEDURES
-- ============================================================

-- Procedure: Place New Order
CREATE OR REPLACE PROCEDURE sp_place_order(
    p_customer_id IN NUMBER,
    p_employee_id IN NUMBER,
    p_order_type IN VARCHAR2,
    p_table_number IN NUMBER DEFAULT NULL,
    p_order_id OUT NUMBER
)
IS
BEGIN
    INSERT INTO Orders (customer_id, employee_id, order_type, table_number)
    VALUES (p_customer_id, p_employee_id, p_order_type, p_table_number)
    RETURNING order_id INTO p_order_id;
    
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Order created successfully. Order ID: ' || p_order_id);
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/

-- Procedure: Add Item to Order
CREATE OR REPLACE PROCEDURE sp_add_order_item(
    p_order_id IN NUMBER,
    p_item_id IN NUMBER,
    p_quantity IN NUMBER,
    p_special_instructions IN VARCHAR2 DEFAULT NULL
)
IS
    v_price NUMBER(8,2);
    v_subtotal NUMBER(10,2);
BEGIN
    -- Get item price
    SELECT price INTO v_price
    FROM Menu_Items
    WHERE item_id = p_item_id;
    
    v_subtotal := v_price * p_quantity;
    
    INSERT INTO Order_Items (order_id, item_id, quantity, unit_price, subtotal, special_instructions)
    VALUES (p_order_id, p_item_id, p_quantity, v_price, v_subtotal, p_special_instructions);
    
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Item added to order. Subtotal: $' || v_subtotal);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20001, 'Menu item not found');
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/

-- Procedure: Update Order Status
CREATE OR REPLACE PROCEDURE sp_update_order_status(
    p_order_id IN NUMBER,
    p_new_status IN VARCHAR2
)
IS
BEGIN
    UPDATE Orders
    SET order_status = p_new_status
    WHERE order_id = p_order_id;
    
    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Order not found');
    END IF;
    
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Order status updated to: ' || p_new_status);
END;
/

-- Procedure: Process Payment
CREATE OR REPLACE PROCEDURE sp_process_payment(
    p_order_id IN NUMBER,
    p_payment_method IN VARCHAR2
)
IS
    v_amount NUMBER(10,2);
BEGIN
    -- Get order total
    SELECT total_amount INTO v_amount
    FROM Orders
    WHERE order_id = p_order_id;
    
    -- Insert payment record
    INSERT INTO Payments (order_id, amount, payment_method)
    VALUES (p_order_id, v_amount, p_payment_method);
    
    -- Update order status
    UPDATE Orders
    SET order_status = 'Delivered'
    WHERE order_id = p_order_id;
    
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Payment processed. Amount: $' || v_amount);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, 'Order not found');
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/

-- ============================================================
-- SECTION 8: INSERT SAMPLE DATA
-- ============================================================

-- Insert Customers
INSERT INTO Customers (first_name, last_name, email, phone, address) 
VALUES ('John', 'Smith', 'john.smith@email.com', '555-0101', '123 Main St, New York');
INSERT INTO Customers (first_name, last_name, email, phone, address) 
VALUES ('Sarah', 'Johnson', 'sarah.j@email.com', '555-0102', '456 Oak Ave, Boston');
INSERT INTO Customers (first_name, last_name, email, phone, address) 
VALUES ('Michael', 'Brown', 'mike.brown@email.com', '555-0103', '789 Pine Rd, Chicago');
INSERT INTO Customers (first_name, last_name, email, phone, address) 
VALUES ('Emily', 'Davis', 'emily.d@email.com', '555-0104', '321 Elm St, Miami');
INSERT INTO Customers (first_name, last_name, email, phone, address) 
VALUES ('David', 'Wilson', 'david.w@email.com', '555-0105', '654 Maple Dr, Seattle');

-- Insert Employees
INSERT INTO Employees (first_name, last_name, email, phone, position, salary) 
VALUES ('Robert', 'Taylor', 'r.taylor@restaurant.com', '555-1001', 'Manager', 55000);
INSERT INTO Employees (first_name, last_name, email, phone, position, salary) 
VALUES ('Maria', 'Garcia', 'm.garcia@restaurant.com', '555-1002', 'Chef', 45000);
INSERT INTO Employees (first_name, last_name, email, phone, position, salary) 
VALUES ('James', 'Martinez', 'j.martinez@restaurant.com', '555-1003', 'Waiter', 28000);
INSERT INTO Employees (first_name, last_name, email, phone, position, salary) 
VALUES ('Lisa', 'Anderson', 'l.anderson@restaurant.com', '555-1004', 'Cashier', 25000);
INSERT INTO Employees (first_name, last_name, email, phone, position, salary) 
VALUES ('Kevin', 'Thomas', 'k.thomas@restaurant.com', '555-1005', 'Host', 24000);

-- Insert Menu Categories
INSERT INTO Menu_Categories (category_name, description) 
VALUES ('Appetizers', 'Starters and small plates');
INSERT INTO Menu_Categories (category_name, description) 
VALUES ('Main Course', 'Entrees and main dishes');
INSERT INTO Menu_Categories (category_name, description) 
VALUES ('Desserts', 'Sweet treats and pastries');
INSERT INTO Menu_Categories (category_name, description) 
VALUES ('Beverages', 'Drinks and refreshments');
INSERT INTO Menu_Categories (category_name, description) 
VALUES ('Salads', 'Fresh salads and greens');

-- Insert Menu Items
INSERT INTO Menu_Items (category_id, item_name, description, price) 
VALUES (1, 'Spring Rolls', 'Crispy vegetable spring rolls with sweet chili sauce', 8.99);
INSERT INTO Menu_Items (category_id, item_name, description, price) 
VALUES (1, 'Garlic Bread', 'Toasted bread with garlic butter and herbs', 5.99);
INSERT INTO Menu_Items (category_id, item_name, description, price) 
VALUES (1, 'Soup of the Day', 'Chef special soup served with bread', 6.99);
INSERT INTO Menu_Items (category_id, item_name, description, price) 
VALUES (2, 'Grilled Salmon', 'Atlantic salmon with lemon butter sauce', 24.99);
INSERT INTO Menu_Items (category_id, item_name, description, price) 
VALUES (2, 'Ribeye Steak', '12oz USDA Prime ribeye with vegetables', 32.99);
INSERT INTO Menu_Items (category_id, item_name, description, price) 
VALUES (2, 'Chicken Parmesan', 'Breaded chicken with marinara and mozzarella', 18.99);
INSERT INTO Menu_Items (category_id, item_name, description, price) 
VALUES (2, 'Pasta Carbonara', 'Creamy pasta with bacon and parmesan', 16.99);
INSERT INTO Menu_Items (category_id, item_name, description, price) 
VALUES (3, 'Chocolate Lava Cake', 'Warm chocolate cake with molten center', 9.99);
INSERT INTO Menu_Items (category_id, item_name, description, price) 
VALUES (3, 'Tiramisu', 'Classic Italian coffee-flavored dessert', 8.99);
INSERT INTO Menu_Items (category_id, item_name, description, price) 
VALUES (4, 'Fresh Lemonade', 'Homemade lemonade with mint', 4.99);
INSERT INTO Menu_Items (category_id, item_name, description, price) 
VALUES (4, 'Iced Coffee', 'Cold brewed coffee over ice', 5.99);
INSERT INTO Menu_Items (category_id, item_name, description, price) 
VALUES (5, 'Caesar Salad', 'Romaine lettuce with caesar dressing', 12.99);
INSERT INTO Menu_Items (category_id, item_name, description, price) 
VALUES (5, 'Greek Salad', 'Fresh vegetables with feta cheese', 11.99);

-- Insert Orders
INSERT INTO Orders (customer_id, employee_id, order_type, table_number, order_status) 
VALUES (1, 3, 'Dine-in', 5, 'Delivered');
INSERT INTO Orders (customer_id, employee_id, order_type, table_number, order_status) 
VALUES (2, 3, 'Dine-in', 8, 'Delivered');
INSERT INTO Orders (customer_id, employee_id, order_type, order_status) 
VALUES (3, 4, 'Takeaway', 'Ready');
INSERT INTO Orders (customer_id, employee_id, order_type, order_status) 
VALUES (4, 3, 'Delivery', 'Preparing');
INSERT INTO Orders (customer_id, employee_id, order_type, table_number, order_status) 
VALUES (5, 3, 'Dine-in', 3, 'Pending');

-- Insert Order Items
INSERT INTO Order_Items (order_id, item_id, quantity, unit_price, subtotal) 
VALUES (1, 1, 1, 8.99, 8.99);
INSERT INTO Order_Items (order_id, item_id, quantity, unit_price, subtotal) 
VALUES (1, 5, 2, 32.99, 65.98);
INSERT INTO Order_Items (order_id, item_id, quantity, unit_price, subtotal) 
VALUES (1, 10, 2, 4.99, 9.98);
INSERT INTO Order_Items (order_id, item_id, quantity, unit_price, subtotal) 
VALUES (2, 4, 1, 24.99, 24.99);
INSERT INTO Order_Items (order_id, item_id, quantity, unit_price, subtotal) 
VALUES (2, 12, 1, 12.99, 12.99);
INSERT INTO Order_Items (order_id, item_id, quantity, unit_price, subtotal) 
VALUES (2, 8, 2, 9.99, 19.98);
INSERT INTO Order_Items (order_id, item_id, quantity, unit_price, subtotal) 
VALUES (3, 7, 2, 16.99, 33.98);
INSERT INTO Order_Items (order_id, item_id, quantity, unit_price, subtotal) 
VALUES (3, 11, 2, 5.99, 11.98);
INSERT INTO Order_Items (order_id, item_id, quantity, unit_price, subtotal) 
VALUES (4, 6, 1, 18.99, 18.99);
INSERT INTO Order_Items (order_id, item_id, quantity, unit_price, subtotal) 
VALUES (4, 2, 1, 5.99, 5.99);
INSERT INTO Order_Items (order_id, item_id, quantity, unit_price, subtotal) 
VALUES (5, 3, 1, 6.99, 6.99);
INSERT INTO Order_Items (order_id, item_id, quantity, unit_price, subtotal) 
VALUES (5, 13, 1, 11.99, 11.99);

-- Insert Payments
INSERT INTO Payments (order_id, amount, payment_method) VALUES (1, 84.95, 'Credit Card');
INSERT INTO Payments (order_id, amount, payment_method) VALUES (2, 57.96, 'Cash');

COMMIT;

-- ============================================================
-- SECTION 9: SAMPLE QUERIES FOR DEMO
-- ============================================================

-- Query 1: View all orders with customer and employee details
SELECT * FROM vw_order_details;

-- Query 2: Get daily sales report
SELECT * FROM vw_daily_sales;

-- Query 3: Show most popular menu items
SELECT * FROM vw_popular_items;

-- Query 4: List all available menu items with categories
SELECT 
    mc.category_name,
    mi.item_name,
    mi.price,
    mi.is_available
FROM Menu_Items mi
JOIN Menu_Categories mc ON mi.category_id = mc.category_id
WHERE mi.is_available = 'Y'
ORDER BY mc.category_name, mi.item_name;

-- Query 5: Calculate total revenue by payment method
SELECT 
    payment_method,
    COUNT(*) AS transaction_count,
    SUM(amount) AS total_amount
FROM Payments
WHERE payment_status = 'Completed'
GROUP BY payment_method;

-- Query 6: Find customers with most orders
SELECT 
    c.first_name || ' ' || c.last_name AS customer_name,
    fn_get_customer_orders(c.customer_id) AS order_count
FROM Customers c
ORDER BY order_count DESC;

-- Query 7: Show pending and preparing orders
SELECT 
    o.order_id,
    c.first_name || ' ' || c.last_name AS customer,
    o.order_type,
    o.order_status,
    o.total_amount
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
WHERE o.order_status IN ('Pending', 'Preparing')
ORDER BY o.order_date;

-- Query 8: Employee performance (orders handled)
SELECT 
    e.first_name || ' ' || e.last_name AS employee_name,
    e.position,
    COUNT(o.order_id) AS orders_handled,
    SUM(o.total_amount) AS total_sales
FROM Employees e
LEFT JOIN Orders o ON e.employee_id = o.employee_id
GROUP BY e.employee_id, e.first_name, e.last_name, e.position
ORDER BY total_sales DESC NULLS LAST;

-- ============================================================
-- END OF SCRIPT
-- ============================================================`;

export const schemaExplanation = [
  {
    title: "Customers",
    description: "Stores customer information including contact details and registration date.",
    columns: ["customer_id (PK)", "first_name", "last_name", "email (UNIQUE)", "phone", "address", "registration_date"]
  },
  {
    title: "Employees",
    description: "Manages employee records with roles and salary information.",
    columns: ["employee_id (PK)", "first_name", "last_name", "email (UNIQUE)", "phone", "position", "hire_date", "salary"]
  },
  {
    title: "Menu_Categories",
    description: "Organizes menu items into logical categories.",
    columns: ["category_id (PK)", "category_name (UNIQUE)", "description"]
  },
  {
    title: "Menu_Items",
    description: "Contains all menu items with pricing and availability status.",
    columns: ["item_id (PK)", "category_id (FK)", "item_name", "description", "price", "is_available"]
  },
  {
    title: "Orders",
    description: "Tracks all customer orders with status and type information.",
    columns: ["order_id (PK)", "customer_id (FK)", "employee_id (FK)", "order_date", "order_status", "order_type", "table_number", "total_amount"]
  },
  {
    title: "Order_Items",
    description: "Junction table linking orders to menu items with quantities.",
    columns: ["order_item_id (PK)", "order_id (FK)", "item_id (FK)", "quantity", "unit_price", "subtotal", "special_instructions"]
  },
  {
    title: "Payments",
    description: "Records payment transactions for completed orders.",
    columns: ["payment_id (PK)", "order_id (FK, UNIQUE)", "payment_date", "amount", "payment_method", "payment_status"]
  }
];

export const sampleQueries = [
  {
    title: "View All Order Details",
    query: "SELECT * FROM vw_order_details;",
    description: "Displays complete order information with customer names, items ordered, and totals."
  },
  {
    title: "Daily Sales Report",
    query: "SELECT * FROM vw_daily_sales;",
    description: "Shows revenue summary grouped by date."
  },
  {
    title: "Popular Menu Items",
    query: "SELECT * FROM vw_popular_items;",
    description: "Lists items ranked by how often they're ordered."
  },
  {
    title: "Revenue by Payment Method",
    query: `SELECT payment_method, COUNT(*) AS transactions, SUM(amount) AS total
FROM Payments WHERE payment_status = 'Completed' GROUP BY payment_method;`,
    description: "Summarizes transactions by payment type."
  },
  {
    title: "Employee Performance",
    query: `SELECT e.first_name || ' ' || e.last_name AS employee, e.position,
COUNT(o.order_id) AS orders_handled, SUM(o.total_amount) AS sales
FROM Employees e LEFT JOIN Orders o ON e.employee_id = o.employee_id
GROUP BY e.employee_id, e.first_name, e.last_name, e.position ORDER BY sales DESC;`,
    description: "Shows how many orders each employee has processed."
  }
];
