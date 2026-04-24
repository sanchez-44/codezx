<?php
require_once 'config/db.php';
require_once 'includes/session.php';
header('Content-Type: application/json; charset=UTF-8');

if (!cliente_logueado()) {
    echo json_encode(['logged' => false]);
    exit;
}

$stmt = $pdo->prepare('SELECT id_cliente, nombre, correo, telefono, recibe_ofertas_correo, recibe_ofertas_whatsapp, nivel_cliente FROM clientes WHERE id_cliente = ? LIMIT 1');
$stmt->execute([$_SESSION['cliente_id']]);
$cliente = $stmt->fetch();

if (!$cliente) {
    session_unset();
    session_destroy();
    echo json_encode(['logged' => false]);
    exit;
}

echo json_encode([
    'logged' => true,
    'cliente' => [
        'id' => $cliente['id_cliente'],
        'nombre' => $cliente['nombre'],
        'correo' => $cliente['correo'],
        'telefono' => $cliente['telefono'],
        'nivel' => $cliente['nivel_cliente'],
        'ofertas_correo' => (bool)$cliente['recibe_ofertas_correo'],
        'ofertas_whatsapp' => (bool)$cliente['recibe_ofertas_whatsapp']
    ]
]);
?>
