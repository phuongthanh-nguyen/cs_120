<?php

//check if n is a valid input, a non-neg number
if (isset($_GET['n']) && is_numeric($_GET['n']) && $_GET['n'] >= 0) {
    //'n' is the nth term
    //reads value from query string
    $n = (int)$_GET['n'];

    function fibonacci($n) {
        $sequence = []; //array to store numbers of the fibo sequence
        $a = 0;
        $b = 1;

        for ($i = 0; $i < $n; $i++) {
            $sequence[] = $a;
            $value = $a + $b;
            $a = $b; //output of this loop
            $b = $value; //to be added next loop
        }

        return $sequence;
    }

    $fibSequence = fibonacci($n);

    //contains info for printed response
    $response = [
        'length' => $n,
        'fibSequence' => $fibSequence

    ];

    //informs API to return as JSON
    header('Content-Type: application/json');
    echo json_encode($response);

} else {
    echo json_encode(["Please enter a non-negative number for n."])

}
?>