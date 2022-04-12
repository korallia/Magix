<?php
require_once("action/lobbyaction.php");
$action = new LobbyAction();
$data =$action->execute();

$pageid = "lobby";

require_once("partial/header.php");

?>
<script src="js/lobby.js" defer></script>
<div id="dialogs"><?=  json_encode($data); ?></div>

<div class="lobbybuttons">
    <button>Jouer</button>
    <button>Pratique</button>
    <button>Quitter</button>
</div>

<div id="dialog">
</div>

<div>
<iframe style="width:700px;height:240px;" 
        src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>"
</iframe>
</div>


<div id="lobbychat"></div>
</body>
</html>