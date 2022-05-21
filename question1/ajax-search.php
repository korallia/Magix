<?php
    require_once("action/AjaxSearchAction.php");

    $action = new AjaxSearchAction();
    $data = $action->execute();

    echo json_encode($data["namePrefix"]);
