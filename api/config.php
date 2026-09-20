<?php
/**
 * ClassIQ REST API Configuration & Utilities
 * Header CORS configuration, JSON request parser, response helpers
 */

// Enable CORS and JSON Response headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/**
 * Send a standardized JSON response
 * @param int $code HTTP response code
 * @param array $payload Response data
 */
function sendJsonResponse($code, $payload) {
    http_response_code($code);
    echo json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    exit();
}

/**
 * Parse incoming JSON request body
 * @return array
 */
function getJsonInput() {
    $rawInput = file_get_contents('php://input');
    $decoded = json_decode($rawInput, true);
    return is_array($decoded) ? $decoded : $_POST;
}
