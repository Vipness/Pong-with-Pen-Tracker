<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/variables.css">
    <link rel="stylesheet" href="./css/style.css">
    <script src="./js/index.js" defer></script>
    <title>Camera Pong</title>
</head>

<body>
    <div class="wrapper">
        <h1>Camera Pong</h1>

        <label for="rounds">Number of rounds: <span id="roundsText"></span></label>
        <input type="range" min="2" max="6" value="3" id="rounds">

        <label for="speed">Speed: <span id="speedText"></span></label>
        <input type="range" min="2" max="8" value="4" id="speed">

        <div class="buttons">
            <button class="btnStart"><a href="./subpages/pong.html">Start Game</a></button>
            <button class="btnCalibrate"><a href="./subpages/calibrator.html">Calibrate Color</a></button>
        </div>

        <?php
            session_start();
            if(!isset($_SESSION['username'])){
                echo "<p class='login'>Want to save your score? <a href='./subpages/login.php'>Login</a></p>";
            }
            else{
                $user = $_SESSION['username'];
                echo "<p class='userWelcome'>Welcome, $user! <a href='./php/logout.php' class='logout'>Logout</a></p>";
            }
        ?>
    </div>
</body>

</html>