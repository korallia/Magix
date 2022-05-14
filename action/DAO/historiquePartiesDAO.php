<?php
    require_once("Connection.php");
    class historiquePartiesDAO {

        public static function finDePartie($localUser, $remoteUser, $gagnant) {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("INSERT INTO historique_parties (localplayer, remoteplayer, winner) VALUES(?,?,?)");
            $statement->execute([$localUser, $remoteUser, $gagnant]);
            
            return $connection->lastInsertId();

    
        }
        

    }