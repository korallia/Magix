<?php
function execute(){
    $spyList = [];
    $spyList[]= "Ethan Hunt" ;
    // équivalent d'un push
    $spyList [] = "Austin Powers";
    $spyList[] ="James Bons";

    return compact("spyList");
}