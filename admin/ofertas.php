<?php
require_once 'config/db.php';
require_once 'includes/auth.php';
require_once 'includes/layout.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id_oferta'] ?? '';
    $data = [trim($_POST['titulo'] ?? ''), trim($_POST['descripcion'] ?? ''), (float)($_POST['descuento_porcentaje'] ?? 0), $_POST['fecha_inicio'] ?: null, $_POST['fecha_fin'] ?: null, $_POST['estado'] ?? 'activa'];
    if ($id) {
        $data[] = $id;
        $stmt = $pdo->prepare('UPDATE ofertas SET titulo=?, descripcion=?, descuento_porcentaje=?, fecha_inicio=?, fecha_fin=?, estado=? WHERE id_oferta=?');
    } else {
        $stmt = $pdo->prepare('INSERT INTO ofertas (titulo,descripcion,descuento_porcentaje,fecha_inicio,fecha_fin,estado) VALUES (?,?,?,?,?,?)');
    }
    $stmt->execute($data);
    header('Location: ofertas.php');
    exit;
}
$edit = null;
if (isset($_GET['edit'])) {
    $stmt = $pdo->prepare('SELECT * FROM ofertas WHERE id_oferta=?');
    $stmt->execute([(int)$_GET['edit']]);
    $edit = $stmt->fetch();
}
$ofertas = $pdo->query('SELECT * FROM ofertas ORDER BY fecha_creacion DESC')->fetchAll();
admin_header('Ofertas','ofertas');
?>
<div class="admin-grid">
<section class="admin-panel"><h2><?php echo $edit ? 'Editar oferta' : 'Agregar oferta'; ?></h2>
<form method="POST" class="admin-form" style="margin-top:14px">
<input type="hidden" name="id_oferta" value="<?php echo htmlspecialchars($edit['id_oferta'] ?? ''); ?>">
<label>Título<input name="titulo" value="<?php echo htmlspecialchars($edit['titulo'] ?? ''); ?>" required></label>
<label>Descripción<textarea name="descripcion" rows="4" required><?php echo htmlspecialchars($edit['descripcion'] ?? ''); ?></textarea></label>
<label>Descuento<input type="number" step="0.01" name="descuento_porcentaje" value="<?php echo htmlspecialchars($edit['descuento_porcentaje'] ?? '0.00'); ?>"></label>
<label>Fecha inicio<input type="date" name="fecha_inicio" value="<?php echo htmlspecialchars($edit['fecha_inicio'] ?? ''); ?>"></label>
<label>Fecha fin<input type="date" name="fecha_fin" value="<?php echo htmlspecialchars($edit['fecha_fin'] ?? ''); ?>"></label>
<label>Estado<select name="estado"><option value="activa">Activa</option><option value="inactiva">Inactiva</option></select></label>
<button type="submit">Guardar oferta</button>
</form></section>
<section class="admin-panel"><h2>Lista de ofertas</h2><table class="admin-table" style="margin-top:14px"><thead><tr><th>Oferta</th><th>Descuento</th><th>Estado</th><th>Acción</th></tr></thead><tbody>
<?php foreach($ofertas as $o): ?><tr><td><strong><?php echo htmlspecialchars($o['titulo']); ?></strong><br><span class="muted"><?php echo htmlspecialchars($o['descripcion']); ?></span></td><td><?php echo number_format((float)$o['descuento_porcentaje'],2); ?></td><td><span class="badge"><?php echo htmlspecialchars($o['estado']); ?></span></td><td><a class="admin-btn" href="?edit=<?php echo $o['id_oferta']; ?>">Editar</a></td></tr><?php endforeach; ?>
</tbody></table></section></div>
<?php admin_footer(); ?>