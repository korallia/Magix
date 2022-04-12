<?php
require_once("action/lobbyaction.php");
$data = execute();

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

<div id="dialog"></div>
<div id="lobbychat"></div>
</body>
</html>