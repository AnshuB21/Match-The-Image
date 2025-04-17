<?php 
session_start();

if (isset($_POST['login'])) {
    $username = $_POST['user'];
    $password = $_POST['pass'];
    $filePath = __DIR__ . '/accounts.txt';

    if ($file = fopen($filePath, 'r')) {
        $authenticated = false;
        
        while (($line = fgets($file)) !== false) {
            list($storedUser, $storedHash) = explode(";", trim($line));
            if ($storedUser === $username && password_verify($password, $storedHash)) {
                $authenticated = true;
                break;
            }
        }
        fclose($file);

        if ($authenticated) {
            $_SESSION['user'] = $username;
            session_regenerate_id(true); // Prevent session fixation
            header("Location: game.php");
            exit();
        } else {
            echo "Invalid Username or Password";
        }
    } else {
        echo "Error opening account file!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="Description" content="Password">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <title>Login</title>
</head>
<body>
<div class="content1">
    <a href="summary.html" class="about">About</a><br>
        <p><span class="highlight">P</span>oker Dice is a unique blend of poker and dice rolling, bringing excitement and strategy to every game! In this classic game, players roll five dice with the goal of making the best "poker hand." From pairs to straights to the elusive five of a kind, each roll is a chance to win big. With simple rules and plenty of fun combinations, Poker Dice is easy to pick up yet endlessly entertaining. Are you ready to test your luck and roll your way to victory?</p>
    </div>
    <div class="content">
        <header class="header">Sign In to Start Playing</header>
        <form action="" method="POST">
            <div class="field">
                <span class="fa fa-user"></span>
                <input type="text" name="user" required placeholder="Name">
            </div>
            <div class="field space">
                <span class="fa fa-lock"></span>
                <input type="password" class="pass-key" name="pass" required placeholder="Password">
            </div>
            <div class="field">
                <input name="login" type="submit" value="Login">
            </div>
        </form>
        <div class="signup">
            Don't have an account?
            <a href="login.php">Signup Now</a>
        </div>
    </div>
</body>
</html>
