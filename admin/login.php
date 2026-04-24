<?php
require_once 'config/db.php';
require_once 'includes/auth.php';

if (is_admin_logged()) {
    header('Location: dashboard.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = trim($_POST['correo'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare('SELECT * FROM administradores WHERE correo = ? AND estado = "activo" LIMIT 1');
    $stmt->execute([$correo]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($password, $admin['password_hash'])) {
        $_SESSION['admin_id'] = $admin['id_admin'];
        $_SESSION['admin_nombre'] = $admin['nombre'];
        header('Location: dashboard.php');
        exit;
    }
    $error = 'Datos incorrectos.';
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acceso administrador | CodeZX</title>
  <link rel="stylesheet" href="assets/admin.css">
</head>
<body class="admin-login-body">
  <section class="login-card">
    <h1>Panel administrador</h1>
    <p>Gestiona productos, servicios, ofertas, clientes y pedidos.</p>
    <?php if ($error): ?><div class="admin-error"><?php echo htmlspecialchars($error); ?></div><?php endif; ?>
    <form method="POST" class="admin-form">
      <label>Correo
        <input type="email" name="correo" required>
      </label>
      <label>Contraseña
        <input type="password" name="password" required>
      </label>
      <button type="submit">Ingresar</button>
    </form>
  </section>
</body>
</html>
