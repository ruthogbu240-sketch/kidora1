<?php
ob_start();
session_start();
header('Content-Type: application/json');
require_once 'db.php';

$type = $_GET['type'] ?? '';

switch ($type) {
    case 'emotions':
        $stmt = $pdo->query("SELECT * FROM emotion_cards ORDER BY id ASC");
        echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        break;

    case 'awareness':
        $stmt = $pdo->query("SELECT * FROM awareness_posts ORDER BY id ASC");
        echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        break;

    case 'community':
        $stmt = $pdo->query("SELECT * FROM testimonials ORDER BY id ASC");
        echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        break;

    case 'overview':
        $stmtUsers = $pdo->query("SELECT COUNT(*) FROM users");
        $stmtModules = $pdo->query("SELECT COUNT(*) FROM learning_modules");
        $overviewData = [
            'dailyAction' => [
                'action' => "Ask 'What was the hardest part of your day?' instead of 'How was school?'",
                'impact' => "Encourages deep reflection and vulnerability."
            ],
            'motivation' => [
                'skill' => "Critical Thinking",
                'benefit' => "Your child is showing potential in navigating peer pressure. Nurture this by asking open-ended questions.",
                'nurtureTip' => "Ask 'Why do you think that happened?' regularly."
            ],
            'stats' => [
                'users' => $stmtUsers->fetchColumn(),
                'modules' => $stmtModules->fetchColumn()
            ]
        ];
        echo json_encode(['success' => true, 'data' => $overviewData]);
        break;

    case 'simulator':
        $stmt = $pdo->query("SELECT * FROM simulator_scenarios WHERE status = 'active'");
        $scenarios = $stmt->fetchAll();
        
        // Parse JSON options and preserve the type field
        foreach ($scenarios as &$scen) {
            $options = json_decode($scen['options'], true);
            if ($options && isset($options['A']) && isset($options['B'])) {
                $scen['options'] = [
                    'A' => [
                        'label' => $options['A']['label'] ?? 'Option A',
                        'outcome' => $options['A']['outcome'] ?? 'Outcome A',
                        'type' => $options['A']['type'] ?? 'neutral'
                    ],
                    'B' => [
                        'label' => $options['B']['label'] ?? 'Option B',
                        'outcome' => $options['B']['outcome'] ?? 'Outcome B',
                        'type' => $options['B']['type'] ?? 'neutral'
                    ]
                ];
            } else {
                // Fallback if JSON is invalid
                $scen['options'] = [
                    'A' => ['label' => 'Option A', 'outcome' => 'Default outcome', 'type' => 'neutral'],
                    'B' => ['label' => 'Option B', 'outcome' => 'Default outcome', 'type' => 'neutral']
                ];
            }
        }
        echo json_encode(['success' => true, 'data' => $scenarios]);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Unknown data type']);
        break;

        case 'resources':
    $stmt = $pdo->query("SELECT * FROM resources ORDER BY id DESC");
    echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
    break;
}
?>