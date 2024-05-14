<?php
// Database credentials
  $host = '';
  $dbname = '';
  $username = '';
  $password = '';

  // Establish database connection
  try {
      $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
      // Set the PDO error mode to exception
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  } catch (PDOException $e) {
      die("Database connection failed: " . $e->getMessage());
  }

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $past = $_POST['past'];
  $needs = $_POST['needs'];
  $sweets = $_POST['sweets'];
  $sleep = $_POST['sleep'];
  $space = $_POST['space'];
  $anything = $_POST['anything'];

  // Prepare and execute SQL statement to insert data into the database
  $stmt = $pdo->prepare("INSERT INTO textField (past, needs, sweets, sleep, space, anything) 
                          VALUES (:past, :needs, :sweets, :sleep, :space, :anything)");

  $stmt->bindParam(':past', $past);
  $stmt->bindParam(':needs', $needs);
  $stmt->bindParam(':sweets', $sweets);
  $stmt->bindParam(':sleep', $sleep);
  $stmt->bindParam(':space', $space);
  $stmt->bindParam(':anything', $anything);

  try {
      $stmt->execute();
      echo "Booking successful!";
  } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
  }
}
?>