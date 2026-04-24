<?php
require_once 'config/db.php';
require_once 'includes/session.php';
requiere_cliente();

$stmt = $pdo->prepare('SELECT * FROM clientes WHERE id_cliente = ? LIMIT 1');
$stmt->execute([$_SESSION['cliente_id']]);
$cliente = $stmt->fetch();
?>
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Mi cuenta | Amor & Detalles</title><link rel="stylesheet" href="assets/cliente.css"></head>
<body>
  <main class="customer-dashboard">
    <div class="top-actions">
      <div><h1>Hola, <?php echo htmlspecialchars($cliente['nombre']); ?></h1><p>Bienvenido a tu área de beneficios exclusivos.</p></div>
      <div class="customer-links"><a class="customer-btn" href="../tienda.html">Ir a tienda</a><a class="customer-btn" href="logout.php">Cerrar sesión</a></div>
    </div>
    <section class="dashboard-grid">
      <article class="dash-card"><h3>Beneficio activo</h3><p>Acceso a promociones especiales para clientes registrados.</p></article>
      <article class="dash-card"><h3>Ofertas por correo</h3><p><?php echo $cliente['recibe_ofertas_correo'] ? 'Activado' : 'Desactivado'; ?></p></article>
      <article class="dash-card"><h3>Ofertas por WhatsApp</h3><p><?php echo $cliente['recibe_ofertas_whatsapp'] ? 'Activado' : 'Desactivado'; ?></p></article>
    </section>
  </main>
</body>
</html>
