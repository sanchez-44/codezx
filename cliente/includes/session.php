<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function cliente_logueado() {
    return isset($_SESSION['cliente_id']);
}

function requiere_cliente() {
    if (!cliente_logueado()) {
        header('Location: login.php');
        exit;
    }
}
?>
