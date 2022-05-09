<?php
    require_once("action/arenaaction.php");
    $action = new ArenaAction();
    $data =$action->execute();

    $pageid = "deck";
    $title= "Deck Edition";
    require_once("partial/header.php");
?>
<h1>VOTRE DECK!</h1>

<?php
    
?>
<script src="js/global.js"></script>
<div id="deck">
<iframe style="width:100%;height:100%;" src="https://magix.apps-de-cours.com/server/#/deck/<?= $_SESSION["key"] ?>">
</iframe>
</div>

<div class="menubuttons">
    <button onClick="demarrer('jouer');">Jouer</button>
    <button onClick="demarrer('pratique');">Pratiquer</button>
    <button onClick="window.location.href='lobby.php';">Lobby</button>
    <button onClick="window.location.href='index.php';">Quitter</button>
</div>


    


<?php
    require_once("partial/footer.php");

