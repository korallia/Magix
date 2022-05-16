window.addEventListener("load", () => {
    console.log("window load");
    setTimeout(status, 1000);
    console.log("GET CARD NAMES");
    ajax_action("cardnames");
    ajax_action("stringlookup");



    document.querySelector(".playerArea1 .lifepoints").onclick = e => attackplayer(e);
    document.querySelector(".playerArea1 .class").onclick = e => attackplayer(e);
    document.querySelector(".playerArea2 .heropower").onclick = e => heropower(e);
    document.querySelector("#lobbychatbutton").onmouseover = e => showchat(e);
    document.querySelector("#help button").onclick = e => togglehelp(e);

    let game = document.querySelector("#game");


    // we create the tooltips in advance so that there is a fadein animation on first diplay
    createtooltip("tooltip_hand", "These are the cards you can play. Click them or drag them to your play area during your turn to play them. Make sure you have enough energy left!");
    createtooltip("tooltip_cards", "These are the cards you have in play. Click them, and then, a target, or drag them to a target to attack. Grayed out cards are sleeping until the next turn");
    createtooltip("tooltip_enemycards", "These are the cards played by the enemy. Taunt cards must be attacked first! ");
    createtooltip("tooltip_enemylife", "The enemy life points. Drag or click here to attack their hero");
    createtooltip("tooltip_enemyenergy", "The crystals left for the enemy to play cards and use their hero power");
    createtooltip("tooltip_yourlife", "Your life points. You lose at 0");
    createtooltip("tooltip_yourenergy", "Your crystals to play cards and use your hero power. The crystals do NOT carry from turn to turn");
    createtooltip("tooltip_enemyclass", "The class of your enemy. Drag or click picture to attack hero");
    createtooltip("tooltip_yourclass", "Your class. Informative only, does nothing");
    createtooltip("tooltip_enemyheropower", "Your enemy's hero power");
    createtooltip("tooltip_yourheropower", "Your hero power. Costs 2 crystals, can only be used once per turn");
    createtooltip("tooltip_enemyhands", "Cards in the enemy's hands");
    createtooltip("tooltip_yourhands", "End your turn early, and number of cards in your hand");
    createtooltip("tooltip_enemytimeleft", "Time left for your enemy's turn");
    createtooltip("tooltip_enemydeck", "Cards in the enemy's deck");
    createtooltip("tooltip_yourdeck", "Cards in your deck");
    createtooltip("tooltip_yourtimeleft", "Time left in your turn");
    createtooltip("tooltip_surrender", "When all hope is lost, concede and lose by surrendering!");
    createtooltip("tooltip_lobby", "Return to the lobby, but doesn't stop the game. Rather rude. Click back to return");


    showchat(null);

})

var yourTurn = false;

const createtooltip = (id, message) => {
    let tooltip = document.querySelector("#" + id);
    if (tooltip == null) {
        let element = document.createElement("div");
        element.classList.add('tooltip');
        element.classList.add('hidden');
        element.id = id;

        let text = document.createTextNode(message);
        element.appendChild(text);
        game.appendChild(element);
    }
}

var helpshown = false;

const hidehelp = () => {
    if (helpshown) {
        let tooltips = document.querySelectorAll(".tooltip");
        tooltips.forEach(tooltip => {
            tooltip.classList.add("hidden");
        });
        helpshown = false;
    }
}

const togglehelp = e => {

    if (helpshown) {
        hidehelp();
    } else {
        let tooltips = document.querySelectorAll(".tooltip");
        tooltips.forEach(tooltip => {
            tooltip.classList.remove("hidden");
        });
        helpshown = true;
    }
}


const showchat = e => {
    let chatarea = document.querySelector("#lobbychatbutton");

    // because the chat moves, it cannot have an animation, or it might flash
    // if the mouse over is near the bottom
    chatarea.style.height = "27.5rem";
    chatarea.style.marginTop = "-15.5rem";

    // we hide the cards in hand, since the images on the cards are created after
    // the card, and z-index isn't enough to put the picture under the chat.
    let hand = document.querySelector("#hand");
    hand.style.visibility = "hidden";
}

const hidechat = e => {
    let chatarea = document.querySelector("#lobbychatbutton");
    chatarea.style.height = "12rem";
    chatarea.style.marginTop = "0rem";

    let hand = document.querySelector("#hand");
    hand.style.visibility = "visible";

}

const status = () => {
    // only needed to start it.
    ajax_action("status");
}

