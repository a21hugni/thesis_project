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

  $food = $_POST['food'];
  $allergy = $_POST['allergy'];
  $gender = $_POST['gender'];
  $age = $_POST['age'];
  $education = $_POST['education'];
  $employment = $_POST['employment'];

  // Prepare and execute SQL statement to insert data into the database
  $stmt = $pdo->prepare("INSERT INTO dropdown (food, allergy, gender, age, education, employment) 
                          VALUES (:food, :allergy, :gender, :age, :education, :employment)");

  $stmt->bindParam(':food', $food);
  $stmt->bindParam(':allergy', $allergy);
  $stmt->bindParam(':gender', $to);
  $stmt->bindParam(':age', $age, PDO::PARAM_INT);
  $stmt->bindParam(':education', $education);
  $stmt->bindParam(':employment', $employment);

  try {
      $stmt->execute();
      echo "Booking successful!";
  } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
  }
}
?>