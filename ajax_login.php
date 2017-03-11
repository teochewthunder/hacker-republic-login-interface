<?php
session_start();

$type=intval($_POST["type"]);

if ($type==0)
{
	$logins=array();
	$logins["Remarkable"]="A(89)Cx#magnolia";
	$logins["x1"]="x1";
	$logins["x2"]="x2";

	$id=$_POST["id"];
	$password=$_POST["password"];

	if (array_key_exists($id,$logins))
	{
		if ($logins[$id]==$password)
		{
			$_SESSION["loggedin"]=true;
			echo json_encode(array("valid" => true));
		}
		else
		{
			echo json_encode(array("valid" => false));
		}
	}
	else
	{
		echo json_encode(array("valid" => false));
	}
}

if ($type==1)
{
	$logins=array();
	$logins["Wasp"]="MonkeyBusiness";
	$logins["x3"]="x3";
	$logins["x4"]="x4";

	$id=$_POST["id"];

	if (array_key_exists($id,$logins))
	{
		$_SESSION["login"]=$id;
		echo json_encode(array("valid" => true));
	}
	else
	{
		echo json_encode(array("valid" => false));
	}
}

if ($type==2)
{
	$logins=array();
	$logins["Wasp"]="MonkeyBusiness";
	$logins["x3"]="x3";
	$logins["x4"]="x4";

	$password=$_POST["password"];

	if ($logins[$_SESSION["login"]]==$password)
	{
		$_SESSION["confirmed"]=true;
		echo json_encode(array("valid" => true));
	}
	else
	{
		$_SESSION["attempts"]=$_SESSION["attempts"]+1;
		echo json_encode(array("valid" => false, "attempts" => $_SESSION["attempts"]));
	}
}

?>