<?php
require_once("action/indexAction.php");
$action = new IndexAction();
$data   = $action->execute();

$pageid = "index";
$title  = "Magix Login";
require_once("partial/header.php");
?>
    <script src="js/index.js" defer></script>


    <h1>MAGIX</h1>
    <h2>WELCOME TO YOUR DOOM</h2>

    <div id="batgif">
        <img src="images/bat-vampire-flying.gif"/></div>
    <div class="sectionAuthentification">
        <h3>
            Login, if you dare!
        </h3>

        <?php
        if ($data["error"]) {
            ?>
            <div style="color:red;border:1px solid red">
                Invalid login
            </div>
            <?php
        }
        ?>


        <form action="" method="post">
            <div class="formLabel"><label for="usager"> Username : </label></div>
            <div class="formInput"><input type="text" id="usager" name="usager"
                                          value="<?= isset($_POST['usager']) ? $_POST['usager'] : "" ?>"/></div>
            <div class="formSeparator"></div>

            <div class="formLabel"><label for="pwd"> Password : </label></div>
            <div class="formInput"><input type="password" name="pwd"/></div>
            <div class="formSeparator"></div>

            <div class="formInput"><input type="image" src="images/sword.png"/></div>
            <div class="formSeparator"></div>
        </form>


<?php
require_once("partial/footer.php")
?>