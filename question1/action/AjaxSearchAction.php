<?php
	require_once("action/CommonAction.php");
	require_once("action/dao/UserDAO.php");

	class AjaxSearchAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$names = $_POST;
			if(isset($_POST["name"])){
                   
			$namePrefix=UserDAO::search($_POST["name"]);
			
			}
			return compact("namePrefix");
		
		}

	}
