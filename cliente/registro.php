<?php
require_once 'config/db.php';
require_once 'includes/session.php';

$mensaje = '';
$tipo = 'error';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre'] ?? '');
    $correo = strtolower(trim($_POST['correo'] ?? ''));
    $telefono = preg_replace('/\D/', '', $_POST['telefono'] ?? '');
    $clave = $_POST['clave'] ?? '';
    $ofertaCorreo = isset($_POST['oferta_correo']) ? 1 : 0;
    $ofertaWhatsapp = isset($_POST['oferta_whatsapp']) ? 1 : 0;

    if ($nombre && filter_var($correo, FILTER_VALIDATE_EMAIL) && $telefono && strlen($clave) >= 6) {
        $stmt = $pdo->prepare('SELECT id_cliente FROM clientes WHERE correo = ? LIMIT 1');
        $stmt->execute([$correo]);
        if ($stmt->fetch()) {
            $mensaje = 'Este correo ya está registrado.';
        } else {
            $hash = password_hash($clave, PASSWORD_DEFAULT);
            $insert = $pdo->prepare('INSERT INTO clientes (nombre, correo, telefono, password_hash, recibe_ofertas_correo, recibe_ofertas_whatsapp) VALUES (?, ?, ?, ?, ?, ?)');
            $insert->execute([$nombre, $correo, $telefono, $hash, $ofertaCorreo, $ofertaWhatsapp]);
            $_SESSION['cliente_id'] = $pdo->lastInsertId();
            $_SESSION['cliente_nombre'] = $nombre;
            header('Location: dashboard.php');
            exit;
        }
    } else {
        $mensaje = 'Completa todos los datos. La contraseña debe tener mínimo 6 caracteres.';
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Crear cuenta | Amor & Detalles</title><link rel="stylesheet" href="assets/cliente.css"></head>
<body class="customer-page">
  <section class="customer-card">
    <h1>Crear cuenta</h1>
    <p>Regístrate para recibir beneficios, ofertas y atención personalizada.</p>
    <?php if ($mensaje): ?><div class="notice <?php echo $tipo; ?>"><?php echo htmlspecialchars($mensaje); ?></div><?php endif; ?>
    <form method="POST" class="customer-form">
      <label>Nombre completo<input type="text" name="nombre" required></label>
      <label>Correo<input type="email" name="correo" required></label>
      <label>WhatsApp<input type="tel" name="telefono" required></label>
      <label>Contraseña<input type="password" name="clave" minlength="6" required></label>
      <label class="check-row"><input type="checkbox" name="oferta_correo" checked> Recibir ofertas por correo</label>
      <label class="check-row"><input type="checkbox" name="oferta_whatsapp" checked> Recibir ofertas por WhatsApp</label>
      <button type="submit">Crear cuenta</button>
    </form>
    <div class="customer-links"><a class="customer-btn" href="login.php">Ya tengo cuenta</a><a class="customer-btn" href="../index.html">Volver a la web</a></div>
  </section>
</body>
</html>
