<?php
require_once 'config/db.php';
require_once 'includes/auth.php';
require_once 'includes/layout.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id_producto'] ?? '';
    $data = [
        trim($_POST['codigo'] ?? ''), trim($_POST['nombre'] ?? ''), trim($_POST['descripcion'] ?? ''),
        (float)($_POST['precio'] ?? 0), ($_POST['precio_oferta'] !== '' ? (float)$_POST['precio_oferta'] : null),
        trim($_POST['imagen'] ?? ''), trim($_POST['categoria'] ?? ''), (int)($_POST['stock'] ?? 0),
        trim($_POST['etiqueta'] ?? ''), isset($_POST['es_oferta']) ? 1 : 0, $_POST['estado'] ?? 'activo'
    ];
    if ($id) {
        $data[] = $id;
        $stmt = $pdo->prepare('UPDATE productos SET codigo=?, nombre=?, descripcion=?, precio=?, precio_oferta=?, imagen=?, categoria=?, stock=?, etiqueta=?, es_oferta=?, estado=? WHERE id_producto=?');
        $stmt->execute($data);
    } else {
        $stmt = $pdo->prepare('INSERT INTO productos (codigo,nombre,descripcion,precio,precio_oferta,imagen,categoria,stock,etiqueta,es_oferta,estado) VALUES (?,?,?,?,?,?,?,?,?,?,?)');
        $stmt->execute($data);
    }
    header('Location: productos.php'); exit;
}

if (isset($_GET['delete'])) {
    $stmt = $pdo->prepare('DELETE FROM productos WHERE id_producto=?');
    $stmt->execute([(int)$_GET['delete']]);
    header('Location: productos.php'); exit;
}

$edit = null;
if (isset($_GET['edit'])) {
    $stmt = $pdo->prepare('SELECT * FROM productos WHERE id_producto=?');
    $stmt->execute([(int)$_GET['edit']]);
    $edit = $stmt->fetch();
}
$productos = $pdo->query('SELECT * FROM productos ORDER BY id_producto DESC')->fetchAll();
admin_header('Administrar productos','productos');
?>
<div class="admin-grid">
  <section class="admin-panel">
    <h2><?php echo $edit ? 'Editar producto' : 'Agregar producto'; ?></h2>
    <form method="POST" class="admin-form" style="margin-top:14px">
      <input type="hidden" name="id_producto" value="<?php echo htmlspecialchars($edit['id_producto'] ?? ''); ?>">
      <label>Código<input name="codigo" value="<?php echo htmlspecialchars($edit['codigo'] ?? ''); ?>" required></label>
      <label>Nombre<input name="nombre" value="<?php echo htmlspecialchars($edit['nombre'] ?? ''); ?>" required></label>
      <label>Descripción<textarea name="descripcion" rows="4" required><?php echo htmlspecialchars($edit['descripcion'] ?? ''); ?></textarea></label>
      <label>Precio<input type="number" step="0.01" name="precio" value="<?php echo htmlspecialchars($edit['precio'] ?? '0.00'); ?>" required></label>
      <label>Precio oferta<input type="number" step="0.01" name="precio_oferta" value="<?php echo htmlspecialchars($edit['precio_oferta'] ?? ''); ?>"></label>
      <label>Imagen/ruta<input name="imagen" value="<?php echo htmlspecialchars($edit['imagen'] ?? 'img/'); ?>"></label>
      <label>Categoría<input name="categoria" value="<?php echo htmlspecialchars($edit['categoria'] ?? ''); ?>"></label>
      <label>Stock<input type="number" name="stock" value="<?php echo htmlspecialchars($edit['stock'] ?? 0); ?>"></label>
      <label>Etiqueta<input name="etiqueta" value="<?php echo htmlspecialchars($edit['etiqueta'] ?? ''); ?>"></label>
      <label><input type="checkbox" name="es_oferta" <?php echo !empty($edit['es_oferta']) ? 'checked' : ''; ?>> Marcar como oferta</label>
      <label>Estado<select name="estado"><option value="activo">Activo</option><option value="inactivo" <?php echo (($edit['estado'] ?? '')==='inactivo')?'selected':''; ?>>Inactivo</option></select></label>
      <button type="submit">Guardar producto</button>
    </form>
  </section>
  <section class="admin-panel">
    <h2>Lista de productos</h2>
    <table class="admin-table" style="margin-top:14px"><thead><tr><th>Producto</th><th>Precio</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>
      <?php foreach($productos as $p): ?><tr><td><strong><?php echo htmlspecialchars($p['nombre']); ?></strong><br><span class="muted"><?php echo htmlspecialchars($p['codigo']); ?> · <?php echo htmlspecialchars($p['categoria']); ?></span></td><td>S/ <?php echo number_format((float)$p['precio'],2); ?></td><td><span class="badge"><?php echo htmlspecialchars($p['estado']); ?></span></td><td class="row-actions"><a class="admin-btn" href="?edit=<?php echo $p['id_producto']; ?>">Editar</a><a class="admin-btn danger" onclick="return confirm('¿Eliminar producto?')" href="?delete=<?php echo $p['id_producto']; ?>">Eliminar</a></td></tr><?php endforeach; ?>
    </tbody></table>
  </section>
</div>
<?php admin_footer(); ?>