USE codezx_db;

CREATE TABLE IF NOT EXISTS password_resets (
  id_reset INT AUTO_INCREMENT PRIMARY KEY,
  correo VARCHAR(160) NOT NULL,
  token VARCHAR(255) NOT NULL,
  expiracion DATETIME NOT NULL,
  usado TINYINT(1) DEFAULT 0,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_correo (correo),
  INDEX idx_token (token)
);
