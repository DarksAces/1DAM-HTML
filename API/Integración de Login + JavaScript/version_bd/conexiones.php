<?php
// Configuración de la conexión a la base de datos
$host = "localhost";
$usuario = "root";
$contrasena = "";
$base_datos = "login_db";

// Crear conexión
function conectar() {
    global $host, $usuario, $contrasena, $base_datos;
    $conexion = new mysqli($host, $usuario, $contrasena, $base_datos);
    
    // Verificar conexión
    if ($conexion->connect_error) {
        die("Error de conexión: " . $conexion->connect_error);
    }
    
    // Configurar conjunto de caracteres a utf8
    $conexion->set_charset("utf8");
    
    return $conexion;
}
?>