var cardnames = [];
var stringlookup = [];

const set_card_names = data => {
    console.log("GOT CARD NAMES");
    console.log(data);
    cardnames = data.values;
}

// this replaces the game with a single large message
const display_single_message = message => {


    const gamearea = document.querySelector("#game");
    gamearea.style.display = "none";

    const waitingarea = document.querySelector("#pending");
    waitingarea.style.display = "block";

    document.querySelector("#surrender").style.display = "none";

    let h1div = document.createElement("h1");

    let h1text = document.createTextNode(message);
    h1div.appendChild(h1text);
    waitingarea.innerHTML = "";
    waitingarea.appendChild(h1div);

    // and force the chat open, so it fill the empty area
    showchat(null);
    document.querySelector("#lobbychatbutton").onmouseout = null;

}

const gethpimages = (hp, maxhp) => {
    if (hp >= maxhp) {
        return "url('images/icones/life/100.png')";
    }
    // the hp image lowers over time, in 10% marks
    let percent = Math.floor(hp / maxhp * 10) * 10;
    return "url('images/icones/life/" + percent + ".png')";
}


// the previous variables are used to flag new and removed cards
// the "c" variant has the full card, those without just the uid
var previoushand = [];
var previoushandc = [];
var previouscards = [];
var previouscardsc = [];
var previousopponentcards = [];
var previousopponentcardsc = [];
var player2mp = 0;

