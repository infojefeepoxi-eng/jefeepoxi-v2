<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit;
}

// Validate required fields
$required = ['name', 'email', 'phone'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Field $field is required"]);
        exit;
    }
}

// Prepare email content
$name = htmlspecialchars($input['name']);
$email = htmlspecialchars($input['email']);
$phone = htmlspecialchars($input['phone']);
$address = htmlspecialchars($input['address'] ?? 'No especificada');
$surface = htmlspecialchars($input['surface'] ?? 'No especificada');
$finishType = htmlspecialchars($input['finishType'] ?? 'No especificado');
$message = htmlspecialchars($input['message'] ?? 'Sin descripción adicional');

$date = date('d/m/Y');
$time = date('H:i:s');

$emailBody = "
🏗️ NUEVA SOLICITUD DE PRESUPUESTO EPOXI M²
==========================================

👤 DATOS DEL CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nombre completo: $name
• Email: $email
• Teléfono: $phone
• Dirección del proyecto: $address

🏭 DETALLES DEL PROYECTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Superficie estimada: $surface m²
• Tipo de acabado deseado: $finishType
• Descripción del proyecto:
$message

📅 INFORMACIÓN DE LA SOLICITUD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Fecha: $date
• Hora: $time
• Origen: Formulario web www.jefeepoxi.com

💼 PRÓXIMOS PASOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Contactar al cliente en 24 horas
2. Evaluar el proyecto y tipo de sistema Epoxi M²
3. Preparar presupuesto personalizado
4. Programar visita técnica si es necesario

---
🌐 Generado automáticamente por JefeEpoxi.com
📧 Sistema de gestión de leads v2.1
";

$subject = "🏗️ Nueva solicitud de presupuesto - $name";

// Email headers
$headers = array(
    'From' => "noreply@jefeepoxi.com",
    'Reply-To' => $email,
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer' => 'JefeEpoxi Contact Form v2.1'
);

$headerString = '';
foreach ($headers as $key => $value) {
    $headerString .= "$key: $value\r\n";
}

// Send emails
$success1 = mail('infojefeepoxi@gmail.com', $subject, $emailBody, $headerString);
$success2 = mail('jefeepoxi@gmail.com', $subject, $emailBody, $headerString);

if ($success1 || $success2) {
    echo json_encode([
        'success' => true, 
        'message' => 'Emails sent successfully',
        'sent_to' => [
            'infojefeepoxi@gmail.com' => $success1,
            'jefeepoxi@gmail.com' => $success2
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send emails']);
}
?>

