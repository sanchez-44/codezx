CREATE DATABASE IF NOT EXISTS codezx_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE codezx_db;

CREATE TABLE IF NOT EXISTS administradores (
  id_admin INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  correo VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  estado ENUM('activo','inactivo') DEFAULT 'activo',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clientes (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(160) NOT NULL,
  correo VARCHAR(160) NOT NULL UNIQUE,
  telefono VARCHAR(30) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  recibe_ofertas_correo TINYINT(1) DEFAULT 1,
  recibe_ofertas_whatsapp TINYINT(1) DEFAULT 1,
  nivel_cliente ENUM('regular','vip','premium') DEFAULT 'regular',
  estado ENUM('activo','inactivo') DEFAULT 'activo',
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categorias (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  descripcion TEXT,
  estado ENUM('activo','inactivo') DEFAULT 'activo'
);

CREATE TABLE IF NOT EXISTS productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(30) NOT NULL UNIQUE,
  nombre VARCHAR(160) NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  precio_oferta DECIMAL(10,2) DEFAULT NULL,
  imagen VARCHAR(255) DEFAULT NULL,
  categoria VARCHAR(120) DEFAULT NULL,
  stock INT DEFAULT 0,
  etiqueta VARCHAR(80) DEFAULT NULL,
  es_oferta TINYINT(1) DEFAULT 0,
  estado ENUM('activo','inactivo') DEFAULT 'activo',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS servicios (
  id_servicio INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(40) NOT NULL UNIQUE,
  nombre VARCHAR(160) NOT NULL,
  descripcion TEXT NOT NULL,
  precio_base DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  imagen VARCHAR(255) DEFAULT NULL,
  etiqueta VARCHAR(80) DEFAULT NULL,
  beneficios TEXT,
  estado ENUM('activo','inactivo') DEFAULT 'activo',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pedidos (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NULL,
  nombre_cliente VARCHAR(160) NOT NULL,
  correo VARCHAR(160) NOT NULL,
  telefono VARCHAR(30) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  ciudad VARCHAR(120) DEFAULT NULL,
  region VARCHAR(120) DEFAULT NULL,
  metodo_pago VARCHAR(80) DEFAULT NULL,
  metodo_envio VARCHAR(80) DEFAULT NULL,
  subtotal_productos DECIMAL(10,2) DEFAULT 0.00,
  subtotal_servicios DECIMAL(10,2) DEFAULT 0.00,
  costo_envio DECIMAL(10,2) DEFAULT 0.00,
  total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  notas TEXT,
  estado ENUM('pendiente','confirmado','preparando','entregado','cancelado') DEFAULT 'pendiente',
  fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS detalle_pedido (
  id_detalle INT AUTO_INCREMENT PRIMARY KEY,
  id_pedido INT NOT NULL,
  tipo_item ENUM('producto','servicio') NOT NULL,
  codigo_item VARCHAR(40) DEFAULT NULL,
  nombre_item VARCHAR(160) NOT NULL,
  cantidad INT NOT NULL DEFAULT 1,
  precio_unitario DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  detalles TEXT,
  FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ofertas (
  id_oferta INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(160) NOT NULL,
  descripcion TEXT NOT NULL,
  descuento_porcentaje DECIMAL(5,2) DEFAULT 0.00,
  fecha_inicio DATE DEFAULT NULL,
  fecha_fin DATE DEFAULT NULL,
  canal_correo TINYINT(1) DEFAULT 1,
  canal_whatsapp TINYINT(1) DEFAULT 1,
  estado ENUM('activa','inactiva') DEFAULT 'activa',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS configuracion_web (
  id_config INT AUTO_INCREMENT PRIMARY KEY,
  nombre_empresa VARCHAR(160) NOT NULL DEFAULT 'Amor & Detalles',
  lema VARCHAR(255) DEFAULT 'Diseños románticos para una experiencia inolvidable',
  correo VARCHAR(160) DEFAULT 'brunosanchez654@gmail.com',
  whatsapp VARCHAR(30) DEFAULT '51940705646',
  facebook VARCHAR(255) DEFAULT NULL,
  instagram VARCHAR(255) DEFAULT NULL,
  tiktok VARCHAR(255) DEFAULT NULL,
  youtube VARCHAR(255) DEFAULT NULL,
  video_inicio VARCHAR(255) DEFAULT NULL,
  banner_inicio VARCHAR(255) DEFAULT 'img/pareja.jpg',
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO administradores (nombre, correo, password_hash)
VALUES ('Administrador CodeZX', 'admin@codezx.com', '$2y$10$Q8yVqTY3zR2OSLtSBAv4VupBuFR0WqSnA0d1Dx2Kxk0SOXxF5X9Vq')
ON DUPLICATE KEY UPDATE correo = correo;

INSERT INTO categorias (nombre, descripcion) VALUES
('Perfumería', 'Fragancias y perfumes para regalos.'),
('Dulces', 'Chocolates, antojos y detalles comestibles.'),
('Regalos', 'Cajas sorpresa y detalles personalizados.'),
('Flores', 'Rosas y arreglos florales.')
ON DUPLICATE KEY UPDATE nombre = nombre;

INSERT INTO productos (codigo, nombre, descripcion, precio, precio_oferta, imagen, categoria, stock, etiqueta, es_oferta) VALUES
('PR1', 'Perfumes', 'Fragancias elegantes para sorprender con un detalle sofisticado y memorable.', 79.90, NULL, 'img/PR1.jpeg', 'Perfumería', 20, 'Elegante', 0),
('PR2', 'Productos de limpieza', 'Opciones útiles para complementar detalles y canastas con una presentación funcional.', 24.90, NULL, 'img/PR2.webp', 'Complementos', 30, 'Útil', 0),
('PR3', 'Dulces', 'Chocolates y antojos ideales para acompañar sorpresas románticas.', 18.50, NULL, 'img/PR3.jpeg', 'Dulces', 40, 'Dulce', 0),
('PR4', 'Regalos decorados', 'Detalles personalizados listos para impresionar con temática y acabado especial.', 69.90, NULL, 'img/PR4.jpeg', 'Regalos', 18, 'Personalizable', 0),
('PR5', 'Cuidado de la piel', 'Artículos pensados para consentir y crear momentos de autocuidado.', 54.90, NULL, 'img/PR5.jpeg', 'Belleza', 15, 'Cuidado', 0),
('PR6', 'Caja sorpresa', 'Caja armada con detalles especiales para una entrega inolvidable.', 119.90, 99.90, 'img/PR6.jpg', 'Regalos', 12, 'Oferta', 1),
('PR7', 'Productos faciales', 'Complementos de belleza delicados y modernos para regalar.', 42.90, NULL, 'img/PR7.jpeg', 'Belleza', 22, 'Nuevo', 0),
('PR8', 'Rosas', 'Rosas para decorar cenas y sorpresas de alto impacto.', 39.90, NULL, 'img/PR8.jpeg', 'Flores', 35, 'Más vendido', 0),
('PR9', 'Similares', 'Productos relacionados para ampliar tus opciones y complementar la sorpresa perfecta.', 29.90, NULL, 'img/PR9.jpeg', 'Complementos', 25, 'Especial', 0)
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre), precio = VALUES(precio), imagen = VALUES(imagen);

INSERT INTO servicios (codigo, nombre, descripcion, precio_base, imagen, etiqueta, beneficios) VALUES
('cenas', 'Cena romántica', 'Creamos ambientes íntimos y elegantes con velas, flores y detalles personalizados.', 180.00, 'img/cenaSV.jpeg', 'Más reservado', 'Decoración romántica personalizada|Velas, flores y ambientación especial|Ideal para aniversarios y pedidas'),
('flores', 'Arreglos florales', 'Diseñamos arreglos florales finos y personalizados para regalos, celebraciones y momentos especiales.', 120.00, 'img/PR8.jpeg', 'Elegante', 'Rosas, follajes y detalles decorativos|Diseños románticos y personalizados|Perfecto para sorpresas y obsequios'),
('momentos', 'Momentos inolvidables', 'Organizamos experiencias especiales como sorpresas, día de campo, paseos y detalles únicos.', 160.00, 'img/PR6.jpg', 'Premium', 'Experiencias personalizadas|Decoración y coordinación especial|Ideal para celebraciones memorables')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre), precio_base = VALUES(precio_base), imagen = VALUES(imagen);

INSERT INTO configuracion_web (id_config, nombre_empresa, lema, correo, whatsapp, facebook, instagram, tiktok, youtube, banner_inicio)
VALUES (1, 'Amor & Detalles', 'Diseños románticos para una experiencia inolvidable', 'brunosanchez654@gmail.com', '51940705646', 'https://www.facebook.com/brunoyosiney.sanchezibanez.1', 'https://www.instagram.com/jsmith0980/', 'https://www.tiktok.com/@laplace444', 'https://www.youtube.com/@brunosanchez2800', 'img/pareja.jpg')
ON DUPLICATE KEY UPDATE nombre_empresa = VALUES(nombre_empresa);

INSERT INTO ofertas (titulo, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin, canal_correo, canal_whatsapp, estado)
VALUES ('Oferta de bienvenida', '10% de descuento para clientes registrados en cajas sorpresa y servicios seleccionados.', 10.00, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 1, 1, 'activa');
