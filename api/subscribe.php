<?php
require_once __DIR__ . '/config.php';

$data = getJsonInput();
$email = isset($data['email']) ? trim($data['email']) : '';

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(400, [
        "status" => "error",
        "message" => "Please provide a valid email address."
    ]);
}

sendJsonResponse(200, [
    "status" => "success",
    "message" => "Thank you for subscribing to ClassIQ newsletter!",
    "email" => $email
]);
