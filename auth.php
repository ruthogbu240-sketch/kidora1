<?php
ob_start();
session_start();
header('Content-Type: application/json');
require_once 'db.php';
require_once 'services.php';

$action = $_GET['action'] ?? '';

switch ($action) {
   case 'register':
    $data = json_decode(file_get_contents('php://input'), true);
    $full_name = trim($data['fullName'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';
    $role = $data['role'] ?? 'parent';
    
    // Validation
    if (empty($full_name) || empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
        exit;
    }
    if (strlen($password) < 6) {
        echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters.']);
        exit;
    }

    // Check if email exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Email already registered.']);
        exit;
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)");
    if ($stmt->execute([$full_name, $email, $password_hash, $role])) {
        $user_id = $pdo->lastInsertId();
        $_SESSION['user_id'] = $user_id;
        $_SESSION['role'] = $role;
        $_SESSION['full_name'] = $full_name;

        logActivity($user_id, 'Registration', 'User registered with role: ' . $role);
        sendNotification($user_id, 'Welcome to Kidora! ✨', 'Thank you for joining our community.');

        echo json_encode(['success' => true, 'message' => 'Registration successful!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to register user.']);
    }
    break;


    case 'admin_login':
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    $stmt = $pdo->prepare("SELECT id, full_name, password_hash, role FROM users WHERE email = ? AND role = 'admin'");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['full_name'] = $user['full_name'];
        
        logActivity($user['id'], 'Admin Login', 'Admin logged into the platform');
        echo json_encode([
            'success' => true, 
            'message' => 'Admin login successful',
            'user' => [
                'id' => $user['id'],
                'full_name' => $user['full_name'],
                'role' => $user['role']
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid admin credentials.']);
    }
    break;
   
       case 'login':
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    $stmt = $pdo->prepare("SELECT id, full_name, password_hash, role FROM users WHERE email = ? AND role != 'admin'");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
   
        if ($user && password_verify($password, $user['password_hash'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['full_name'] = $user['full_name'];
            
            logActivity($user['id'], 'Login', 'User logged into the platform');
            echo json_encode([
                'success' => true, 
                'message' => 'Login successful',
                'user' => [
                    'id' => $user['id'],
                    'full_name' => $user['full_name'],
                    'role' => $user['role']
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
        }
        break;

    case 'logout':
        session_destroy();
        echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
        break;

    case 'me':
        if (isset($_SESSION['user_id'])) {
            echo json_encode([
                'success' => true,
                'user' => [
                    'id' => $_SESSION['user_id'],
                    'full_name' => $_SESSION['full_name'],
                    'role' => $_SESSION['role']
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Not authenticated']);
        }
        break;

        case 'testimonials':
    $stmt = $pdo->query("SELECT * FROM testimonials ORDER BY id DESC");
    echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
    break;

    
    // ==================== PASSWORD RESET ====================
    case 'request_reset':
        $data = json_decode(file_get_contents('php://input'), true);
        $email = trim($data['email'] ?? '');
        
        if (empty($email)) {
            echo json_encode(['success' => false, 'message' => 'Email is required.']);
            exit;
        }
        
        // Check if user exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if (!$user) {
            // For security, still return success (don't reveal if email exists)
            echo json_encode(['success' => true, 'message' => 'If the email exists, a reset link has been sent.']);
            exit;
        }
        
        // Generate token
        $token = bin2hex(random_bytes(32));
        $expires_at = date('Y-m-d H:i:s', strtotime('+1 hour'));
        
        // Delete any existing tokens for this email
        $stmt = $pdo->prepare("DELETE FROM password_resets WHERE email = ?");
        $stmt->execute([$email]);
        
        // Insert new token
        $stmt = $pdo->prepare("INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)");
        $stmt->execute([$email, $token, $expires_at]);
        
        // Build reset link
        $reset_link = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']) . "/reset-password.html?token=" . $token . "&email=" . urlencode($email);
        
        // For demo environment, we'll return the link in the response (so you can see it)
        // In production, you would send an email.
        // To simulate email, we'll also log it to error_log.
        error_log("Password reset link for $email: $reset_link");
        
        // Optional: send real email using PHPMailer (commented out)
        /*
        $subject = "Reset Your Kidora1 Password";
        $message = "Click this link to reset your password: $reset_link";
        mail($email, $subject, $message, "From: no-reply@kidora1.com");
        */
        
        echo json_encode([
            'success' => true, 
            'message' => 'A password reset link has been sent to your email.',
            // For demo only – remove in production:
            'demo_link' => $reset_link
        ]);
        break;
        
    case 'reset_password':
        $data = json_decode(file_get_contents('php://input'), true);
        $email = trim($data['email'] ?? '');
        $token = trim($data['token'] ?? '');
        $new_password = $data['new_password'] ?? '';
        
        if (empty($email) || empty($token) || empty($new_password)) {
            echo json_encode(['success' => false, 'message' => 'All fields are required.']);
            exit;
        }
        if (strlen($new_password) < 6) {
            echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters.']);
            exit;
        }
        
        // Verify token
        $stmt = $pdo->prepare("SELECT * FROM password_resets WHERE email = ? AND token = ? AND expires_at > NOW()");
        $stmt->execute([$email, $token]);
        $reset = $stmt->fetch();
        
        if (!$reset) {
            echo json_encode(['success' => false, 'message' => 'Invalid or expired reset link. Please request a new one.']);
            exit;
        }
        
        // Update password
        $password_hash = password_hash($new_password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("UPDATE users SET password_hash = ? WHERE email = ?");
        $stmt->execute([$password_hash, $email]);
        
        // Delete used token
        $stmt = $pdo->prepare("DELETE FROM password_resets WHERE email = ? AND token = ?");
        $stmt->execute([$email, $token]);
        
        // Log activity
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        if ($user) {
            logActivity($user['id'], 'Password Reset', 'User reset their password');
        }
        
        echo json_encode(['success' => true, 'message' => 'Password has been reset. You can now log in.']);
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
        break;
}
?>