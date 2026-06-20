<?php
session_start();
header('Content-Type: application/json');
require_once 'db.php';
require_once 'services.php';


$action = $_GET['action'] ?? 'list';
$user_id = $_SESSION['user_id'] ?? null;
$role = $_SESSION['role'] ?? 'parent';

switch ($action) {
    case 'list':
        if ($role === 'admin') {
            // Admin gets all without progress dependency
            $stmt = $pdo->query("SELECT * FROM learning_modules ORDER BY id DESC");
            $modules = $stmt->fetchAll();
            echo json_encode(['success' => true, 'modules' => $modules]);
        } else {
            // Regular user gets modules + their progress
            if (!$user_id) {
                echo json_encode(['success' => false, 'message' => 'Unauthorized']);
                exit;
            }
            $stmt = $pdo->prepare("
                SELECT lm.*, IFNULL(up.progress, 0) as progress 
                FROM learning_modules lm 
                LEFT JOIN user_progress up ON lm.id = up.module_id AND up.user_id = ?
                ORDER BY lm.id ASC
            ");
            $stmt->execute([$user_id]);
            $modules = $stmt->fetchAll();
            echo json_encode(['success' => true, 'modules' => $modules]);
        }
        break;

    case 'add':
        // Admin only
        if ($role !== 'admin') {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Forbidden']);
            exit;
        }
        
        $data = json_decode(file_get_contents('php://input'), true);
        $title = $data['title'] ?? '';
        $desc = $data['description'] ?? '';
        $category = $data['category'] ?? '';
        $difficulty = $data['difficulty'] ?? 'Easy';
        
        $stmt = $pdo->prepare("INSERT INTO learning_modules (title, description, category, difficulty) VALUES (?, ?, ?, ?)");
        if ($stmt->execute([$title, $desc, $category, $difficulty])) {
            $moduleId = $pdo->lastInsertId();
            logActivity($user_id, 'Add Module', 'Added new module: ' . $title);
            echo json_encode(['success' => true, 'module_id' => $moduleId]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to add module']);
        }
        break;

    case 'delete':
        // Admin only
        if ($role !== 'admin') {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Forbidden']);
            exit;
        }
        $id = $_GET['id'] ?? 0;
        $stmt = $pdo->prepare("DELETE FROM learning_modules WHERE id = ?");
        $stmt->execute([$id]);
        logActivity($user_id, 'Delete Module', 'Deleted module ID: ' . $id);
        echo json_encode(['success' => true, 'message' => 'Deleted successfully']);
        break;
        
    case 'update_progress':
        if (!$user_id) {
            echo json_encode(['success' => false, 'message' => 'Unauthorized']);
            exit;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        $module_id = $data['module_id'] ?? 0;
        $progress = $data['progress'] ?? 0; // 0 to 100
        
        // Upsert progress
        $stmt = $pdo->prepare("
            INSERT INTO user_progress (user_id, module_id, progress, completed) 
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE progress = VALUES(progress), completed = VALUES(completed), last_accessed = NOW()
        ");
        $completed = $progress >= 100 ? 1 : 0;
        $stmt->execute([$user_id, $module_id, $progress, $completed]);
        
        if ($completed) {
            logActivity($user_id, 'Module Completed', 'Completed module ID: ' . $module_id);
            sendNotification($user_id, 'Module Completed! 🎓', 'Congratulations on finishing the module. Keep learning!', 'progress');
        } else {
            logActivity($user_id, 'Progress Updated', 'Updated progress for module ID: ' . $module_id . ' to ' . $progress . '%');
        }
        
        echo json_encode(['success' => true, 'message' => 'Progress updated']);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Unknown action']);
}
?>
