<?php

class UserDAO {

	public static function search($namePrefix) {
		$results = array();
		
		foreach (UserDAO::$userList as $user) {
			if (stripos($user, $namePrefix) === 0) {
				$results[] = $user;
			}
		}
		
		return $results;
	}
	
	private static $userList = array("Smith, John",
									 "Todd, Sweeney",
									 "Vackman, Peter",
									 "Cain, Decard",
									 "Raynor, Jim",
									 "Brown, Emmett",
									 "Nelson, Melodie",
									 "Luther, Lex", 
									 "Liver, Pool",
									 "Lux, Liam", 
									 "Voltimer, Oceane", 
									 "Nerubis, Liz",
									 "Tobby, Ace", 
									 "Dwane, Max");
}
