<?php
require_once 'config/db.php';
require_once 'includes/auth.php';
require_once 'includes/layout.php';
require_admin();
$clientes = $pdo->query('SELECT * FROM clientes ORDER BY fecha_registro DESC')->fetchAll();
admin_header('Clientes','clientes');
?>
<section class="admin-panel">
  <h2>Clientes registrados</h2>
  <table class="admin-table" style="margin-top:16px">
    <thead><tr><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Ofertas</th><th>Estado</th></tr></thead>
    <tbody>
      <?php foreach($clientes as $c): ?>
      <tr>
        <td><?php echo htmlspecialchars($c['nombre']); ?></td>
        <td><?php echo htmlspecialchars($c['correo']); ?></td>
        <td><?php echo htmlspecialchars($c['telefono']); ?></td>
        <td>Correo: <?php echo $c['recibe_ofertas_correo'] ? 'Sí' : 'No'; ?> / WhatsApp: <?php echo $c['recibe_ofertas_whatsapp'] ? 'Sí' : 'No'; ?></td>
        <td><span class="badge"><?php echo htmlspecialchars($c['estado']); ?></span></td>
      </tr>
      <?php endforeach; ?>
      <?php if (!$clientes): ?><tr><td colspan="5">Aún no hay clientes.</td></tr><?php endif; ?>
    </tbody>
  </table>
</section>
<?php admin_footer(); ?>