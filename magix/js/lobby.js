window.addEventListener("load", () => {
    console.log("window load");

    
    tick();
})

var lastdisplay = 0 ;
var data = null;

const tick = () => {
    
    if (data == null ){

        const dialogsnode = document.querySelector("#dialogs");
        data = JSON.parse(dialogsnode.innerHTML);
        
    }

    
    if ( performance.now() - lastdisplay > 10000 ||  lastdisplay == 0 && performance.now() > 2000  ){

        let item = data.dialogs[Math.floor(Math.random()*data.dialogs.length)];

        lastdisplay = performance.now();

        const dialog = document.querySelector("#dialog");
        dialog.innerHTML = "";

        
        const newNode = document.createElement("div"); // <li></li>
		newNode.classList.add("dialogcontent");

        const img = document.createElement("img");
        img.classList.add("dialogimage");
        img.src = item.img;
        newNode.appendChild(img);

        const textbox = document.createElement("div"); // <li></li>
		textbox.classList.add("dialogtext");

		const textNode = document.createTextNode(item.text);
 
        textbox.appendChild(textNode);
        newNode.appendChild(textbox);



        dialog.append(newNode); 

    }
   
    window.requestAnimationFrame(tick);
     
}