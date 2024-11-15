<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dbzyrgzj0leluu";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection had failed". $connection->connect_error);
}

//query to get genres directly from db
$sql = "SELECT id, name FROM genres";
$result = $connection->query($sql);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!empty($_POST['genres'])) {
        $selectedGenres = $_POST['genres'];
        echo "You selected: <br>";
        echo implode(", ", $selectedGenres); //display selection
    } else {
        echo "No genres selected.";
    }
}

?>

<!DOCTYPE html>
<html>
<head>
    <title>db1</title>
</head>
<body>

<h2>Select at least ONE genre.</h2>

<form method="POST" action="db1.php">
    <?php 

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo '<input type="checkbox" name="genres[]" value="' . $row['id'] . '"> ' . $row['name'] . '<br>';
        }
    } else {
        echo "No genres found in the database.";
    }
    ?>
    <input type="submit" value="Submit">
</form>

</body>
</html>