const update_game = data => {
    // surrender is only availalble during a game
    document.querySelector("#surrender").style.display = "none";

    if (data.values == "WAITING") {
        // waiting to start
    } else if (data.values == "LAST_GAME_LOST") {
        display_single_message("GAME OVER!")
    } else if (data.values == "LAST_GAME_WON") {
        display_single_message("VICTORY!")
    } else if (data.values == "INVALID_KEY") {
        display_single_message("INVALID KEY: PLEASE LOGIN")
    } else if (data.values && data.values.opponent) {

        // the game is in progress!

        document.querySelector("#surrender").style.display = "inline-block";

        const waitingarea = document.querySelector("#pending");
        if (waitingarea.style.display != "none") {
            // If the waiting area was not hidden, we just began!

            const gamearea = document.querySelector("#game");
            gamearea.style.display = "block";
            waitingarea.style.display = "none";

            // activate the hiding of the chat, which was forced open when waiting
            document.querySelector("#lobbychatbutton").onmouseout = e => hidechat(e);
            hidechat(null);
        }

        // opponent name
        const player2opponent = document.querySelector(".opponentname");
        player2opponent.innerHTML = data.values.opponent.username;

        // Class ( Warlock, Priest, etc...), talent and image
        const player1class = document.querySelector(".playerArea1 .class");
        if (player1class.innerHTML == "") {
            // only init once, so we keep the event handler. Class will not change
            player1class.innerHTML = '';
            let image = document.createElement("img");
            let classname = data.values.opponent.heroClass;
            image.src = "images/classes/" + classname + ".png";
            image.classList.add("enemyimage");
            player1class.appendChild(image);
            document.querySelector(".playerArea1 .details img").ondrop = attackdrop_handler;
            document.querySelector(".playerArea1 .details img").ondragover = dragover_handler;
            document.querySelector(".playerArea1 .details img").onclick = e => attackplayer(e);
        }


        const player2class = document.querySelector(".playerArea2 .class");
        player2class.innerHTML = '';
        image = document.createElement("img");
        classname = data.values.heroClass;
        image.src = "images/classes/" + classname + ".png";
        player2class.appendChild(image);

        const player1talent = document.querySelector(".playerArea1 .talent");
        player1talent.innerHTML = data.values.opponent.talent + " " + data.values.opponent.heroClass;

        const player2talent = document.querySelector(".playerArea2 .talent");
        player2talent.innerHTML = data.values.talent + " " + data.values.heroClass;

        // Hero Power
        const player1heropower = document.querySelector(".playerArea1 .heropower");
        const player2heropower = document.querySelector(".playerArea2 .heropower");


        if (data.values.heroPowerAlreadyUsed) {
            player2heropower.innerHTML = '';
            let image = document.createElement("img");
            image.src = "images/icones/power/used.png";
            player2heropower.appendChild(image);

        } else {
            player2heropower.innerHTML = '';
            let image = document.createElement("img");
            image.src = "images/icones/power/ready.png";
            player2heropower.appendChild(image);
            document.querySelector(".playerArea2 .heropower img").onclick = e => heropower(e);
        }
        if (data.values.opponent.heroPowerAlreadyUsed) {
            player1heropower.innerHTML = '';
            let image = document.createElement("img");
            image.src = "images/icones/power/used.png";
            player1heropower.appendChild(image);

        } else {
            player1heropower.innerHTML = '';
            let image = document.createElement("img");
            image.src = "images/icones/power/ready.png";
            player1heropower.appendChild(image);
        }

        // Count of cards and time left
        const player1cards = document.querySelector("#enemyCards");
        const player2cards = document.querySelector("#playerCards");

        const player1timeleft = document.querySelector(".playerArea1 .timeleft");
        const player2timeleft = document.querySelector(".playerArea2 .timeleft");

        if (data.values.yourTurn) {
            if (!yourTurn) {
                // it is now your turn, it wasn't before
                // since you now need to play, hide the help
                hidehelp();
                yourTurn = true;
            }
            player2cards.classList.add('turn');
            player1cards.classList.remove('turn');
            player1timeleft.classList.add('hidden');
            player2timeleft.classList.remove('hidden');

            player2timeleft.innerHTML = data.values.remainingTurnTime;

            // each turn is 50 seconds, we have 8 images, but from low to high,
            // so that we do 50 - time, /50 * 8
            let number = Math.floor(((50 - data.values.remainingTurnTime) / 50) * 8);
            player2timeleft.style.backgroundImage = "url('images/icones/temps/" + number + ".png')";


        } else {
            if (yourTurn) {
                // it is no longer your turn, it was before
                // no need to hide the help... but reset the selection
                currentcard = null;
                yourTurn = false;
            }

            player1cards.classList.add('turn');
            player2cards.classList.remove('turn');
            player1timeleft.classList.remove('hidden');
            player2timeleft.classList.add('hidden');

            player1timeleft.innerHTML = data.values.remainingTurnTime;
            // each turn is 50 seconds, we have 8 images, but from low to high,
            // so that we do 50 - time, /50 * 8
            let number = Math.floor(((50 - data.values.remainingTurnTime) / 50) * 8);
            player1timeleft.style.backgroundImage = "url('images/icones/temps/" + number + ".png')";

        }

        // Life points
        const player1lifepoints = document.querySelector(".playerArea1 .lifepoints");
        const player2lifepoints = document.querySelector(".playerArea2 .lifepoints");

        player1lifepoints.innerHTML = data.values.opponent.hp;
        player1lifepoints.style.backgroundImage = gethpimages(data.values.opponent.hp, data.values.opponent.maxHp);
        player2lifepoints.innerHTML = data.values.hp;
        player2lifepoints.style.backgroundImage = gethpimages(data.values.hp, data.values.maxHp);

        // Energy (MP) section
        const player1energy = document.querySelector(".playerArea1 .energy");
        const player2energy = document.querySelector(".playerArea2 .energy");


        player1energy.innerHTML = data.values.opponent.mp;
        if (data.values.opponent.mp > 0) {
            player1energy.style.backgroundImage = "url('images/icones/mana/mana_opponent.png')";
        } else {
            player1energy.style.backgroundImage = "url('images/icones/mana/mana_opponent_zero.png')";
        }
        player2energy.innerHTML = data.values.mp;
        player2mp = data.values.mp;
        if (data.values.mp > 0) {
            player2energy.style.backgroundImage = "url('images/icones/mana/mana_player.png')";
        } else {
            player2energy.style.backgroundImage = "url('images/icones/mana/mana_player_zero.png')";
        }

        // Hard sizes
        const player1hand = document.querySelector(".playerArea1 .cardhand");
        player1hand.innerHTML = data.values.opponent.handSize
        const player2hand = document.querySelector(".playerArea2 .cardhand");
        player2hand.innerHTML = data.values.hand.length


        // Card count
        const player1cardCount = document.querySelector(".playerArea1 .cardcount");
        player1cardCount.innerHTML = data.values.opponent.remainingCardsCount;

        const player2cardCount = document.querySelector(".playerArea2 .cardcount");
        player2cardCount.innerHTML = data.values.remainingCardsCount;

        // The cards in the player's hands
        const handdiv = document.querySelector("#hand");
        handdiv.innerHTML = "";
        let hand = data.values.hand;
        if (hand) {
            let add = [];
            previoushandc.forEach(previous => {
                let present = false;
                hand.forEach(card => {
                    if (card.uid == previous.uid) {
                        present = true;

                    }
                });
                if (!present) {
                    // a previous card is absent, show it is removed and add it later
                    previous.removed = true;
                    add.push(previous);
                }

            });
            // add each of the cards
            hand.forEach(card => {
                if (!previoushand.includes(card.uid)) {
                    // This is a new card, show it as appearing
                    card.new = true;
                }

                let carddiv = create_card(card, true, true);
                carddiv.onclick = e => playCard(e);
                handdiv.appendChild(carddiv);
            });

            // and then the missing ones, just for 1 cycle, about 1000 milliseconds
            add.forEach(card => {

                let carddiv = create_card(card, true, false);
                handdiv.appendChild(carddiv);
            });
            previoushand = [];
            previoushandc = [];
            hand.forEach(card => {
                previoushand.push(card.uid);
                previoushandc.push(card);
            });
        }

        // The cards in the player's game area
        const playerCards = document.querySelector("#playerCards");
        playerCards.innerHTML = "";
        if (data.values.board) {
            let board = data.values.board;
            if (board) {
                let add = [];

                previouscardsc.forEach(previous => {
                    let present = false;
                    board.forEach(card => {
                        if (card.uid == previous.uid) {
                            present = true;

                        }
                    });
                    if (!present) {
                        // a previous card is absent, show it is removed and add it later
                        previous.removed = true;
                        add.push(previous);
                    }

                });
                // add each of the cards
                board.forEach(card => {
                    if (!previouscards.includes(card.uid)) {
                        // This is a new card, show it as appearing
                        card.new = true;
                        previouscards.push(card.uid);
                    }

                    let carddiv = create_card(card, true, false);
                    carddiv.onclick = e => selectCard(e);
                    playerCards.appendChild(carddiv);
                });
                // and then the missing ones, just for 1 cycle, about 1000 milliseconds
                add.forEach(card => {
                    let carddiv = create_card(card, true, false);
                    playerCards.appendChild(carddiv);
                });
                previouscards = [];
                previouscardsc = [];
                board.forEach(card => {
                    previouscards.push(card.uid);
                    previouscardsc.push(card);
                });

            }

        }

        // The cards in the enemy's game area
        if (!drag_attacking) {
            // If we attack via drag and drop, we must not refresh, otherwise, the drag
            // and drop might be corrupted
            const enemyCards = document.querySelector("#enemyCards");
            enemyCards.innerHTML = "";
            if (data.values.opponent) {
                let board = data.values.opponent.board;

                if (board) {
                    let add = [];

                    previousopponentcardsc.forEach(previous => {
                        let present = false;
                        board.forEach(card => {
                            if (card.uid == previous.uid) {
                                present = true;

                            }
                        });
                        if (!present) {
                            // a previous card is absent, show it is removed and add it later
                            previous.removed = true;
                            add.push(previous);
                        }

                    });
                    // add each of the cards
                    board.forEach(card => {
                        if (!previousopponentcards.includes(card.uid)) {
                            // This is a new card, show it as appearing
                            card.new = true;
                            previousopponentcards.push(card.uid);
                        }


                        let carddiv = create_card(card, false, false);
                        carddiv.onclick = e => targetCard(e);
                        enemyCards.appendChild(carddiv);
                    });
                    // and then the missing ones, just for 1 cycle, about 1000 milliseconds
                    add.forEach(card => {
                        let carddiv = create_card(card, false, false);
                        enemyCards.appendChild(carddiv);
                    });
                    previousopponentcards = [];
                    previousopponentcardsc = [];
                    board.forEach(card => {
                        previousopponentcards.push(card.uid);
                        previousopponentcardsc.push(card);
                    });

                }

            }
        }
    }

}

