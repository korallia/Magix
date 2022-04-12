<?php
function execute(){
    $version = "1.0.0";
    $username = "John";
    $hasConnectionError = false;
    // compart permet de céer un dictionnaire a partie de variables simples

    if(!empty($_POST)){
            header("location:lobby.php");
            exit;
    }
    return compact("version", "username","hasConnectionError");
}
