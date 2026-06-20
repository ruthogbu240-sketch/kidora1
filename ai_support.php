<?php
// api/ai_support.php
session_start();
header('Content-Type: application/json');
require_once 'db.php';
require_once 'services.php';

$user_id = $_SESSION['user_id'] ?? null;
if (!$user_id) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$query = $data['query'] ?? '';

if (empty($query)) {
    echo json_encode(['success' => false, 'message' => 'Query is empty']);
    exit;
}

// --- INTELLIGENT ROUTER / MOCK LLM LOGIC ---
$response = "";
$view = null;
$query_lower = strtolower($query);

// Mapping keywords to views
if (strpos($query_lower, 'angry') !== false || strpos($query_lower, 'anger') !== false || strpos($query_lower, 'emotion') !== false) {
    $response = "It's common for children to express intense emotions. In Kidora's teachings, anger often has a hidden message. Check our Emotion Cards for deep insights.";
    $view = "emotions";
} 
else if (strpos($query_lower, 'stubborn') !== false || strpos($query_lower, 'rebellion') !== false || strpos($query_lower, 'independence') !== false) {
    $response = "Independence is a critical developmental stage. Understanding the psychology behind 'rebellion' can help you bond better. Check our Awareness Insights.";
    $view = "awareness";
}
else if (strpos($query_lower, 'tantrum') !== false || strpos($query_lower, 'screaming') !== false || strpos($query_lower, 'practice') !== false || strpos($query_lower, 'simulator') !== false) {
    $response = "Handling tantrums requires practice in the moment. I recommend trying out our behavioral simulators to test your responses safely.";
    $view = "simulator";
}
else if (strpos($query_lower, 'course') !== false || strpos($query_lower, 'lesson') !== false || strpos($query_lower, 'learn') !== false || strpos($query_lower, 'module') !== false) {
    $response = "Learning is the first step to change! We have several modules ready to help you on your parenting journey.";
    $view = "learning";
}
else if (strpos($query_lower, 'update') !== false || strpos($query_lower, 'news') !== false || strpos($query_lower, 'notification') !== false) {
    $response = "I can help you check for system updates or new notifications. Click below to view them.";
    $view = "notifications";
}
else if (strpos($query_lower, 'how to use') !== false || strpos($query_lower, 'platform') !== false || strpos($query_lower, 'help') !== false) {
    $response = "I am AIBOT! I'm here to show you around. You can use 'Learning Modules' to build skills, 'Emotion Cards' for empathy, and 'Simulators' for practice.";
    $view = "overview";
}
else {
    $response = "That's a great question about child development! While I'm still learning, I recommend checking our global resource library for more articles.";
}

// Log activity (optional: you could log here)
logActivity($user_id, 'AI Query: ' . substr($query, 0, 50));

echo json_encode([
    'success' => true,
    'response' => $response,
    'view' => $view,
    'bot_name' => 'AIBOT'
]);
?>
