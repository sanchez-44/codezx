<?php
require_once 'config/db.php';
require_once 'includes/auth.php';
require_once 'includes/layout.php';
require_admin();

$stats = [];
foreach ([
    'productos' => 'SELECT COUNT(*) FROM productos',
    'servicios' => 'SELECT COUNT(*) FROM servicios',
    'clientes' => 'SELECT COUNT(*) FROM clientes',
    'pedidos' => 'SELECT COUNT(*) FROM pedidos'
] as $key => $sql) {
    $stats[$key] = (int)$pdo->query($sql)->fetchColumn();
}

$ultimosPedidos = $pdo->query('SELECT * FROM pedidos ORDER BY fecha_pedido DESC LIMIT 5')->fetchAll();
admin_header('Dashboard', 'dashboard');
?>
<div class="stats-grid">
  <div class="stat-card"><span>Productos</span><strong><?php echo $stats['productos']; ?></strong></div>
  <div class="stat-card"><span>Servicios</span><strong><?php echo $stats['servicios']; ?></strong></div>
  <div class="stat-card"><span>Clientes</span><strong><?php echo $stats['clientes']; ?></strong></div>
  <div class="stat-card"><span>Pedidos</span><strong><?php echo $stats['pedidos']; ?></strong></div>
</div>

<section class="admin-panel" style="margin-top:22px">
  <h2>Últimos pedidos</h2>
  <table class="admin-table" style="margin-top:16px">
    <thead><tr><th>Cliente</th><th>Total</th><th>Estado</th><th>Fecha</th></tr></thead>
    <tbody>
      <?php foreach ($ultimosPedidos as $pedido): ?>
        <tr>
          <td><?php echo htmlspecialchars($pedido['nombre_cliente']); ?><br><span class="muted"><?php echo htmlspecialchars($pedido['correo']); ?></span></td>
          <td>S/ <?php echo number_format((float)$pedido['total'], 2); ?></td>
          <td><span class="badge"><?php echo htmlspecialchars($pedido['estado']); ?></span></td>
          <td><?php echo htmlspecialchars($pedido['fecha_pedido']); ?></td>
        </tr>
      <?php endforeach; ?>
      <?php if (!$ultimosPedidos): ?><tr><td colspan="4">Aún no hay pedidos registrados.</td></tr><?php endif; ?>
    </tbody>
  </table>
</section>
<?php admin_footer(); ?>