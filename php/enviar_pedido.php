<?php
header('Content-Type: text/plain; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Método no permitido.';
    exit;
}

function clean_text($value) {
    return trim(filter_var($value ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
}

$nombre = clean_text(($_POST['firstName'] ?? '') . ' ' . ($_POST['lastName'] ?? ''));
$pais = clean_text($_POST['country'] ?? 'Perú');
$direccion = clean_text($_POST['address'] ?? '');
$ciudad = clean_text($_POST['city'] ?? '');
$region = clean_text($_POST['region'] ?? '');
$telefono = clean_text($_POST['phone'] ?? '');
$correo = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
$notas = clean_text($_POST['notes'] ?? '');
$metodo_pago = clean_text($_POST['paymentMethod'] ?? '');
$metodo_envio = clean_text($_POST['metodo_envio'] ?? '');
$modo_pago_servicio = clean_text($_POST['modo_pago_servicio'] ?? '');
$pedido_resumen = trim($_POST['pedido_resumen'] ?? '');
$subtotal_productos = clean_text($_POST['subtotal_productos'] ?? '0.00');
$subtotal_servicios = clean_text($_POST['subtotal_servicios'] ?? '0.00');
$envio = clean_text($_POST['envio'] ?? '0.00');
$pago_servicios = clean_text($_POST['pago_servicios'] ?? '0.00');
$total_pagar = clean_text($_POST['total_pagar'] ?? '0.00');

if ($nombre === '' || $direccion === '' || $telefono === '' || !filter_var($correo, FILTER_VALIDATE_EMAIL) || $pedido_resumen === '') {
    http_response_code(400);
    echo 'Faltan datos obligatorios o el correo no es válido.';
    exit;
}

$payment_labels = [
    'wallet' => 'Yape, Plin o Lukita',
    'card' => 'Tarjeta de débito o crédito',
    'cash' => 'Pago contra entrega / efectivo'
];

$delivery_labels = [
    'olva' => 'Olva',
    'rappi' => 'Rappi'
];

$service_payment_labels = [
    '50' => 'Reserva con 50%',
    '100' => 'Pago completo del servicio'
];

$metodo_pago_texto = $payment_labels[$metodo_pago] ?? $metodo_pago;
$metodo_envio_texto = $delivery_labels[$metodo_envio] ?? $metodo_envio;
$modo_pago_servicio_texto = $service_payment_labels[$modo_pago_servicio] ?? $modo_pago_servicio;

$destinatario = 'brunosanchez654@gmail.com';
$asunto = 'Nuevo pedido desde Amor & Detalles';

$mensaje = "NUEVO PEDIDO - AMOR & DETALLES\n";
$mensaje .= "====================================\n\n";
$mensaje .= "DATOS DEL CLIENTE\n";
$mensaje .= "Nombre: {$nombre}\n";
$mensaje .= "Correo: {$correo}\n";
$mensaje .= "Teléfono: {$telefono}\n";
$mensaje .= "País / Región: {$pais}\n";
$mensaje .= "Dirección: {$direccion}\n";
$mensaje .= "Ciudad: {$ciudad}\n";
$mensaje .= "Región / Provincia: {$region}\n\n";
$mensaje .= "DATOS DEL PEDIDO\n";
$mensaje .= "Método de pago: {$metodo_pago_texto}\n";
$mensaje .= "Método de envío: {$metodo_envio_texto}\n";
$mensaje .= "Pago de servicios: {$modo_pago_servicio_texto}\n\n";
$mensaje .= "NOTAS DEL CLIENTE\n";
$mensaje .= ($notas !== '' ? $notas : 'Sin notas adicionales') . "\n\n";
$mensaje .= "DETALLE DEL PEDIDO\n";
$mensaje .= "{$pedido_resumen}\n\n";
$mensaje .= "TOTALES\n";
$mensaje .= "Subtotal productos: S/ {$subtotal_productos}\n";
$mensaje .= "Subtotal servicios: S/ {$subtotal_servicios}\n";
$mensaje .= "Envío: S/ {$envio}\n";
$mensaje .= "Pago actual servicios: S/ {$pago_servicios}\n";
$mensaje .= "TOTAL A PAGAR: S/ {$total_pagar}\n\n";
$mensaje .= "Este mensaje fue generado automáticamente desde la web.\n";

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: Amor & Detalles <no-reply@amor-detalles.local>';
$headers[] = 'Reply-To: ' . $correo;

if (mail($destinatario, $asunto, $mensaje, implode("\r\n", $headers))) {
    echo 'Pedido enviado correctamente.';
    exit;
}

http_response_code(500);
echo 'No se pudo enviar el correo. En XAMPP debes configurar SMTP o usar PHPMailer.';