const endturn = () => {
    ajax_action("endturn");
}

// this is when a card in hand is played on the board
const playCard = e => {
    let element = e.srcElement;
    // the picture can have been clicked, so go back up to the card itself
    while (!element.classList.contains("card") && element.parentNode != null) {
        element = element.parentNode;
    }
    let id = element.getAttribute("data-id");
    let uid = element.getAttribute("data-uid");
    let cost = element.getAttribute("data-cost");

    if (id) {
        // let's not wait for the status update to reduce the energy level. Let's do it right away
        player2mp -= cost;
        const player2energy = document.querySelector(".playerArea2 .energy");
        player2energy.innerHTML = player2mp;
        // and adjust the cards
        markTooExpensiveCards();

        let values = [];
        ajax_data('play', {"uid": uid});
        document.querySelector("#card" + uid).style.display = "none";
    }

}

// this is the currently clicked card. Not used for drag and drop
var currentcard = null;

// This is when a card is clicked to select to attack, not used for drap and drop
const selectCard = e => {
    if (yourTurn) {
        drag_attacking = false;
        let element = e.srcElement;
        // the picture can have been clicked, so go back up to the card itself
        while (!element.classList.contains("card") && element.parentNode != null) {
            element = element.parentNode;
        }
        if (!element.classList.contains("sleep")) {
            let uid = element.getAttribute("data-uid");
            currentcard = uid;
            element.classList.add("clicked");
        }
    }

}
// This is when a card of the enemy is clicked to select to be attacked
const targetCard = e => {
    let element = e.srcElement;
    // the picture can have been clicked, so go back up to the card itself
    while (!element.classList.contains("card") && element.parentNode != null) {
        element = element.parentNode;
    }
    if (currentcard && yourTurn) {
        let uid = element.getAttribute("data-uid");
        ajax_data('attack', {"uid": currentcard, "targetuid": uid});
        currentcard = null;
    }


}
// This is to atttack the hero itself, using click. Not used for drag and drop
const attackplayer = e => {
    if (currentcard && yourTurn) {

        ajax_data('attack', {"uid": currentcard, "targetuid": 0});
        currentcard = null;
    }

}
const surrender = e => {

    document.querySelector("#surrender").style.display = "none";
    const gamearea = document.querySelector("#game");
    gamearea.style.display = "none";

    const waitingarea = document.querySelector("#pending");
    waitingarea.style.display = "block";

    ajax_data('surrender');

}
const heropower = e => {
    if (yourTurn) {
        ajax_data('heropower');
    }

}

