window.addEventListener("load", () => {
    console.log("window load");

    tick();
})

var x = 20;
var y = 120;
var direction = "right";

const tick = () => {
    
    let bat = document.querySelector("#batgif");
    switch( direction){
        case "right":
            if ( x <= 70){
                x++;
                bat.style.left = x  + "%";
            }
            else{
                direction = "down";
            }
        
            break;
        case "down":
            if ( y <= 520){
                y = y + 20;
                bat.style.top = y  + "px";
            }
            else{
                direction = "left";
            }
        
            break;
        case "left":
            if ( x >= 20){
                x--;
                bat.style.left = x  + "%";
            }
            else{
                direction = "up";
            }
        
            break;
        case "up":
            if ( y >= 120){
                y= y - 20;
                bat.style.top = y  + "px";
            }
            else{
                direction = "right";
            }
        
            break;

    }
    
    window.requestAnimationFrame(tick);
     
}