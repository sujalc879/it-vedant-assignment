<?php
require_once __DIR__ . '/config.php';

$data = getJsonInput();

$action = isset($data['action']) ? trim($data['action']) : 'login';
$email = isset($data['email']) ? trim($data['email']) : '';
$password = isset($data['password']) ? trim($data['password']) : '';

if (empty($email) || empty($password)) {
    sendJsonResponse(400, [
        "status" => "error",
        "message" => "Email and Password are required fields."
    ]);
}

if ($action === 'signup') {
    $fullname = isset($data['fullname']) ? trim($data['fullname']) : 'Student';
    sendJsonResponse(201, [
        "status" => "success",
        "message" => "Account created successfully for " . htmlspecialchars($fullname) . "! Welcome to ClassIQ.",
        "user" => [
            "name" => $fullname,
            "email" => $email,
            "joined" => date("Y-m-d H:i:s")
        ]
    ]);
} else {
    sendJsonResponse(200, [
        "status" => "success",
        "message" => "Welcome back! Login successful.",
        "user" => [
            "email" => $email,
            "token" => bin2hex(random_bytes(16))
        ]
    ]);
}
