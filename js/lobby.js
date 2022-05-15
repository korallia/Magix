window.addEventListener("load", () => {
    console.log("window load");
    tick();
})

var lastdisplay = 0;
var data = null;
var lastindex = null;

const tick = () => {

    if (data == null) {
        const dialogsnode = document.querySelector("#dialogs");
        data = JSON.parse(dialogsnode.innerHTML);
    }

    if (performance.now() - lastdisplay > 10000 || lastdisplay == 0 && performance.now() > 2000) {

        let newindex = Math.floor(Math.random() * data.dialogs.length);
        while (newindex == lastindex) {
            newindex = Math.floor(Math.random() * data.dialogs.length);
        }
        lastindex = newindex;

        let item = data.dialogs[newindex];

        lastdisplay = performance.now();

        const dialog = document.querySelector("#dialog");
        dialog.innerHTML = "";

        const newNode = document.createElement("div"); 
        newNode.classList.add("dialogcontent");

        const img = document.createElement("img");
        img.classList.add("dialogimage");
        img.src = item.img;
        newNode.appendChild(img);

        const textbox = document.createElement("div"); 
        textbox.classList.add("dialogtext");

        const textNode = document.createTextNode(item.text);
        textbox.appendChild(textNode);
        newNode.appendChild(textbox);
        dialog.append(newNode);

    }

    window.requestAnimationFrame(tick);

}


