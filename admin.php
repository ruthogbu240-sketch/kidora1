<?php
session_start();
header('Content-Type: application/json');
require_once 'db.php';

// Check if admin
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Forbidden']);
    exit;
}

$action = $_GET['action'] ?? 'users';

switch ($action) {
    case 'users':
        $stmt = $pdo->query("SELECT id, full_name as name, email, role, created_at FROM users ORDER BY id DESC");
        $users = $stmt->fetchAll();
        echo json_encode(['success' => true, 'users' => $users]);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Unknown action']);


        //admin@kidora1.com / password
}
?>