const dragover_handler = ev => {
    if (yourTurn) {
        ev.preventDefault();
    }
}

// This is to play a card via drag and drop
const playdrop_handler = ev => {

    if (ev.srcElement.id == "playerCards" && yourTurn) {
        let uid = ev.dataTransfer.getData("text");

        // let's not wait for the status update to reduce the energy level. Let's do it right away
        player2mp -= document.querySelector("#card" + uid).getAttribute('data-cost');
        const player2energy = document.querySelector(".playerArea2 .energy");
        player2energy.innerHTML = player2mp;
        // and adjust the cards
        markTooExpensiveCards();


        ajax_data('play', {"uid": uid});
        document.querySelector("#card" + uid).classList.add("removed");

    }


    ev.preventDefault();
}

// This is to attack with a card via drag and drop
const attackdrop_handler = ev => {
    if (yourTurn) {
        drag_attacking = false;
        if (ev.srcElement.classList.contains("lifepoints") || ev.srcElement.classList.contains("enemyimage")) {
            // then we attack the hero itself
            ajax_data('attack', {"uid": currentcard, "targetuid": 0});
        } else {

            let uid = ev.dataTransfer.getData("text");
            let target = ev.srcElement.getAttribute('data-uid');
            let element = ev.srcElement;
            while (target == null && element.parentNode != null) {
                // It's possible to drop on sub-elements, like atk, def or the image. Go back
                // to the parents until we have a data-uid (on the card)
                element = element.parentNode;
                target = element.getAttribute('data-uid');
            }
            console.log(ev.srcElement);
            console.log({"uid": currentcard, "targetuid": target});
            ajax_data('attack', {"uid": uid, "targetuid": target});
        }

        // if drag and dropping, cancel selection
        currentcard = null;
        ev.preventDefault();
    }

}

var drag_attacking = false;

const dragstart_handler = ev => {
    if (yourTurn) {
        currentcard = null;
        const player2cards = document.querySelector("#playerCards");
        const player1cards = document.querySelector("#enemyCards");

        if (ev.srcElement.parentNode.id == "hand") {

            player2cards.ondrop = playdrop_handler;
            player2cards.ondragover = dragover_handler;
        } else {
            player2cards.ondrop = null;
            player2cards.ondragover = null;
        }
        if (ev.srcElement.parentNode.id == "playerCards") {

            player1cards.childNodes.forEach(child => {
                child.ondrop = attackdrop_handler;
                child.ondragover = dragover_handler;

            });
            document.querySelector(".playerArea1 .lifepoints").ondrop = attackdrop_handler;
            document.querySelector(".playerArea1 .lifepoints").ondragover = dragover_handler;
            drag_attacking = true;
        } else {
            player1cards.childNodes.forEach(child => {
                child.ondrop = null;
                child.ondragover = null;
            });

        }


        // The cards are too close and the image by default is square, so the next one shows up in the drag image.
        // We thus clone them, but above the page, so it doesn't show.
        var crt = ev.srcElement.cloneNode(true);
        crt.style.position = "absolute";
        crt.style.top = "-350px";
        document.body.appendChild(crt);
        ev.dataTransfer.setDragImage(crt, 0, 0);
        ev.dataTransfer.setData("text/plain", ev.srcElement.getAttribute('data-uid'));
        currentcard = ev.srcElement.getAttribute('data-uid');
        ev.dataTransfer.dropEffect = "link";
    }
}

