<?php
require_once 'config/db.php';
require_once 'includes/auth.php';
require_once 'includes/layout.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id_pedido'], $_POST['estado'])) {
    $stmt = $pdo->prepare('UPDATE pedidos SET estado=? WHERE id_pedido=?');
    $stmt->execute([$_POST['estado'], (int)$_POST['id_pedido']]);
    header('Location: pedidos.php');
    exit;
}

$pedidos = $pdo->query('SELECT * FROM pedidos ORDER BY fecha_pedido DESC')->fetchAll();
admin_header('Pedidos','pedidos');
?>
<section class="admin-panel">
  <h2>Pedidos y reservas</h2>
  <table class="admin-table" style="margin-top:16px">
    <thead><tr><th>Cliente</th><th>Contacto</th><th>Total</th><th>Estado</th><th>Fecha</th><th>Actualizar</th></tr></thead>
    <tbody>
      <?php foreach($pedidos as $p): ?>
      <tr>
        <td><?php echo htmlspecialchars($p['nombre_cliente']); ?><br><span class="muted"><?php echo htmlspecialchars($p['direccion']); ?></span></td>
        <td><?php echo htmlspecialchars($p['correo']); ?><br><?php echo htmlspecialchars($p['telefono']); ?></td>
        <td>S/ <?php echo number_format((float)$p['total'], 2); ?></td>
        <td><span class="badge"><?php echo htmlspecialchars($p['estado']); ?></span></td>
        <td><?php echo htmlspecialchars($p['fecha_pedido']); ?></td>
        <td>
          <form method="POST" class="row-actions">
            <input type="hidden" name="id_pedido" value="<?php echo $p['id_pedido']; ?>">
            <select name="estado">
              <?php foreach(['pendiente','confirmado','preparando','entregado','cancelado'] as $estado): ?>
                <option value="<?php echo $estado; ?>" <?php echo $p['estado']===$estado?'selected':''; ?>><?php echo $estado; ?></option>
              <?php endforeach; ?>
            </select>
            <button class="admin-btn" type="submit">Guardar</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
      <?php if (!$pedidos): ?><tr><td colspan="6">Aún no hay pedidos.</td></tr><?php endif; ?>
    </tbody>
  </table>
</section>
<?php admin_footer(); ?>