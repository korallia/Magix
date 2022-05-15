<?php
require_once("Connection.php");

class historiquePartiesDAO {

    public static function finDePartie($localUser, $remoteUser, $gagnant) {
        $connection = Connection::getConnection();

        $statement = $connection->prepare("INSERT INTO historique_parties (gamedate, localplayer, remoteplayer, winner) VALUES(NOW(),?,?,?)");
        $statement->execute([$localUser, $remoteUser, $gagnant]);

        return $connection->lastInsertId();


    }

    public static function historiqueusager($user) {
        $connection = Connection::getConnection();

        $statement = $connection->prepare("SELECT * FROM historique_parties WHERE localplayer=? ORDER BY gamedate DESC");
        $statement->execute([$user]);

        return $statement->fetchAll();


    }


}