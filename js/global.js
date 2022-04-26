const ajax_action = type => {
    let formData = new FormData();
    formData.append("type", type);

    fetch("ajax.php", {
        method : "POST",
        body : formData
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        if ( type=="status"){
            update_game(res);
            setTimeout(status, 1000);
        }
        else if ( type=="pratique" || type=="jouer"){
            window.location.href = "arena.php";
        }
    });
}


const demarrer = type => {
    ajax_action(type);
}
