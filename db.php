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
    // Check which form was submitted
    if (isset($_POST['from'], $_POST['to'], $_POST['date'], $_POST['passengers'], $_POST['email'], $_POST['phone'])) {
        // Handle booking form data
        $from = $_POST['from'];
        $to = $_POST['to'];
        $date = $_POST['date'];
        $passengers = $_POST['passengers'];
        $email = $_POST['email'];
        $phone = $_POST['countryCode'] . $_POST['phone'];

        // Prepare and execute SQL statement to insert data into the database
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

    } else if (isset($_POST['food'], $_POST['allergy'], $_POST['gender'], $_POST['age'], $_POST['education'], $_POST['employment'])) {
        // Handle dropdown form data
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
        $stmt->bindParam(':gender', $gender);
        $stmt->bindParam(':age', $age, PDO::PARAM_INT);
        $stmt->bindParam(':education', $education);
        $stmt->bindParam(':employment', $employment);

        try {
            $stmt->execute();
            echo "Booking successful!";
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }

    } else if (isset($_POST['past'], $_POST['needs'], $_POST['sweets'], $_POST['sleep'], $_POST['space'], $_POST['anything'])) {
        // Handle text field form data
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
}
?>
