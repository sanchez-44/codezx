<?php
require_once 'config/db.php';
$mensaje = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre'] ?? '');
    $correo = trim($_POST['correo'] ?? '');
    $clave = $_POST['clave'] ?? '';
    if ($nombre && filter_var($correo, FILTER_VALIDATE_EMAIL) && strlen($clave) >= 6) {
        $hash = password_hash($clave, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare('INSERT INTO administradores (nombre, correo, password_hash, estado) VALUES (?, ?, ?, "activo") ON DUPLICATE KEY UPDATE nombre = VALUES(nombre), password_hash = VALUES(password_hash), estado = "activo"');
        $stmt->execute([$nombre, $correo, $hash]);
        $mensaje = 'Administrador creado o actualizado correctamente. Ya puedes iniciar sesión.';
    } else {
        $mensaje = 'Completa nombre, correo válido y una clave de mínimo 6 caracteres.';
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Crear administrador</title><link rel="stylesheet" href="assets/admin.css"></head>
<body class="admin-login-body">
  <section class="login-card">
    <h1>Crear administrador</h1>
    <p>Usa esta pantalla solo para preparar el panel en XAMPP.</p>
    <?php if ($mensaje): ?><div class="admin-error"><?php echo htmlspecialchars($mensaje); ?></div><?php endif; ?>
    <form method="POST" class="admin-form">
      <label>Nombre<input type="text" name="nombre" required></label>
      <label>Correo<input type="email" name="correo" required></label>
      <label>Clave<input type="password" name="clave" minlength="6" required></label>
      <button type="submit">Guardar administrador</button>
    </form>
    <a class="admin-btn" style="margin-top:14px" href="login.php">Ir al login</a>
  </section>
</body>
</html>
