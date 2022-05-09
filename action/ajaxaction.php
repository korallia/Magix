<?php
    require_once("action/CommonAction.php");

    class AjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {

            $result['success'] = 'complete';
            switch($_POST['type']){
                case 'pratique':
                    $result['values'] = $this->callAPI('games/auto-match', ['key'=> $_SESSION['key'], 'type' => 'TRAINING']);
                    break;
                case 'jouer':
                    $result['values'] = $this->callAPI('games/auto-match', ['key'=> $_SESSION['key'], 'type' => 'PVP']);
                    break;
                case 'status':
                    $result['values'] = $this->callAPI('games/state', ['key'=> $_SESSION['key']]);
                    break;
                case 'play':
                    $result['values'] = $this->callAPI('games/action', ['key'=> $_SESSION['key'], 'type' => "PLAY", 'uid' => $_POST['uid']]);
                    break;
                case 'attack':
                    $result['values'] = $this->callAPI('games/action', ['key'=> $_SESSION['key'], 'type' => "ATTACK", 'uid' => $_POST['uid'], 'targetuid' => $_POST['targetuid']]);
                    break;
                case 'heropower':
                    $result['values'] = $this->callAPI('games/action', ['key'=> $_SESSION['key'], 'type' => "HERO_POWER"]);
                    break;
                case 'surrender':
                    $result['values'] = $this->callAPI('games/action', ['key'=> $_SESSION['key'], 'type' => "SURRENDER"]);
                    break;
                case 'endturn':
                    $result['values'] = $this->callAPI('games/action', ['key'=> $_SESSION['key'], 'type' => "END_TURN"]);
                    break;
            
                    
                case 'cardnames':
                        $result['values'] = [
                           1 => 'Brawler',
                            2 => 'Flea Man',
                            3 => 'Gaibon',
                            4 => 'Malebranche',
                            5 => 'Armored Beast',
                            6 => 'Hell doll',
                            7 => 'Crusty',
                            8 => 'Deadfast',
                            9 => 'Abel',
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