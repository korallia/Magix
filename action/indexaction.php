<?php
    require_once("action/CommonAction.php");

   

    class IndexAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }
        function executeAction(){

            $data = [];
           $error = FALSE;
           
            if ( isset($_POST["usager"]) and isset($_POST["pwd"]) ){
                $data["username"] = $_POST["usager"];
                $data["password"] = $_POST["pwd"];

                $result = parent::callAPI("signin", $data);

        if ($result == "INVALID_USERNAME_PASSWORD") {
                    $error = TRUE;
        }
             
        else {
	// Pour voir les informations retournées : var_dump($result);exit;
	        $key = $result->key;
            $_SESSION["key"] = $key;
            $_SESSION["username"] = $_POST["usager"];
            $_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
            header("Location: ../Magix/lobby.php");
            exit();
            }

        }

        return compact("error");
     
    }


    }