<?php
    require_once("action/arenaaction.php");
    $action = new ArenaAction();
    $data =$action->execute();

    $pageid = "arena";
    $title = "Magix Arena";
    require_once("partial/header.php");
?>

<?php
    
?>
<script src="js/global.js"></script>
<script src="js/arena.js" defer></script> 
<div id="pending"><h1>Please wait... loading</h1></div>
<div id="game">
    <div class="playerArea1 playerarea">
        <div class = "leftstats">
            <div class="lifepoints"></div>
            <div class="energy"></div>
        </div>
        <div class = "enemyCards cardcontainer">
            <div id="enemyCards"  class="cards"></div>
        </div>
        <div class="details">
            <div class="class"></div>
            <div class="talent"></div>
            <div class="cardhand"></div>
        </div>
        <div class="stats">
            
            
            <div class="heropower"></div>
            <div class="cardcount"></div>
            <div class="timeleft"></div>
        </div>
    </div>
    <div id="laststatus"><div class="action"></div><div class="result"></div></div>

    <div class="playerArea2 playerarea"> 

        <div class = "leftstats">
            <div class="lifepoints"></div>
                <div class="energy"></div>
            
        </div>

        <div class = "cardcontainer">
            <div id="playerCards"  class="cards"></div>
        </div>

        <div class="details">
            <div class="class"></div>
            <div class="talent"></div>
            <div class="cardhand"></div>
            <div class="endturn lastline"><button onClick="endturn()">End Turn</button></div>
        </div>

        <div class="stats">
            <div class="heropower"></div>
            <div class="cardcount"></div>
            <div class="timeleft"></div>
        </div>
    </div>
    

    <div class = "handPlayer cardcontainer">
        <div id="hand" class="cards"></div>
    </div>
</div>
    
<!--
<div id="lobbychatbutton">
<iframe style="width:100%;height:100%;" onload="applyStyles(this)" 
            src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>/large">
   </iframe>

</div>
-->
    
<div class="menubuttons">
    <button onClick="window.location.href='lobby.php';">Lobby</button>
    <button onClick="surrender()" id="surrender">Surrender</button>
    
</div>
<?php
    require_once("partial/footer.php");

