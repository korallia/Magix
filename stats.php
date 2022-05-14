<?php



require_once("action/statsAction.php");
$action = new StatsAction();
$data =$action->execute();

$totale = count($data['parties']);
$gagnee = 0;
foreach($data['parties'] as $partie){
  if ( $partie['winner']==$partie['localplayer']){
	$gagnee++;
  }
 
}

$pageid = "stats";
$title= "Magix Stats";
require_once("partial/header.php");
?>

<script src="js/global.js"></script>
<script src="js/stats.js"></script>


<h1 class = "titreAcueil">MAGIX StatistiX</h1>
<h2>Your <u>portal</u> to the past...</h2>
<h3>Which shows that you won <?=$gagnee?> of your <?=$totale?> games or <?= ceil($gagnee/$totale*100)?>% of them</h3>
<div id="statsection">	
<table class="stattable">
<tr><th>Date</th><th>Local User</th><th>Opponent</th><th>Winner</th></tr>
<?php foreach($data['parties'] as $partie):?>
<tr><td><?= date('Y-m-d H\hi', strtotime($partie['gamedate']))?></td>
<td><?= $partie['localplayer']?></td>
<td><?= $partie['remoteplayer']?></td>
<td><?= ($partie['winner']==$partie['localplayer'] ?"You!":  $partie['winner'])?></td>
</tr>
	<?php endforeach ?>
</table>

</div>

<div class="menubuttons">
<button onClick="window.location.href='lobby.php';">Lobby</button>
<button onClick="demarrer('jouer');">Play</button>
    <button onClick="demarrer('pratique');">Practice</button>
    <button onClick="window.location.href='deck.php';">Deck</button>
    <button onClick="window.location.href='index.php';">Quit</button>
</div>


		<?php
			require_once("partial/footer.php")
		?>