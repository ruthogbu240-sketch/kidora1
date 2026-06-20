<?php
ob_start();
session_start();
header('Content-Type: application/json');
require_once 'db.php';
require_once 'services.php';

// Auth check
$user_id = $_SESSION['user_id'] ?? null;
$role = $_SESSION['role'] ?? null;

if (!$user_id || $role !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Admin access required']);
    exit;
}

$action = $_GET['action'] ?? '';
$data = json_decode(file_get_contents('php://input'), true);

switch ($action) {
    // --- MODULES ---
    case 'add_module':
        $stmt = $pdo->prepare("INSERT INTO learning_modules (title, description, category, difficulty, estimated_time, age_range) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['title'],
            $data['description'],
            $data['category'] ?? 'General',
            $data['difficulty'] ?? 'Easy',
            $data['estimated_time'] ?? '15 mins',
            $data['age_range'] ?? 'Any'
        ]);
        logActivity($user_id, 'Create Module', "Added module: " . $data['title']);
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        break;

    case 'delete_module':
        $id = $_GET['id'] ?? 0;
        $stmt = $pdo->prepare("DELETE FROM learning_modules WHERE id = ?");
        $stmt->execute([$id]);
        logActivity($user_id, 'Delete Module', "Deleted module ID: $id");
        echo json_encode(['success' => true]);
        break;

    case 'update_module':
        $stmt = $pdo->prepare("UPDATE learning_modules SET title = ?, description = ?, category = ?, difficulty = ? WHERE id = ?");
        $stmt->execute([$data['title'], $data['description'], $data['category'], $data['difficulty'], $data['id']]);
        logActivity($user_id, 'Update Module', "Updated module: " . $data['title']);
        echo json_encode(['success' => true]);
        break;

    // --- SIMULATORS ---
   case 'add_simulator':
    $options = json_encode($data['options']);
    $stmt = $pdo->prepare("INSERT INTO simulator_scenarios (title, `desc`, prompt, `options`, type) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$data['title'], $data['desc'], $data['prompt'], $options, $data['type'] ?? 'Behavioral']);
    logActivity($user_id, 'Create Simulator', "Added simulator: " . $data['title']);
    echo json_encode(['success' => true]);
    break;


    case 'update_simulator':
    $options = json_encode($data['options']);
    $stmt = $pdo->prepare("UPDATE simulator_scenarios SET title = ?, `desc` = ?, prompt = ?, `options` = ? WHERE id = ?");
    $stmt->execute([$data['title'], $data['desc'], $data['prompt'], $options, $data['id']]);
    logActivity($user_id, 'Update Simulator', "Updated simulator: " . $data['title']);
    echo json_encode(['success' => true]);
    break;


    case 'delete_simulator':
        $id = $_GET['id'] ?? 0;
        $stmt = $pdo->prepare("DELETE FROM simulator_scenarios WHERE id = ?");
        $stmt->execute([$id]);
        logActivity($user_id, 'Delete Simulator', "Deleted simulator ID: $id");
        echo json_encode(['success' => true]);
        break;

    // --- EMOTION CARDS ---
    case 'add_emotion':
        $stmt = $pdo->prepare("INSERT INTO emotion_cards (emotion, scenario, hidden_message, response) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['emotion'], $data['scenario'], $data['hidden_message'], $data['response']]);
        logActivity($user_id, 'Create Emotion Card', "Added card: " . $data['emotion']);
        echo json_encode(['success' => true]);
        break;

    case 'update_emotion':
        $stmt = $pdo->prepare("UPDATE emotion_cards SET emotion = ?, scenario = ?, hidden_message = ?, response = ? WHERE id = ?");
        $stmt->execute([$data['emotion'], $data['scenario'], $data['hidden_message'], $data['response'], $data['id']]);
        logActivity($user_id, 'Update Emotion Card', "Updated card: " . $data['emotion']);
        echo json_encode(['success' => true]);
        break;

    case 'delete_emotion':
        $id = $_GET['id'] ?? 0;
        $stmt = $pdo->prepare("DELETE FROM emotion_cards WHERE id = ?");
        $stmt->execute([$id]);
        logActivity($user_id, 'Delete Emotion Card', "Deleted card ID: $id");
        echo json_encode(['success' => true]);
        break;

    // --- AWARENESS POSTS ---
    case 'add_awareness':
        $stmt = $pdo->prepare("INSERT INTO awareness_posts (title, content, action_tip) VALUES (?, ?, ?)");
        $stmt->execute([$data['title'], $data['content'], $data['action_tip']]);
        logActivity($user_id, 'Create Awareness Post', "Added post: " . $data['title']);
        echo json_encode(['success' => true]);
        break;

    case 'update_awareness':
        $stmt = $pdo->prepare("UPDATE awareness_posts SET title = ?, content = ?, action_tip = ? WHERE id = ?");
        $stmt->execute([$data['title'], $data['content'], $data['action_tip'], $data['id']]);
        logActivity($user_id, 'Update Awareness Post', "Updated post: " . $data['title']);
        echo json_encode(['success' => true]);
        break;

    case 'delete_awareness':
        $id = $_GET['id'] ?? 0;
        $stmt = $pdo->prepare("DELETE FROM awareness_posts WHERE id = ?");
        $stmt->execute([$id]);
        logActivity($user_id, 'Delete Awareness Post', "Deleted post ID: $id");
        echo json_encode(['success' => true]);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Unknown action']);
        break;

        case 'add_testimonial':
    $stmt = $pdo->prepare("INSERT INTO testimonials (name, role, quote) VALUES (?, ?, ?)");
    $stmt->execute([$data['name'], $data['role'], $data['quote']]);
    logActivity($user_id, 'Add Testimonial', "Added: " . $data['name']);
    echo json_encode(['success' => true]);
    break;
case 'update_testimonial':
    $stmt = $pdo->prepare("UPDATE testimonials SET name = ?, role = ?, quote = ? WHERE id = ?");
    $stmt->execute([$data['name'], $data['role'], $data['quote'], $data['id']]);
    logActivity($user_id, 'Update Testimonial', "Updated ID: " . $data['id']);
    echo json_encode(['success' => true]);
    break;
case 'delete_testimonial':
    $id = $_GET['id'] ?? 0;
    $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = ?");
    $stmt->execute([$id]);
    logActivity($user_id, 'Delete Testimonial', "Deleted ID: $id");
    echo json_encode(['success' => true]);
    break;
    case 'add_resource':
    $stmt = $pdo->prepare("INSERT INTO resources (title, description, resource_type, file_url, thumbnail_url, category) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$data['title'], $data['description'], $data['resource_type'], $data['file_url'], $data['thumbnail_url'], $data['category']]);
    logActivity($user_id, 'Add Resource', $data['title']);
    echo json_encode(['success' => true]);
    break;
case 'update_resource':
    $stmt = $pdo->prepare("UPDATE resources SET title=?, description=?, resource_type=?, file_url=?, thumbnail_url=?, category=? WHERE id=?");
    $stmt->execute([$data['title'], $data['description'], $data['resource_type'], $data['file_url'], $data['thumbnail_url'], $data['category'], $data['id']]);
    logActivity($user_id, 'Update Resource', $data['title']);
    echo json_encode(['success' => true]);
    break;
case 'delete_resource':
    $id = $_GET['id'] ?? 0;
    $stmt = $pdo->prepare("DELETE FROM resources WHERE id = ?");
    $stmt->execute([$id]);
    logActivity($user_id, 'Delete Resource', "ID: $id");
    echo json_encode(['success' => true]);
    break;
}
?>
