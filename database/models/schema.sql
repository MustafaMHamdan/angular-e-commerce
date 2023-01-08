DROP DATABASE angular_cart;

CREATE DATABASE angular_cart;

USE angular_cart;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users(
    UserID INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (UserID)
);

CREATE TABLE products (
    productID INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(255),
    price INT,
    image VARCHAR(255),
    is_deleted TINYINT DEFAULT 0,
    SellerId INT,
    FOREIGN KEY (SellerId) REFERENCES users(UserID),
    PRIMARY KEY (productID)
);

CREATE TABLE orders (
    orderId INT AUTO_INCREMENT NOT NULL,
    total FLOAT DEFAULT 0,
    BuyerId INT,
    FOREIGN KEY (BuyerId) REFERENCES users(UserID),
    is_deleted TINYINT DEFAULT 0,
    is_approved TINYINT DEFAULT 0,
    
    PRIMARY KEY (orderId)
);
/* 
CREATE TABLE order_details (
    order_detail_id INT AUTO_INCREMENT NOT NULL,
    order_id INT,
    BuyerId INT,
    productId INT,
    FOREIGN KEY (BuyerId) REFERENCES users(UserID),
    FOREIGN KEY (productId) REFERENCES products(productID),
    FOREIGN KEY (order_id) REFERENCES orders(orderId),
    quantity int,
    PRIMARY KEY (order_detail_id),
    is_deleted TINYINT DEFAULT 0
); */

CREATE TABLE cart(
    cart_id INT AUTO_INCREMENT NOT NULL,
    BuyerId INT,
    productId INT,
    order_Id INT,
    quantity INT DEFAULT 1,
    FOREIGN KEY (BuyerId) REFERENCES users(UserID),
    FOREIGN KEY (productId) REFERENCES products(productID),
    FOREIGN KEY (order_Id) REFERENCES orders(orderId),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (cart_id)
);

CREATE TABLE permissions (
    id INT AUTO_INCREMENT NOT NULL,
    permission VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role_permission (
    id INT NOT NULL AUTO_INCREMENT NOT NULL,
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (permission_id) REFERENCES permissions (id),
    PRIMARY KEY (id)
);

INSERT INTO
    products (
        productID,
        title,
        price,
        image
    )
VALUES
    (
        1,
        "iPhone12",
        600,
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphone-12-purple-2021?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1635202738000"
    );

INSERT INTO
    products (
        productID,
        title,
        price,
        image
    )
VALUES
    (
        2,
        "iPhone13",
        850,
        "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.large.jpg"
    );

INSERT INTO
    products (
        productID,
        title,
        price,
        image
    )
VALUES
    (
        3,
        "ipad",
        900,
        "https://images.macrumors.com/t/Op-ArH_mbIDx1Bdw7scj744cuzM=/800x0/smart/article-new/2019/03/ipad-air-2022-roundup-header.png?lossy"
    );

INSERT INTO
    products (
        productID,
        title,
        price,
        image
    )
VALUES
    (
        4,
        "galaxy-z-fold4",
        1100,
        "https://images.samsung.com/is/image/samsung/p6pim/levant_ar/2208/gallery/levant-ar-galaxy-z-fold4-f936-sm-f936bzkgmea-thumb-533084503?$240_240_PNG$"
    );

INSERT INTO
    products (
        productID,
        title,
        price,
        image
    )
VALUES
    (
        5,
        "Hp-LabTop",
        800,
        "https://compujordan.com/image/cache/catalog/products/pc-and-laptops/laptops/HP-/15s-fq5000nia-(6G3G5EA)/hp-15s-fq5000nia-6G3G5EA_1-1200x1200.jpg"
    );

INSERT INTO
    products (
        productID,
        title,
        price,
        image
    )
VALUES
    (
        6,
        "hp-DeskTop",
        500,
        "https://m.media-amazon.com/images/I/71tc7Nl6VKS.__AC_SX300_SY300_QL70_FMwebp_.jpg"
    );

INSERT INTO
    products (
        productID,
        title,
        price,
        image
    )
VALUES
    (
        7,
        "hp touch pad",
        1000,
        "https://m.media-amazon.com/images/I/51XqBeKo6UL._AC_SY450_.jpg"
    );

INSERT INTO
    products (
        productID,
        title,
        price,
        image
    )
VALUES
    (
        8,
        "samsung-tablet",
        1000,
        "https://cdn.shopify.com/s/files/1/0683/5673/5282/products/718B6zl_b6L._AC_SL1500_600x.jpg?v=1669537103"
    );

INSERT INTO
    products (
        productID,
        title,
        price,
        image
    )
VALUES
    (
        9,
        "Huawei phone",
        400,
        "https://cdn.shopify.com/s/files/1/0385/8490/9956/products/huawei_nova_9_128gb_8gb_black_600x600.jpg?v=1642676730"
    );

INSERT INTO
    products (
        productID,
        title,
        price,
        image
    )
VALUES
    (
        10,
        "Huawei pad",
        1000,
        "https://cdn.shopify.com/s/files/1/0683/5673/5282/products/MKT_MatePad-11_Silver_04_Ultra-HD_HQ_JPG_20210513-1-e1634465528948_600x.jpg?v=1669381497"
    );