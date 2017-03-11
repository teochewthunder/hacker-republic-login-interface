<?php
session_start();
?>

<!DOCTYPE html>
<html>
	<head>
		<title>Who goes there?</title>

		<style>
			#guard_wrapper
			{
				width:250px;
				height:400px;
				margin:10% auto 0 auto;
				background-image:url(img/laracroft.jpg);
				background-position:center center;
				background-repeat:no-repeat;
				background-size:cover;
				overflow:hidden;
			}

			#guard_door
			{
				width:100%;
				height:100%;
				transition:all 5s;
				-webkit-transition:all 5s;
				margin-left:0;
				overflow:hidden;
			}

			#guard_door:before
			{
				display:block;
				content:'';
				margin:20px auto 0 auto;
				outline:800px solid #000000;
				width:50%;
				height:30%;
			}

			#speech_wrapper
			{
				width:250px;
				height:200px;
				margin:5px auto 0 auto;
			}

			#speech 
			{ 
				width:240px; 
				height:80px; 
				background:#000000; 
				position:relative; 
				border-radius:10px; 
				text-align:center;
				color:#FFFFFF;
				padding:5px;
			} 

			#speech:before 
			{ 
				content:""; 
				position:absolute; 
				right:50%; 
				top:-50px; 
				width:0; 
				height:0; 
				border-bottom:25px solid #000000; 
				border-right:20px solid transparent; 
				border-top:25px solid transparent; 
			}
		</style>

		<script type="text/javascript" src="js/tt_millenniumlogin.js"></script>
	</head>
	<body>
		<div id="guard_wrapper">
			<div id="guard_door">

			</div>
		</div>
		<br />
		<div id="speech_wrapper">
			<div id="speech">
				<div id="confirmid">
					<br />
					WHO GOES THERE?
					<br />
					<input type="text" id="txtConfirmId" maxlength="20">
					&nbsp;
					<input type="button" value="go" onclick="login('confirm_form_login');">
				</div>
				<div id="confirmpassword">
					<br />
					PROVE IT, OR ELSE....
					<br />
					<input type="password" id="txtConfirmPassword" maxlength="20">
					&nbsp;
					<input type="button" value="go" onclick="login('confirm_form_password');">
				</div>
			</div>
		</div>
		<?php
		if ($_SESSION["loggedin"])
		{
		?>
			<script>
				setTimeout(function() {
				document.getElementById("guard_door").style.marginLeft="-100%";
				},1000);

				confirm_screen(true,false);
			</script>
		<?php
		}
		?>
	</body>
</html>