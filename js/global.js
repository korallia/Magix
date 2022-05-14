const ajax_action = type => {
    
    ajax_data(type, null);
    /*
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
    */
}


const set_string_lookup = data =>{
    console.log("GOT STRING LOOKUP");
    console.log(data);
    stringlookup = data.values;
       
}

const translate_string = text =>{
    if ( stringlookup.hasOwnProperty(text) ){
        return stringlookup[text];
    }
    else{
        return text;
    }
}


const ajax_data = (type,data) => {

    let formData = new FormData();
    formData.append("type", type);
    if (data && typeof data === "object"){
        console.log(Object.keys(data));
        Object.keys(data).forEach( (key) =>{
            console.log("Adding " + key + " -> " + data[key] + " to " + type + " call");
            formData.append(key, data[key]);
        });
    }

    fetch("ajax.php", {
        method : "POST",
        body : formData
    })
    .then(res => res.json())
    .then(res => {
        let actiondiv = document.querySelector("#laststatus .action");
        let resultdiv = document.querySelector("#laststatus .result");
    
        console.log(res)
        if ( type=="status"){
            update_game(res);
            setTimeout(status, 1000);
        }
        else if ( type=="cardnames"){
            set_card_names(res);
        }
        else if ( type=="stringlookup"){
            set_string_lookup(res);
        }
        else if ( type=="play"){
            if ( res && res.values && typeof res.values != "object"){
                console.log(res.values);
                if ( resultdiv && actiondiv){
                    resultdiv.innerHTML = translate_string(res.values);
                    actiondiv.innerHTML = "Error playing card:";
                }
                        
            }
            else if ( resultdiv && actiondiv){
                resultdiv.innerHTML = "completed";
                actiondiv.innerHTML = "Play card:";
            }
        }
      
        else if ( type=="pratique" || type=="jouer"){
            window.location.href = "arena.php";
        }
        else if ( type=="endturn"){
            console.log("Turn ended");
            
        
        }
        else if ( type=="attack"){
            if ( res && res.values && typeof res.values != "object"){
                if ( resultdiv && actiondiv){
                    resultdiv.innerHTML = translate_string(res.values);
                    actiondiv.innerHTML = "Error attacking:";
                }
                
    
            }
            else if ( resultdiv && actiondiv){
                resultdiv.innerHTML = "completed";
                actiondiv.innerHTML = "Attack:";
            }
        }
        else{
            console.log("AJAX call for type " + type + " response: ");
            console.log(res);
        }
    });
}


const demarrer = type => {
    ajax_action(type);
}


const applyStyles = iframe => {
    let styles = {
		fontColor : "#FFF",
		backgroundColor : "rgba(255, 255, 255, 0.2)",
		fontGoogleName : "Copperplate Gothic",
		fontSize : "14px",
		hideIcons : false,
		inputBackgroundColor : "#cccccc",
		inputFontColor : "#222222",
		height : "100%",
        width: "100%",
		memberListFontColor : "#ff00dd",
		memberListBackgroundColor : "#cccccc"
	}
	
	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}, 100);
}