<?php

require_once("action/CommonAction.php");

$pageid = "deckpage";
$title  = "Deck Edition";
require_once("partial/header.php");
?>
    <h1>YOUR DECK!</h1>

<?php

?>
    <script src="js/global.js"></script>
    <div id="deck">
        <iframe style="width:1910px;height:1300px;frameBorder:0;" frameBorder=0
                src="https://magix.apps-de-cours.com/server/#/deck/<?= $_SESSION["key"] ?>">
        </iframe>
    </div>

    <div class="deckmenubuttons">
        <button onClick="demarrer('jouer');">Play</button>
        <button onClick="demarrer('pratique');">Pratice</button>
        <button onClick="window.location.href='stats.php';">Stats</button>
        <button onClick="window.location.href='lobby.php';">Lobby</button>
        <button onClick="window.location.href='index.php';">Quit</button>
    </div>


<?php
require_once("partial/footer.php");

