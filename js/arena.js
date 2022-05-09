





window.addEventListener("load", () => {
    console.log("window load");
    setTimeout(status, 1000);
    console.log("GET CARD NAMES");
    ajax_action("cardnames");

    document.querySelector(".playerArea1 .lifepoints").onclick = e => attackplayer(e);
    document.querySelector(".playerArea2 .heropower").onclick = e => heropower(e);


})



const status = () => {
    ajax_action("status");
}

var cardnames = [];

const set_card_names = data =>{
    console.log("GOT CARD NAMES");
    console.log(data);
    cardnames = data.values;
    
}


const display_single_message = message =>{
    const gamearea = document.querySelector("#game");
    gamearea.style.display = "block";

    const waitingarea = document.querySelector("#pending");
    waitingarea.style.display = "none";

    let h1div = document.createElement("h1");
    
    let h1text = document.createTextNode(message);
    h1div.appendChild(h1text);
    gamearea.innerHTML  = "";
    gamearea.appendChild(h1div);


}

const gethpimages = (hp, maxhp) =>{
    if ( hp >= maxhp){
        return "url('images/icones/life/100.png')";
    }
    
    let percent = Math.floor(hp / maxhp * 10) *10;
    return "url('images/icones/life/"+percent+".png')";




}


const update_game = data =>{

    
    console.log(data);

    document.querySelector("#surrender").style.display = "none";


    if ( data.values == "WAITING"){
        // waiting to start
    }
    else if ( data.values == "LAST_GAME_LOST"){
        display_single_message("GAME OVER!")
    }
    else if ( data.values == "LAST_GAME_WON"){
        display_single_message("VICTORY!")
    }
    else if ( data.values == "INVALID_KEY"){
        display_single_message("INVALID KEY: PLEASE LOGIN")
    }
   
    else{
        document.querySelector("#surrender").style.display = "inline-block";
        const gamearea = document.querySelector("#game");
        gamearea.style.display = "block";

        const waitingarea = document.querySelector("#pending");
        waitingarea.style.display = "none";
        

        const player1area = document.querySelector(".playerArea1");
        const player2area = document.querySelector(".playerArea2");

        
        const player1cardCount = document.querySelector(".playerArea1 .cardcount");
        const player2cardCount = document.querySelector(".playerArea2 .cardcount");

        
        const player1class = document.querySelector(".playerArea1 .class");
        if ( player1class.innerHTML == ""){
            // only init once, so we keep the event handler. Class will not change
            player1class.innerHTML = '';
            let image = document.createElement("img");
            let classname = data.values.opponent.heroClass;
            image.src="images/classes/"+classname+".png";
            image.classList.add("enemyimage");
            player1class.appendChild(image);
            document.querySelector(".playerArea1 .details img").ondrop = attackdrop_handler;
            document.querySelector(".playerArea1 .details img").ondragover = dragover_handler;
        }


        const player2class = document.querySelector(".playerArea2 .class");
        player2class.innerHTML = '';
        image = document.createElement("img");
        classname = data.values.heroClass;
        image.src="images/classes/"+classname+".png";
        player2class.appendChild(image);

        const player1talent = document.querySelector(".playerArea1 .talent");
        player1talent.innerHTML = data.values.opponent.talent + " " + data.values.opponent.heroClass;
        
        const player2talent = document.querySelector(".playerArea2 .talent");
        player2talent.innerHTML = data.values.talent + " " + data.values.heroClass;
        
        const player1heropower = document.querySelector(".playerArea1 .heropower");
        const player2heropower = document.querySelector(".playerArea2 .heropower");
        


        if ( data.values.heroPowerAlreadyUsed){
            player2heropower.innerHTML = '';
            let image = document.createElement("img");
            image.src="images/icones/power/used.png";
            player2heropower.appendChild(image);
    
        }
        else{
            player2heropower.innerHTML = '';
            let image = document.createElement("img");
            image.src="images/icones/power/ready.png";
            player2heropower.appendChild(image);
        }
        if ( data.values.opponent.heroPowerAlreadyUsed){
            player1heropower.innerHTML = '';
            let image = document.createElement("img");
            image.src="images/icones/power/used.png";
            player1heropower.appendChild(image);
    
        }
        else{
            player1heropower.innerHTML = '';
            let image = document.createElement("img");
            image.src="images/icones/power/ready.png";
            player1heropower.appendChild(image);
        }


        const player1cards = document.querySelector("#enemyCards");
        const player2cards = document.querySelector("#playerCards");

        
        const player1timeleft = document.querySelector(".playerArea1 .timeleft");
        const player2timeleft = document.querySelector(".playerArea2 .timeleft");

        if ( data.values.yourTurn){
            player2cards.classList.add('turn');
            player1cards.classList.remove('turn');
            player1timeleft.classList.add('hidden');
            player2timeleft.classList.remove('hidden');
            
            player2timeleft.innerHTML = data.values.remainingTurnTime;
        }
        else{
            player1cards.classList.add('turn');
            player2cards.classList.remove('turn');
            player1timeleft.classList.remove('hidden');
            player2timeleft.classList.add('hidden');
            
            player2timeleft.innerHTML = "";
            player1timeleft.innerHTML = data.values.remainingTurnTime;
        }


        const player1lifepoints = document.querySelector(".playerArea1 .lifepoints");
        const player2lifepoints = document.querySelector(".playerArea2 .lifepoints");

        player1lifepoints.innerHTML = data.values.opponent.hp;
        player1lifepoints.style.backgroundImage = gethpimages( data.values.opponent.hp, data.values.opponent.maxHp);
        player2lifepoints.innerHTML = data.values.hp;
        player2lifepoints.style.backgroundImage = gethpimages( data.values.hp, data.values.maxHp);

        const player1energy = document.querySelector(".playerArea1 .energy");
        const player2energy = document.querySelector(".playerArea2 .energy");


        player1energy.innerHTML = data.values.opponent.mp;
        if (data.values.opponent.mp > 0 ){
            player1energy.style.backgroundImage = "url('images/icones/mana/mana_opponent.png')";
        }
        else{
            player1energy.style.backgroundImage = "url('images/icones/mana/mana_opponent_zero.png')";
        }
        player2energy.innerHTML = data.values.mp;
        if ( data.values.mp > 0){
            player2energy.style.backgroundImage = "url('images/icones/mana/mana_player.png')";
        }
        else{
            player2energy.style.backgroundImage = "url('images/icones/mana/mana_player_zero.png')";
        }


        const player1hand = document.querySelector(".playerArea1 .cardhand");
        player1hand.innerHTML = data.values.opponent.handSize

        const player2hand = document.querySelector(".playerArea2 .cardhand");
        player2hand.innerHTML = data.values.hand.length


        player1cardCount.innerHTML = data.values.opponent.remainingCardsCount;
        player2cardCount.innerHTML = data.values.remainingCardsCount;



        const handdiv = document.querySelector("#hand");
        handdiv.innerHTML = "";
        let hand = data.values.hand;
        if ( hand){
        hand.forEach( card =>{
            let carddiv = create_card(card, true);
            carddiv.onclick = e => playCard(e);
            handdiv.appendChild(carddiv);
        } );
        }

        const playerCards = document.querySelector("#playerCards");
        playerCards.innerHTML = "";
        if (data.values.board ){
            let board = data.values.board;
            if ( board && board.length > 0){
            board.forEach( card =>{
                let carddiv = create_card(card, true);
                carddiv.onclick = e => selectCard(e);
                playerCards.appendChild(carddiv);
            } );
            }
        
        }
        
        if ( !drag_attacking){
            // Si nous attaquons via un drag and drop, il ne faut pas rafraichir
            // les cartes enemies, sans quoi le drag and drop pourrait être corrompu.
            const enemyCards = document.querySelector("#enemyCards");
            enemyCards.innerHTML = "";
            if (data.values.opponent ){
                let board = data.values.opponent.board;
                if ( board){
                board.forEach( card =>{
                    let carddiv = create_card(card);
                    carddiv.onclick = e => targetCard(e);
                    enemyCards.appendChild(carddiv);
                } );
                }
            
            }
        }
}

}

