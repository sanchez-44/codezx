<?php
require_once 'config/db.php';
require_once 'includes/auth.php';
require_once 'includes/layout.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id_servicio'] ?? '';
    $data = [trim($_POST['codigo'] ?? ''), trim($_POST['nombre'] ?? ''), trim($_POST['descripcion'] ?? ''), (float)($_POST['precio_base'] ?? 0), trim($_POST['imagen'] ?? ''), trim($_POST['etiqueta'] ?? ''), trim($_POST['beneficios'] ?? ''), $_POST['estado'] ?? 'activo'];
    if ($id) {
        $data[] = $id;
        $stmt = $pdo->prepare('UPDATE servicios SET codigo=?, nombre=?, descripcion=?, precio_base=?, imagen=?, etiqueta=?, beneficios=?, estado=? WHERE id_servicio=?');
    } else {
        $stmt = $pdo->prepare('INSERT INTO servicios (codigo,nombre,descripcion,precio_base,imagen,etiqueta,beneficios,estado) VALUES (?,?,?,?,?,?,?,?)');
    }
    $stmt->execute($data);
    header('Location: servicios.php');
    exit;
}

$edit = null;
if (isset($_GET['edit'])) {
    $stmt = $pdo->prepare('SELECT * FROM servicios WHERE id_servicio=?');
    $stmt->execute([(int)$_GET['edit']]);
    $edit = $stmt->fetch();
}
$servicios = $pdo->query('SELECT * FROM servicios ORDER BY id_servicio DESC')->fetchAll();
admin_header('Administrar servicios','servicios');
?>
<div class="admin-grid">
<section class="admin-panel"><h2><?php echo $edit ? 'Editar servicio' : 'Agregar servicio'; ?></h2>
<form method="POST" class="admin-form" style="margin-top:14px">
<input type="hidden" name="id_servicio" value="<?php echo htmlspecialchars($edit['id_servicio'] ?? ''); ?>">
<label>Código<input name="codigo" value="<?php echo htmlspecialchars($edit['codigo'] ?? ''); ?>" required></label>
<label>Nombre<input name="nombre" value="<?php echo htmlspecialchars($edit['nombre'] ?? ''); ?>" required></label>
<label>Descripción<textarea name="descripcion" rows="4" required><?php echo htmlspecialchars($edit['descripcion'] ?? ''); ?></textarea></label>
<label>Precio base<input type="number" step="0.01" name="precio_base" value="<?php echo htmlspecialchars($edit['precio_base'] ?? '0.00'); ?>" required></label>
<label>Imagen<input name="imagen" value="<?php echo htmlspecialchars($edit['imagen'] ?? 'img/'); ?>"></label>
<label>Etiqueta<input name="etiqueta" value="<?php echo htmlspecialchars($edit['etiqueta'] ?? ''); ?>"></label>
<label>Beneficios<textarea name="beneficios" rows="3"><?php echo htmlspecialchars($edit['beneficios'] ?? ''); ?></textarea></label>
<label>Estado<select name="estado"><option value="activo">Activo</option><option value="inactivo">Inactivo</option></select></label>
<button type="submit">Guardar servicio</button>
</form></section>
<section class="admin-panel"><h2>Lista de servicios</h2><table class="admin-table" style="margin-top:14px"><thead><tr><th>Servicio</th><th>Precio</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>
<?php foreach($servicios as $s): ?><tr><td><strong><?php echo htmlspecialchars($s['nombre']); ?></strong><br><span class="muted"><?php echo htmlspecialchars($s['codigo']); ?></span></td><td>S/ <?php echo number_format((float)$s['precio_base'],2); ?></td><td><span class="badge"><?php echo htmlspecialchars($s['estado']); ?></span></td><td><a class="admin-btn" href="?edit=<?php echo $s['id_servicio']; ?>">Editar</a></td></tr><?php endforeach; ?>
</tbody></table></section></div>
<?php admin_footer(); ?>