<?php
require_once("action/lobbyaction.php");
$action = new LobbyAction();
$data =$action->execute();

$pageid = "lobby";
$title= "Lobby";
require_once("partial/header.php");

?>

<script src="js/global.js"></script>
<script src="js/lobby.js" defer></script>
<div id="dialogs"><?=  json_encode($data); ?></div>


<div id="dialog">
</div>


<div id="lobbychat">
<iframe style="width:100%;height:100%;" onload="applyStyles(this)" 
            src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>/large">
   </iframe>

</div>

<div class="menubuttons">
    <button onClick="demarrer('jouer');">Play</button>
    <button onClick="demarrer('pratique');">Practice</button>
    <button onClick="window.location.href='stats.php';">Stats</button>
    <button onClick="window.location.href='deck.php';">Deck</button>
    <button onClick="window.location.href='index.php';">Quit</button>
</div>

</body>
</html>