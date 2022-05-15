<?php
require_once("action/ajaxaction.php");
$action = new AjaxAction();
$data   = $action->execute();

echo json_encode($data['result']);
