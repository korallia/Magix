<?php
    require_once("action/priveaction.php");
    $date = execute();
    require_once("partial/header.php");
?>
<h1>Page Privé!</h1>

<?php
    foreach($date["spyList"]as $spy){
        ?>
        <div>
            -<?=$spy ?>
        </div>
        <?php
    }
?>





<?php
    require_once("partial/footer.php");

