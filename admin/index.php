<?php
require_once 'includes/auth.php';

if (is_admin_logged()) {
    header('Location: dashboard.php');
    exit;
}

header('Location: login.php');
exit;
?>
