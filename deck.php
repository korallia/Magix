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
<input type="text" id="result" value="pending...">
<input type="hidden" id="type" value="<?=!empty($_GET['type'])?$_GET['type']:'pratique'?>">
<script src="js/global.js"></script>
<script src="js/arena.js" defer></script>
<div id="deck">
<iframe style="width:100%;height:100%;" src="https://magix.apps-de-cours.com/server/#/deck/<?= $_SESSION["key"] ?>">
</iframe>
</div>



    <button onClick="demarrer();">Demarrer</button>
    


<?php
    require_once("partial/footer.php");

