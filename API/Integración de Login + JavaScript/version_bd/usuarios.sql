-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS login_db;

-- Usar la base de datos
USE login_db;

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuarios de ejemplo (los mismos que estaban en el archivo JSON)
INSERT INTO usuarios (email, password) VALUES 
('test@test.test', 'test'),
('danielgarbru@campus.monlau.com', '123');
