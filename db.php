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

    $from = $_POST['from'];
    $to = $_POST['to'];
    $date = $_POST['date'];
    $passengers = $_POST['passengers'];
    $email = $_POST['email'];
    $phone =$_POST['countryCode'].$_POST['phone'];

    $stmt = $pdo->prepare("INSERT INTO formData (travelFrom, travelTo, date, passengers, email, phone) 
                          VALUES (:from_location, :to_location, :date, :passengers, :email, :phone)");

    $stmt->bindParam(':from_location', $from);
    $stmt->bindParam(':to_location', $to);
    $stmt->bindParam(':date', $date);
    $stmt->bindParam(':passengers', $passengers, PDO::PARAM_INT);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone', $phone);

    try {
        $stmt->execute();
        echo "Booking successful!";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
      }
}
?>