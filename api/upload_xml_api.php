<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];

        // Check file type
        if ($file['type'] !== 'text/xml') {
            http_response_code(400);
            echo json_encode(["error" => "Invalid file type. Only XML files are allowed."]);
            exit();
        }

        // Read and parse XML file
        $xmlContent = file_get_contents($file['tmp_name']);
        $xml = simplexml_load_string($xmlContent);

        if ($xml === false) {
            http_response_code(400);
            echo json_encode(["error" => "Invalid XML format."]);
            exit();
        }

        // Extract data
        $name = (string) $xml->name;
        $email = (string) $xml->email;
        $phone = (string) $xml->phone;

        // Validate extracted data
        if (empty($name) || empty($email) || empty($phone)) {
            http_response_code(400);
            echo json_encode(["error" => "Missing required fields in XML file."]);
            exit();
        }

        // Response success with extracted data
        echo json_encode([
            "success" => true,
            "name" => $name,
            "email" => $email,
            "phone" => $phone
        ]);
        exit();
    } else {
        http_response_code(400);
        echo json_encode(["error" => "No file uploaded."]);
        exit();
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Use POST."]);
    exit();
}
