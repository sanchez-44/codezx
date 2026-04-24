<?php
require_once 'config/db.php';

$mensaje = '';
$tipo = 'info';
$linkReset = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = strtolower(trim($_POST['correo'] ?? ''));
    if (filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $stmt = $pdo->prepare('SELECT id_cliente FROM clientes WHERE correo = ? AND estado = "activo" LIMIT 1');
        $stmt->execute([$correo]);
        if ($stmt->fetch()) {
            $token = bin2hex(random_bytes(32));
            $expiracion = date('Y-m-d H:i:s', strtotime('+30 minutes'));
            $pdo->prepare('UPDATE password_resets SET usado = 1 WHERE correo = ? AND usado = 0')->execute([$correo]);
            $insert = $pdo->prepare('INSERT INTO password_resets (correo, token, expiracion, usado) VALUES (?, ?, ?, 0)');
            $insert->execute([$correo, $token, $expiracion]);
            $linkReset = 'http://localhost/codezx/cliente/reset_password.php?token=' . urlencode($token);
            $asunto = 'Recupera tu contraseña - Amor & Detalles';
            $mensajeCorreo = "Hola, usa este enlace para cambiar tu contraseña: " . $linkReset . "\nEl enlace vence en 30 minutos.";
            @mail($correo, $asunto, $mensajeCorreo, "Content-Type: text/plain; charset=UTF-8");
            $mensaje = 'Se generó un enlace de recuperación. En XAMPP se muestra abajo para pruebas.';
            $tipo = 'ok';
        } else {
            $mensaje = 'Si el correo existe, recibirás instrucciones para recuperar tu contraseña.';
            $tipo = 'ok';
        }
    } else {
        $mensaje = 'Ingresa un correo válido.';
        $tipo = 'error';
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Recuperar contraseña | Amor & Detalles</title><link rel="stylesheet" href="assets/cliente.css"></head>
<body class="customer-page">
  <section class="customer-card">
    <h1>Recuperar contraseña</h1>
    <p>Ingresa tu correo y generaremos un enlace temporal para crear una nueva contraseña.</p>
    <?php if ($mensaje): ?><div class="notice <?php echo $tipo; ?>"><?php echo htmlspecialchars($mensaje); ?></div><?php endif; ?>
    <?php if ($linkReset): ?><div class="notice info"><strong>Enlace de prueba:</strong><br><a href="<?php echo htmlspecialchars($linkReset); ?>"><?php echo htmlspecialchars($linkReset); ?></a></div><?php endif; ?>
    <form method="POST" class="customer-form">
      <label>Correo<input type="email" name="correo" required></label>
      <button type="submit">Generar enlace</button>
    </form>
    <div class="customer-links"><a class="customer-btn" href="login.php">Volver al login</a></div>
  </section>
</body>
</html>
