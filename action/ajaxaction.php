<?php
require_once("CommonAction.php");
require_once("DAO/historiquePartiesDAO.php");


class AjaxAction extends CommonAction {


    public function __construct() {
        parent::__construct(CommonAction::$VISIBILITY_MEMBER);
    }

    protected function executeAction() {

        $result['success'] = 'complete';
        switch ($_POST['type']) {
            case 'pratique':
                $result['values'] = $this->callAPI('games/auto-match', ['key' => $_SESSION['key'], 'type' => 'TRAINING']);
                break;
            case 'jouer':
                $result['values'] = $this->callAPI('games/auto-match', ['key' => $_SESSION['key'], 'type' => 'PVP']);
                break;
            case 'status':
                $result['values'] = $this->callAPI('games/state', ['key' => $_SESSION['key']]);


                if (isset($result['values']->opponent->username)) {

                    $_SESSION['remoteuser'] = $result['values']->opponent->username;
                    $result['remoteuser']   = $_SESSION['remoteuser'];
                    $result['localuser']    = $_SESSION["username"];

                } else {
                    if ($result['values'] == 'LAST_GAME_LOST' && isset($_SESSION['remoteuser'])) {
                        historiquePartiesDAO::finDePartie($_SESSION["username"], $_SESSION['remoteuser'], $_SESSION['remoteuser']);
                        unset($_SESSION['remoteuser']);
                    } else {
                        if ($result['values'] == 'LAST_GAME_WON' && isset($_SESSION['remoteuser'])) {
                            historiquePartiesDAO::finDePartie($_SESSION["username"], $_SESSION['remoteuser'], $_SESSION['username']);
                            unset($_SESSION['remoteuser']);
                        }
                    }
                }

                //}


                break;
            case 'play':
                $result['values'] = $this->callAPI('games/action', ['key' => $_SESSION['key'], 'type' => "PLAY", 'uid' => $_POST['uid']]);
                break;
            case 'attack':
                $result['values'] = $this->callAPI('games/action', ['key' => $_SESSION['key'], 'type' => "ATTACK", 'uid' => $_POST['uid'], 'targetuid' => $_POST['targetuid']]);
                break;
            case 'heropower':
                $result['values'] = $this->callAPI('games/action', ['key' => $_SESSION['key'], 'type' => "HERO_POWER"]);
                break;
            case 'surrender':
                $result['values'] = $this->callAPI('games/action', ['key' => $_SESSION['key'], 'type' => "SURRENDER"]);
                break;
            case 'endturn':
                $result['values'] = $this->callAPI('games/action', ['key' => $_SESSION['key'], 'type' => "END_TURN"]);
                break;

            case 'stringlookup':
                $result['values'] = [
                    "NOT_ENOUGH_ENERGY"           => "Not enough energy to play this card",
                    "WRONG_TURN"                  => "It is currently not your turn",
                    "MUST_ATTACK_TAUNT_FIRST"     => "Taunt cards must be attacked first",
                    "CARD_NOT_IN_HAND"            => "The card is no longer in your hand",
                    "NOT_IN_GAME"                 => "You are not currently in a game",
                    "INVALID_KEY"                 => "You are currently logged out. Please log in again",
                    "INVALID_ACTION"              => "Invalid action, please contact us to get this fixed",
                    "ACTION_IS_NOT_AN_OBJECT"     => "Invalid action format, please contact us to get this fixed",
                    "BOARD_IS_FULL"               => "The board is full and cannot allow other cards",
                    "CARD_IS_SLEEPING"            => "The card cannot attack or be played right now",
                    "OPPONENT_CARD_NOT_FOUND"     => "The target card was not found",
                    "OPPONENT_CARD_HAS_STEALTH"   => "The target card has stealth and cannot be attacked",
                    "ERROR_PROCESSING_ACTION"     => "The server is experiencing problems. Please try again later",
                    "INTERNAL_ACTION_ERROR"       => "The server failed to process your action. Please try again later",
                    "HERO_POWER_ALREADY_USED"     => "The hero power can only be used once per turn",
                    "INVALID_GAME_TYPE"           => "Invalid game type",
                    "DECK_INCOMPLETE"             => "Your deck is not complete. Please complete it before playing",
                    "MAX_DEATH_THRESHOLD_REACHED" => "Your user was eliminated from the tournament",
                    "JOINED_PVP"                  => "You have joined a match",
                    "CREATED_PVP"                 => "You have created a match",
                    "JOINED_TRAINING"             => "You have joined training"


                ];
                break;


            case 'cardnames':
                $result['values'] = [
                    1  => 'Brawler',
                    2  => 'Flea Man',
                    3  => 'Gaibon',
                    4  => 'Malebranche',
                    5  => 'Armored Beast',
                    6  => 'Hell doll',
                    7  => 'Crusty',
                    8  => 'Deadfast',
                    9  => 'Abel',
                    10 => 'Desert Isaac',
                    11 => 'Villager',
                    12 => 'Isaac on horse',
                    13 => 'Grieving Dracula',
                    14 => 'Speakers',
                    15 => 'Untrained Taka',
                    16 => 'Gerogoth',
                    17 => 'Raman',
                    18 => 'Archbishop',
                    19 => 'Bald Priest',
                    20 => 'Stitchy Witch',
                    21 => 'Blue fangs',
                    22 => 'Zamfir',
                    23 => 'Isaac',
                    24 => 'The Alchemist',
                    25 => 'The Judge',
                    26 => 'Greta',
                    27 => 'Expert Sypha',
                    28 => 'Sala',
                    29 => 'Carmilla',
                    30 => 'Striga',
                    31 => 'Lenore',
                    32 => 'Dracula',
                    33 => 'The Mad king',
                    34 => 'Rebis',
                    35 => 'Saint Germain',
                    36 => 'Exhausted Trevor',
                    37 => 'Lonely Alucard',
                    38 => 'Burly',
                    39 => 'Alucard',
                    40 => 'Feeding vampire',
                    41 => 'Dragoslav',
                    42 => 'Flyseyes',
                    43 => 'The Elder',
                    44 => 'Screaming Malphas',
                    45 => 'Mad Diver',
                    46 => 'Sharma',
                    47 => 'Old witch',
                    48 => 'Greengrocer',
                    49 => 'Chō',
                    50 => 'Cyclops',
                    51 => 'Sypha',
                    52 => 'Lesser Demon',
                    53 => 'The Captain',
                    54 => 'Hector',
                    55 => 'Slave Hector',
                    56 => 'Armorer',
                    57 => 'Godbrand',
                    58 => 'Ratko',
                    59 => 'Gargoyle',
                    60 => 'Untrained Sumi',
                    61 => 'Unmarried Lisa',
                    62 => 'Trevor Belmont',
                    63 => 'Wounded Malphas',
                    64 => 'Death',
                    65 => 'Collector',
                    66 => 'Gresha Priest',
                    67 => 'Militia',
                    68 => 'Dragan',
                    69 => 'Lisa Tepes',
                    70 => 'Sumi',
                    71 => 'Siver dagger',
                    72 => 'Taka',
                    73 => 'Wounded Sypha',
                    74 => 'Adventurer Lady',
                    75 => 'Beer',
                    76 => 'Zufall',
                    77 => 'Holy water',
                    78 => 'Young Woman',
                    79 => 'Visitor',
                    80 => 'Jailed Hector',
                    81 => 'Dracula\'s castle',
                    82 => 'Cezar',
                    83 => 'Alucard\s sword',
                    84 => 'Malachi',
                    85 => 'Infinite corridor key',
                    86 => 'Varney',
                    87 => 'Drunk Trevor',
                    88 => 'Buer',
                    89 => 'Mayor',
                    90 => 'Giant Bat',
                    91 => 'Mrs. Djuvara',
                    92 => 'Morana',
                    93 => 'The Bishop',
                    94 => 'Morning Star',
                    95 => 'Arn',
                    96 => 'Piter'
                ];

        }


        //
        return compact("result");
    }
}