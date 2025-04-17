<?php 
if (isset($_POST['submit'])) {
    $username = $_POST['name'];
    $password = password_hash($_POST['pwd'], PASSWORD_DEFAULT);
    $text = $username . ";" . $password . "\n";
    $filePath = __DIR__ . '/accounts.txt';
    
    if ($fp = fopen($filePath, 'a+')) {
        if (flock($fp, LOCK_EX)) { // Lock file to prevent concurrent writes
            if (fwrite($fp, $text)) {
                echo 'Account created successfully!';
            } else {
                echo 'Error saving account!';
            }
            flock($fp, LOCK_UN); // Unlock the file
        } else {
            echo 'Could not lock file!';
        }
        fclose($fp);
    } else {
        echo 'Error opening file!';
    }
    header("Location: Password.php");
    exit();
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
        <header class="header">Signup Form</header>
        <form action="" method="POST">
            <div class="field">
                <span class="fa fa-user"></span>
                <input type="text" name="name" required placeholder="Name">
            </div>
            <div class="field space">
                <span class="fa fa-lock"></span>
                <input type="password" class="pass-key" name="pwd" required placeholder="Password">
            </div>
            <div class="field">
                <input type="submit" name="submit" id="submit" value="Submit">
            </div>
        </form>
        <div class="signup">
            Already have an account?
            <a href="Password.php">Sign In</a>
        </div>
    </div>
</body>
</html>
