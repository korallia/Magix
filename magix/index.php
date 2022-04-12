<?php
require_once("action/indexaction.php");
$data = execute();

$pageid = "index";

require_once("partial/header.php");
?>
<script src="js/index.js" defer></script>

<div id="batgif">
    <img src="images/bat-vampire-flying.gif"  /></div>
		<div class="sectionAuthentification">
			<h1>
				Connectez-vous, si vous en avez le courage
			</h1>
			<?php
			 if ($data["hasConnectionError"]){
				 ?>
				 <div style="color:red;border:1px solid red">
				 Connexion erronée!
			 </div>
			 <?php
			 }
			 ?>


			 
			<form action="" method="post">
				<div class="formLabel"><label for="usager"> Nom d'usager : </label></div>
				<div class="formInput"><input type="text" name="usager" /></div>
				<div class="formSeparator"></div>
				
				<div class="formLabel"><label for="pwd"> Mot de passe : </label> </div>
				<div class="formInput"><input type="password" name="pwd" /></div>
				<div class="formSeparator"></div>
				
				<div class="formInput"><input type="image" src="images/sword.png" /></div>
				<div class="formSeparator"></div>
			</form>

			
				
			

		<?php
			require_once("partial/footer.php")
		?>