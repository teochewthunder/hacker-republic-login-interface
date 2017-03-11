<?php
session_start();

if ($_SESSION["confirmed"])
{
?>

<!DOCTYPE html>
<html>
	<head>
		<title>Hacker Republic</title>

		<style>
			body
			{
				background-color:#0000FF;
				color:#FFFFFF;
				font-family: monospace;
			}
		</style>
	</head>
	<body>
		<h1>Welcome to the Hacker Replublic, citizen <?php echo $_SESSION["login"];?>.</h1>
	</body>
</html>

<?php
}
?>