const endturn = () => {
    ajax_action("endturn");
}

const playCard = e =>{
    let element = e.srcElement;
    while( !element.classList.contains("card") && element.parentNode != null){
        element = element.parentNode;
        console.log(element);
    }
    let id =element.getAttribute("data-id");
    let uid =element.getAttribute("data-uid");
    if (id){
        let values = [];
        ajax_data('play', {"uid":uid});
        document.querySelector("#card" + uid).style.display = "none";
    }

}

var currentcard = null;

const selectCard = e =>{
    drag_attacking = false;
    let element = e.srcElement;
    while( !element.classList.contains("card") && element.parentNode != null){
        element = element.parentNode;
    }
    if ( !element.classList.contains("sleep")){
        let uid =element.getAttribute("data-uid");
        currentcard = uid;
        element.classList.add("clicked");
    }
    

}

const targetCard = e =>{
    let element = e.srcElement;
    while( !element.classList.contains("card") && element.parentNode != null){
        element = element.parentNode;
    }
    if ( currentcard){
        let uid =element.getAttribute("data-uid");
        ajax_data('attack', {"uid":currentcard, "targetuid": uid});
        currentcard = null;
    }
    

}

const attackplayer = e=>{
    if ( currentcard){
        
        ajax_data('attack', {"uid":currentcard, "targetuid": 0});
        currentcard = null;
    }
    
}
const surrender = e=>{
    document.querySelector("#surrender").style.display = "none";
    const gamearea = document.querySelector("#game");
    gamearea.style.display = "none";

    const waitingarea = document.querySelector("#pending");
    waitingarea.style.display = "block";

    ajax_data('surrender');
    
}
const heropower = e=>{
    
    ajax_data('heropower');
    
}

const dragover_handler = ev =>{
    ev.preventDefault();
}


