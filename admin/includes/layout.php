<?php
function admin_header($title, $active = '') {
    echo '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' . htmlspecialchars($title) . ' | Admin CodeZX</title><link rel="stylesheet" href="assets/admin.css"></head><body><div class="admin-layout"><aside class="admin-sidebar"><h2>Amor & Detalles</h2><nav class="admin-menu">';
    $items = [
        'dashboard.php' => ['Dashboard','dashboard'],
        'productos.php' => ['Productos','productos'],
        'servicios.php' => ['Servicios','servicios'],
        'ofertas.php' => ['Ofertas','ofertas'],
        'clientes.php' => ['Clientes','clientes'],
        'pedidos.php' => ['Pedidos','pedidos'],
        'configuracion.php' => ['Configuración','configuracion'],
        'logout.php' => ['Cerrar sesión','logout']
    ];
    foreach ($items as $href => $data) {
        $class = $active === $data[1] ? ' class="active"' : '';
        echo '<a href="' . $href . '"' . $class . '>' . $data[0] . '</a>';
    }
    echo '</nav></aside><main class="admin-main"><div class="admin-top"><h1>' . htmlspecialchars($title) . '</h1><a class="admin-btn" href="../index.html" target="_blank">Ver web</a></div>';
}
function admin_footer() { echo '</main></div></body></html>'; }
?>