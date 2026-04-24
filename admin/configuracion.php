<?php
require_once 'config/db.php';
require_once 'includes/auth.php';
require_once 'includes/layout.php';
require_admin();

$config = $pdo->query('SELECT * FROM configuracion_web WHERE id_config = 1')->fetch();
if (!$config) {
    $pdo->exec("INSERT INTO configuracion_web (id_config, nombre_empresa) VALUES (1, 'Amor & Detalles')");
    $config = $pdo->query('SELECT * FROM configuracion_web WHERE id_config = 1')->fetch();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $pdo->prepare('UPDATE configuracion_web SET nombre_empresa=?, lema=?, correo=?, whatsapp=?, facebook=?, instagram=?, tiktok=?, youtube=?, video_inicio=?, banner_inicio=? WHERE id_config=1');
    $stmt->execute([
        trim($_POST['nombre_empresa'] ?? ''),
        trim($_POST['lema'] ?? ''),
        trim($_POST['correo'] ?? ''),
        trim($_POST['whatsapp'] ?? ''),
        trim($_POST['facebook'] ?? ''),
        trim($_POST['instagram'] ?? ''),
        trim($_POST['tiktok'] ?? ''),
        trim($_POST['youtube'] ?? ''),
        trim($_POST['video_inicio'] ?? ''),
        trim($_POST['banner_inicio'] ?? '')
    ]);
    header('Location: configuracion.php?ok=1');
    exit;
}

admin_header('Configuración web','configuracion');
?>
<section class="admin-panel">
  <?php if(isset($_GET['ok'])): ?><div class="admin-note">Configuración guardada correctamente.</div><?php endif; ?>
  <form method="POST" class="admin-form">
    <label>Nombre de empresa<input name="nombre_empresa" value="<?php echo htmlspecialchars($config['nombre_empresa'] ?? ''); ?>" required></label>
    <label>Lema<input name="lema" value="<?php echo htmlspecialchars($config['lema'] ?? ''); ?>"></label>
    <label>Correo<input name="correo" value="<?php echo htmlspecialchars($config['correo'] ?? ''); ?>"></label>
    <label>WhatsApp<input name="whatsapp" value="<?php echo htmlspecialchars($config['whatsapp'] ?? ''); ?>"></label>
    <label>Facebook<input name="facebook" value="<?php echo htmlspecialchars($config['facebook'] ?? ''); ?>"></label>
    <label>Instagram<input name="instagram" value="<?php echo htmlspecialchars($config['instagram'] ?? ''); ?>"></label>
    <label>TikTok<input name="tiktok" value="<?php echo htmlspecialchars($config['tiktok'] ?? ''); ?>"></label>
    <label>YouTube<input name="youtube" value="<?php echo htmlspecialchars($config['youtube'] ?? ''); ?>"></label>
    <label>Video de inicio<input name="video_inicio" value="<?php echo htmlspecialchars($config['video_inicio'] ?? ''); ?>"></label>
    <label>Banner de inicio<input name="banner_inicio" value="<?php echo htmlspecialchars($config['banner_inicio'] ?? ''); ?>"></label>
    <button type="submit">Guardar configuración</button>
  </form>
</section>
<?php admin_footer(); ?>