<?php
    require_once("Connection.php");
    class historiquePartiesDAO {

        public static function finDePartie($localUser, $remoteUser, $gagnant) {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("INSERT INTO historique_parties (gamedate, localplayer, remoteplayer, winner) VALUES(NOW(),?,?,?)");
            $statement->execute([$localUser, $remoteUser, $gagnant]);
            
            return $connection->lastInsertId();

    
        }
        

    }