const playdrop_handler = ev =>{
    
if ( ev.srcElement.id == "playerCards"){
    let uid = ev.dataTransfer.getData("text");
    ajax_data('play', {"uid":uid});
    document.querySelector("#card" + uid).style.display = "none";
}


    ev.preventDefault();
}
const attackdrop_handler = ev =>{
    drag_attacking = false;
    if ( ev.srcElement.classList.contains("lifepoints") || ev.srcElement.classList.contains("enemyimage")){
        ajax_data('attack', {"uid":currentcard, "targetuid": 0});
    }
    else{
        
        let uid = ev.dataTransfer.getData("text");

        let target = ev.srcElement.getAttribute('data-uid');
        let element = ev.srcElement;
        while ( target == null && element.parentNode != null){
            // Il est possible de faire le drop sur les mechanics, le ATK ou le HP.
            element = element.parentNode;
            target = element.getAttribute('data-uid');
        }
        console.log(ev.srcElement);
        console.log({"uid":currentcard, "targetuid": target});
        ajax_data('attack', {"uid":currentcard, "targetuid": target});
        //ajax_data('play', {"uid":uid});
        //document.querySelector("#card" + uid).style.display = "none";
    }
    
    currentcard = 0;
        ev.preventDefault();
    }

    var drag_attacking = false;
    
const dragstart_handler = ev =>{
  
    currentcard = null;
    const player2cards = document.querySelector("#playerCards");
    const player1cards = document.querySelector("#enemyCards");

    if ( ev.srcElement.parentNode.id == "hand"){
        
        player2cards.ondrop = playdrop_handler;
        player2cards.ondragover = dragover_handler;
    }
    else{
        player2cards.ondrop = null;
        player2cards.ondragover = null;
    }
    if ( ev.srcElement.parentNode.id == "playerCards"){

        player1cards.childNodes.forEach( child =>{
            child.ondrop = attackdrop_handler;
            child.ondragover = dragover_handler;
            
        });
        document.querySelector(".playerArea1 .lifepoints").ondrop = attackdrop_handler;
        document.querySelector(".playerArea1 .lifepoints").ondragover = dragover_handler;
        drag_attacking = true;
    }
    else{
        player1cards.childNodes.forEach( child =>{
            child.ondrop = null;
            child.ondragover = null;
        });

    }


    // les cartes sont trop proche et l'image par défault est carrée
    // donc, le drag ghost prend la carte voisine.
    // un clone est donc utilisé
    var crt = ev.srcElement.cloneNode(true);
    crt.style.position = "absolute";
    crt.style.top = "-350px";
    document.body.appendChild(crt);
    ev.dataTransfer.setDragImage(crt, 0, 0);
    ev.dataTransfer.setData( "text/plain", ev.srcElement.getAttribute('data-uid'));
    currentcard = ev.srcElement.getAttribute('data-uid');
    ev.dataTransfer.dropEffect = "link";
    
  }




const create_card= (card, draggable) =>{
    let element = document.createElement("div");
    element.classList.add('card');
    element.setAttribute("data-uid", card.uid);
    element.setAttribute("data-id", card.id);
    element.id = "card" + card.uid;
    if ( draggable){
        element.setAttribute("draggable", "true");
        element.ondragstart = dragstart_handler
    }

    if ( card.uid == currentcard){
        element.classList.add("clicked");
    }
    if ( card.state == "SLEEP"){
        element.classList.add("sleep");
    }
    
  
    let cost = document.createElement("div");
    cost.classList.add('cost');
    let costtext = document.createTextNode( card.cost);
    cost.appendChild(costtext);
    element.appendChild(cost);
    
    


    let atk = document.createElement("div");
    atk.classList.add('atk');
    let atktext = document.createTextNode( card.atk);
    atk.appendChild(atktext);
    element.appendChild(atk);
  

    
    let hp = document.createElement("div");
    hp.classList.add('hp');
    let hptext = document.createTextNode( card.hp);
    hp.appendChild(hptext);
    element.appendChild(hp);
    
    
  
    let titlediv = document.createElement("div");
    titlediv.classList.add('title');
    let name ="card #" + card.id;
    if ( cardnames[card.id]){
        name =cardnames[card.id];
    }
    let text = document.createTextNode(name);
    titlediv.appendChild(text);
    element.appendChild(titlediv);
  

    let imagediv = document.createElement("div");
    imagediv.classList.add('image');
    let image = document.createElement("div");
    image.style.backgroundImage = "url('images/cartes/"+card.id+"s.jpg')";
    
    imagediv.appendChild(image);
    element.appendChild(imagediv);
    
    

      
    let mechanics = document.createElement("div");
    mechanics.classList.add('mechanics');
    
    card.mechanics.forEach( mechanic => {
        let mechanicdiv = document.createElement("div");
        mechanicdiv.classList.add('mechanic');
        let desc = document.createTextNode(mechanic);
        mechanicdiv.appendChild(desc);
        mechanics.appendChild(mechanicdiv);
    });

    element.appendChild(mechanics);

 

    return element;

}

