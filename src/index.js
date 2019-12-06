document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');


fetch("http://localhost:3000/beers")
.then(resp => resp.json())
.then(data => {
    console.log(data) 
    data.forEach(function(beer){
    document.getElementById("beer-detail").innerHTML += `<li id=${beer.id} class="list-group-item">${beer.name}</li>`
})
})

document.addEventListener("click", function(e){
    console.log(e.target.id)
    if (e.target.className === "edit-beer"){
        console.log("edit-beer")  
        
        fetch(`http://localhost:3000/beers/${e.target.id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: ({description: "your new description"})   
        })
    }

    if (e.target.id){

        fetch(`http://localhost:3000/beers/${e.target.id}`)  
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            document.getElementById("beer-detail").innerHTML = `<h1>${data.name}</h1>
            <img src=${data.image_url}>
            <h3>${data.tagline}</h3>
            <textarea>${data.description}</textarea>
            <button id=${data.id} class="edit-beer" class="btn btn-info">
              Save
            </button>`
            
        
            })
           

    }

})


    




})





















