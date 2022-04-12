<?php
function execute(){
    $dialogs = [
        ["img" => "images/353a12e095814f1bc413fe837f9322f0.png", "text" => "Pourquoi toujours vouloir faire la guerre? Je suis une femme de science! Arretez de vous battre, les maladies et la famine nous décime déjà trop."],

        ["img" => "images/bishop.png", "text" => "Vous paierez tous pour vos péchers. L'alcohol et la luxure ne sont pas des voies honorables"],

        ["img" => "images/Cast.webp", "text" => "Allez, dis moi que tu m'aime. Nous avons assez tué de monstres ensemble pour ce l'admettre, non?"],


    ];


    return compact("dialogs");
}