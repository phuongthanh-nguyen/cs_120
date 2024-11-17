<!DOCTYPE html>
<html lang="en">
<head>
    <title>Office Hours</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 50px;
        }
        .office-hours {
            font-size: 18px;
            line-height: 175%;
        }
        .office-hours p {
            display: flex;
            justify-content: left;
            align-items: center;
        }
        .day {
            flex: 1;
        }
        .hours {
            margin-left: 10px;
        }
    </style>
</head>
<body>

    <h1>Office Hours</h1>

    <div class="office-hours">

        <?php
        function displayOfficeHours($office_hours) {
            $output = ""; //initialize value

            // Loop through the associative array
            foreach ($office_hours as $day => $hours) {
               $output .= "<p><span class='day'>" . $day . "</span><span class='hours'>" . $hours . "</span></p>";
            }

            return $output; //output as string
        }

        //associative array
        $office_hours = array(
            "Monday"    => "9:00AM - 5:00PM",
            "Tuesday"   => "9:00AM - 5:00PM",
            "Wednesday" => "9:00AM - 5:00PM",
            "Thursday"  => "9:00AM - 5:00PM",
            "Friday"    => "9:00AM - 5:00PM",
            "Saturday"  => "9:00AM - 12:00PM",
            "Sunday"    => "Closed"
        );

        //call function
        echo displayOfficeHours($office_hours);
        ?>

    </div>
</body>
</html>
