<?php
require_once 'config/db.php';

$token = $_GET['token'] ?? $_POST['token'] ?? '';
$mensaje = '';
$tipo = 'error';
$valido = false;
$reset = null;

if ($token) {
    $stmt = $pdo->prepare('SELECT * FROM password_resets WHERE token = ? AND usado = 0 AND expiracion > NOW() LIMIT 1');
    $stmt->execute([$token]);
    $reset = $stmt->fetch();
    $valido = (bool)$reset;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $valido) {
    $clave = $_POST['clave'] ?? '';
    $confirmar = $_POST['confirmar'] ?? '';

    if (strlen($clave) < 6) {
        $mensaje = 'La contraseña debe tener mínimo 6 caracteres.';
    } elseif ($clave !== $confirmar) {
        $mensaje = 'Las contraseñas no coinciden.';
    } else {
        $hash = password_hash($clave, PASSWORD_DEFAULT);
        $pdo->prepare('UPDATE clientes SET password_hash = ? WHERE correo = ?')->execute([$hash, $reset['correo']]);
        $pdo->prepare('UPDATE password_resets SET usado = 1 WHERE id_reset = ?')->execute([$reset['id_reset']]);
        $mensaje = 'Contraseña actualizada correctamente. Ya puedes iniciar sesión.';
        $tipo = 'ok';
        $valido = false;
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Nueva contraseña | Amor & Detalles</title><link rel="stylesheet" href="assets/cliente.css"></head>
<body class="customer-page">
  <section class="customer-card">
    <h1>Nueva contraseña</h1>
    <?php if ($mensaje): ?><div class="notice <?php echo $tipo; ?>"><?php echo htmlspecialchars($mensaje); ?></div><?php endif; ?>
    <?php if ($valido): ?>
      <p>Crea una nueva contraseña para tu cuenta.</p>
      <form method="POST" class="customer-form">
        <input type="hidden" name="token" value="<?php echo htmlspecialchars($token); ?>">
        <label>Nueva contraseña<input type="password" name="clave" minlength="6" required></label>
        <label>Confirmar contraseña<input type="password" name="confirmar" minlength="6" required></label>
        <button type="submit">Actualizar contraseña</button>
      </form>
    <?php elseif (!$mensaje): ?>
      <div class="notice error">El enlace no es válido, ya fue usado o venció.</div>
    <?php endif; ?>
    <div class="customer-links"><a class="customer-btn" href="login.php">Ir al login</a><a class="customer-btn" href="forgot_password.php">Generar otro enlace</a></div>
  </section>
</body>
</html>
