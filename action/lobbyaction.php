<?php
require_once("action/CommonAction.php");

class LobbyAction extends CommonAction {

    public function __construct() {
        parent::__construct(CommonAction::$VISIBILITY_MEMBER);
    }

    function executeAction() {
        $dialogs = [
            ["img" => "images/cadres/CadreLisa.png", "text" => "Why do you always want to go to war? I am a woman of science! Stop fighting, disease and starvation are already decimating us too much."],
            ["img" => "images/cadres/CadreMiranda.png", "text" => "Keep your distance, I only look fragile"],
            ["img" => "images/cadres/CadreCoupleVamp.png", "text" => "Our love is the purest, for we are immortal"],
            ["img" => "images/cadres/CadreDracula.png", "text" => "All human will perish for the pain they caused me"],
            ["img" => "images/cadres/CadreIsaac.png", "text" => "Men are all cruel. Dracula's cause is just"],
            ["img" => "images/cadres/CadreJumeau.png", "text" => "We only want to learn how to kill vampires"],
            ["img" => "images/cadres/CadreMorana.png", "text" => "Wars are won with logistics, and that's my strength."],
            ["img" => "images/cadres/CadreSoeur.png", "text" => "Dracula wanted to exterminate humans. We will control them"],
            ["img" => "images/cadres/CadreSypha.png", "text" => "There is something wrong, the night is too quiet"],
            ["img" => "images/cadres/CadreSypha2.png", "text" => "Do you really think I'm going to leave injustices unanswered?"],
            ["img" => "images/cadres/CadreTrevor.png", "text" => "All I want is peace. And a bed. And a beer. Peace, a bed and a beer"],

        ];


        return compact("dialogs");

    }


}