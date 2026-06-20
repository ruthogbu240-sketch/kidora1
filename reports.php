<?php
// api/reports.php
session_start();
header('Content-Type: application/json');
require_once 'db.php';

// Check if admin
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Forbidden']);
    exit;
}

$action = $_GET['action'] ?? 'audit_logs';

switch ($action) {
    case 'audit_logs':
        $stmt = $pdo->query("
            SELECT al.*, u.full_name as user_name 
            FROM activity_logs al 
            LEFT JOIN users u ON al.user_id = u.id 
            ORDER BY al.created_at DESC 
            LIMIT 50
        ");
        $logs = $stmt->fetchAll();
        echo json_encode(['success' => true, 'logs' => $logs]);
        break;

    case 'stats_summary':
        // Daily module completions
        $stmtCompletions = $pdo->query("SELECT DATE(created_at) as date, COUNT(*) as count FROM activity_logs WHERE action = 'Module Completed' GROUP BY DATE(created_at) ORDER BY date DESC LIMIT 7");
        $completions = $stmtCompletions->fetchAll();

        // Total donations by day
        $stmtDonations = $pdo->query("SELECT DATE(created_at) as date, SUM(amount) as total FROM donations WHERE status = 'Completed' GROUP BY DATE(created_at) ORDER BY date DESC LIMIT 7");
        $donations = $stmtDonations->fetchAll();

        echo json_encode([
            'success' => true, 
            'completions' => $completions,
            'donations' => $donations,
            'counts' => [
                'users' => $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn(),
                'modules' => $pdo->query("SELECT COUNT(*) FROM learning_modules")->fetchColumn()
            ]
        ]);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Unknown action']);
}
?>
