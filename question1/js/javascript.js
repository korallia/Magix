window.addEventListener("load", () => {

    document.querySelector("#mot").onkeyup = function (e) {
        let name = this.value;
        checknames(name);
    }

    const checknames = namePrefix => {
   
        let formData = new FormData();
        formData.append("name", namePrefix)




        fetch("ajax-search.php", {
            method:"POST",
            body: formData
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);

            let parent = document.querySelector("#resultat");
            parent.innerHTML = "";
            let ulelement = document.createElement("ul");        
            parent.appendChild(ulelement);


            response.forEach(name=>{
                let lielement = document.createElement("li");
                let text = document.createTextNode(name);
                lielement.appendChild(text);
                ulelement.appendChild(lielement);

            })


            setTimeout(checknames, 5000);
        })

        
    }	

})