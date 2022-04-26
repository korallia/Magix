<?php
require_once("action/indexAction.php");
$action = new IndexAction();
$data =$action->execute();


$pageid = "index";

require_once("partial/header.php");
?>
<script src="js/index.js" defer></script>



<h1 class = "titreAcueil">MAGIX</h1>
<h2>BIENVENU A VOTRE DOOM</h2>

<div id="batgif">
    <img src="images/bat-vampire-flying.gif"  /></div>
		<div class="sectionAuthentification">
			<h3>
				Connectez-vous, si vous en avez le courage
			</h3>

			<?php
			 if ($data["error"]){
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