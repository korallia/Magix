<?php
function execute(){
    $version = "1.0.0";
    $username = "John";
    $hasConnectionError = false;
    // compart permet de céer un dictionnaire a partie de variables simples

    if(!empty($_POST["champCourriel"])){
        if($_POST["champCourriel"] == "a@a.com"&&
        $_POST["champMotDePasse"] == "test"){
            header("location:prive.php");
            exit;
        }
        else{
            $hasConnectionError = true;
        }
    }
    return compact("version", "username","hasConnectionError");
}
