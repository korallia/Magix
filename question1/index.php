<?php
	require_once("action/IndexAction.php");

	$action = new IndexAction();
	$data = $action->execute();

	require_once("partials/header.php");
?>

<div id="container">
	<div class="logo"></div>

	<div>
		Faites une recherche, avec du style : <input type="text" style="width:200px" name="mot" id="mot" />
	</div>

	<br/>

	<p>
		Résultats
	</p>
	<hr/>

	<div id="resultat"></div>
</div>

<?php
	require_once("partials/footer.php");
