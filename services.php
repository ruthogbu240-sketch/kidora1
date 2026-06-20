<?php
// api/services.php
require_once 'db.php';

/**
 * Log a user action to the activity_logs table
 */
function logActivity($userId, $action, $details = null) {
    global $pdo;
    try {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        $stmt = $pdo->prepare("INSERT INTO activity_logs (user_id, action, details, ip_address) VALUES (?, ?, ?, ?)");
        $stmt->execute([$userId, $action, $details, $ip]);
    } catch (Exception $e) {
        // Silently fail logging to avoid breaking main functionality
    }
}

/**
 * Send a notification to a specific user
 */
function sendNotification($userId, $title, $message, $type = 'system') {
    global $pdo;
    try {
        $stmt = $pdo->prepare("INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)");
        $stmt->execute([$userId, $title, $message, $type]);
    } catch (Exception $e) {
        // Silently fail
    }
}

/**
 * Send a notification to all admins
 */
function notifyAdmins($title, $message, $type = 'system') {
    global $pdo;
    try {
        $stmt = $pdo->query("SELECT id FROM users WHERE role = 'admin'");
        $admins = $stmt->fetchAll();
        foreach ($admins as $admin) {
            sendNotification($admin['id'], $title, $message, $type);
        }
    } catch (Exception $e) {
        // Silently fail
    }
}
?>
