<?php
    require_once("action/arenaaction.php");
    $action = new ArenaAction();
    $data =$action->execute();

    $pageid = "arena";
    require_once("partial/header.php");
?>
<h1>Page Privé!</h1>

<?php
    
?>
<script src="js/global.js"></script>
<script src="js/arena.js" defer></script>
<div id="game">

<div id="hand"></div>
</div>



    
<a href="lobby.php">Lobby</a>

<?php
    require_once("partial/footer.php");

