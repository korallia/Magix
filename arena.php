<?php
    require_once("action/arenaaction.php");
    $action = new ArenaAction();
    $data =$action->execute();

    $pageid = "arena";
    require_once("partial/header.php");
?>

<?php
    
?>
<script src="js/global.js"></script>
<script src="js/arena.js" defer></script> 

<div class="playerArea1"> </div>
<div id="game"></div>
<div class="playerArea2"> 
    <div class = "handPlayer">
    <div id="hand"></div>
    </div>
</div>




    
<a href="lobby.php">Lobby</a>

<?php
    require_once("partial/footer.php");

