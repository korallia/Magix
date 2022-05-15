<?php
require_once("action/CommonAction.php");

require_once("action/DAO/historiquePartiesDAO.php");


class StatsAction extends CommonAction {

    public function __construct() {
        parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
    }

    function executeAction() {
        $parties = historiquePartiesDAO::historiqueusager($_SESSION['username']);
        return compact("parties");
    }


}