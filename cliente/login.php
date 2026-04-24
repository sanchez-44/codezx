<?php
require_once 'config/db.php';
require_once 'includes/session.php';

if (cliente_logueado()) {
    header('Location: dashboard.php');
    exit;
}

$mensaje = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = strtolower(trim($_POST['correo'] ?? ''));
    $clave = $_POST['clave'] ?? '';
    $stmt = $pdo->prepare('SELECT * FROM clientes WHERE correo = ? AND estado = "activo" LIMIT 1');
    $stmt->execute([$correo]);
    $cliente = $stmt->fetch();
    if ($cliente && password_verify($clave, $cliente['password_hash'])) {
        $_SESSION['cliente_id'] = $cliente['id_cliente'];
        $_SESSION['cliente_nombre'] = $cliente['nombre'];
        header('Location: dashboard.php');
        exit;
    }
    $mensaje = 'Correo o contraseña incorrectos.';
}
?>
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Iniciar sesión | Amor & Detalles</title><link rel="stylesheet" href="assets/cliente.css"></head>
<body class="customer-page">
  <section class="customer-card">
    <h1>Área de clientes</h1>
    <p>Ingresa para ver beneficios y ofertas exclusivas.</p>
    <?php if ($mensaje): ?><div class="notice error"><?php echo htmlspecialchars($mensaje); ?></div><?php endif; ?>
    <form method="POST" class="customer-form">
      <label>Correo<input type="email" name="correo" required></label>
      <label>Contraseña<input type="password" name="clave" required></label>
      <button type="submit">Entrar</button>
    </form>
    <div class="customer-links"><a class="customer-btn" href="registro.php">Crear cuenta</a><a class="customer-btn" href="forgot_password.php">Olvidé mi contraseña</a><a class="customer-btn" href="../index.html">Volver</a></div>
  </section>
</body>
</html>
