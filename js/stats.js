window.addEventListener("load", () => {
    console.log("window load");

    document.querySelector("u").onmouseover = portalover;
    document.querySelector("u").onmouseout = outsideportal;
    
})


const portalover = e =>{
    document.querySelector("#stats").style.backgroundImage = "url('images/stats.gif')";
}
const outsideportal = e =>{
    document.querySelector("#stats").style.backgroundImage = "url('images/stats.jpg')";
}