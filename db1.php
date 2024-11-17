<?php
//setting values for connection to serve
$server = "localhost";
$userid = "ugwgbwnkgwe47";
$pw = "Minimalblue2.";
$db = "dbzyrgzj0leluu";

//connect to serve
$conn = new mysqli($server, $userid, $pw);

//did it work?
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

//select db
if (!$conn->select_db($db)) {
    die("Database selection failed: " . $conn->error);
}


//query to get genres directly from db
$sql = "SELECT id, name FROM genres";
$result = $conn->query($sql);
//checks for query error
if (!$result) {
    die("Query failed: " . $conn->error);
}

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
    <meta charset="UTF-8">
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

<?php
$conn->close();
?>