// This function creates the cards for the 3 sections.
// Only those from the player can be dragged. Only those in the hand
// can be bought
const create_card = (card, draggable, buyable) => {
    let element = document.createElement("div");
    element.classList.add('card');
    element.setAttribute("data-uid", card.uid);
    element.setAttribute("data-id", card.id);
    element.setAttribute("data-cost", card.cost);
    element.id = "card" + card.uid;

    if (card.new) {
        element.classList.add('newcard');
    }
    if (card.removed) {
        element.classList.add('removed');
    }


    if (buyable && card.cost > player2mp) {
        element.classList.add("tooexpensive");
    } else if (card.state == "SLEEP" || (buyable && !yourTurn)) {
        // too expensive has priority on sleep. But the hand is also put to sleep during
        // the other player's turn. 
        element.classList.add("sleep");
    } else if (draggable) {
        // only draggable if not too expensive and not sleeping
        element.setAttribute("draggable", "true");
        element.ondragstart = dragstart_handler
    }

    if (card.uid == currentcard && yourTurn) {
        // this is the currently clicked card
        element.classList.add("clicked");
    }


    let cost = document.createElement("div");
    cost.classList.add('cost');
    let costtext = document.createTextNode(card.cost);
    cost.appendChild(costtext);
    element.appendChild(cost);


    let atk = document.createElement("div");
    atk.classList.add('atk');
    let atktext = document.createTextNode(card.atk);
    atk.appendChild(atktext);
    element.appendChild(atk);


    let hp = document.createElement("div");
    hp.classList.add('hp');
    let hptext = document.createTextNode(card.hp);
    hp.appendChild(hptext);
    element.appendChild(hp);


    let titlediv = document.createElement("div");
    titlediv.classList.add('title');
    // put a default card in case of new cards
    let name = "New Card #" + card.id;
    let imagenumber = "11";
    // but load the card if known
    if (cardnames[card.id]) {
        name = cardnames[card.id];
        imagenumber = card.id;

    }
    let text = document.createTextNode(name);
    titlediv.appendChild(text);
    element.appendChild(titlediv);


    let imagediv = document.createElement("div");
    imagediv.classList.add('image');
    let image = document.createElement("div");
    image.style.backgroundImage = "url('images/cartes/" + imagenumber + "s.jpg')";

    imagediv.appendChild(image);
    element.appendChild(imagediv);


    let mechanics = document.createElement("div");
    mechanics.classList.add('mechanics');

    card.mechanics.forEach(mechanic => {
        let mechanicdiv = document.createElement("div");
        mechanicdiv.classList.add('mechanic');
        if (mechanic == 'Taunt') {
            element.classList.add("taunt");
        }
        if (mechanic == 'Stealth') {
            element.classList.add("stealth");
        }
        let desc = document.createTextNode(mechanic);
        mechanicdiv.appendChild(desc);
        mechanics.appendChild(mechanicdiv);
    });

    element.appendChild(mechanics);


    return element;

}

const markTooExpensiveCards = () => {
    let hand = document.querySelector("#hand");
    hand.childNodes.forEach(child => {
        if (child.getAttribute('data-cost') > player2mp) {
            child.classList.add("tooexpensive");
        }
    });


}

const applyGameStyles = iframe => {
    let styles = {
        fontColor: "#FFF",
        backgroundColor: "rgba(0, 0, 0, 1)",
        fontGoogleName: "Copperplate Gothic",
        fontSize: "14px",
        hideIcons: false,
        inputBackgroundColor: "#cccccc",
        inputFontColor: "#222222",
        height: "100%",
        width: "100%",
        memberListFontColor: "#ff00dd",
        memberListBackgroundColor: "#cccccc"
    }

    setTimeout(() => {
        iframe.contentWindow.postMessage(JSON.stringify(styles), "*");
    }, 100);
}