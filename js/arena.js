window.addEventListener("load", () => {
    console.log("window load");
    setTimeout(status, 1000);

})



const status = () => {
    ajax_action("status");
}

const update_game = data =>{

    console.log(data);
    


    let hand = data.values.hand;
    if ( hand){
      const handdiv = document.querySelector("#hand");
      handdiv.innerHTML = "";
      hand.forEach( card =>{
          let carddiv = create_card(card);
          handdiv.appendChild(carddiv);
      } );
    }

}

const create_card= card =>{
    let element = document.createElement("div");
    element.classList.add('card');
    
  
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
    
    let text = document.createTextNode('Card #' + card.id);
    titlediv.appendChild(text);
    element.appendChild(titlediv);
  

    let imagediv = document.createElement("div");
    imagediv.classList.add('image');
    let image = document.createElement("img");
    image.src="images/cartes/00.png";
    imagediv.appendChild(image);
    element.appendChild(imagediv);
    
    

      
    let mechanics = document.createElement("div");
    mechanics.classList.add('mechanics');
    
    card.mechanics.forEach( mechanic => {
        console.log(mechanic);
        let mechanicdiv = document.createElement("div");
        mechanicdiv.classList.add('mechanic');
        let desc = document.createTextNode(mechanic);
        mechanicdiv.appendChild(desc);
        mechanics.appendChild(mechanicdiv);
    });

    element.appendChild(mechanics);

 

    return element;

}

