// HELPFUL VARIABLES
const beerList = document.getElementById("list-group")

const beerDetail = document.getElementById("beer-detail")

const saveBtn = document.getElementById("edit-beer")
// console.log(beerList)

// STEP 1 get beers 
fetch("http://localhost:3000/beers")
    .then(resp=>resp.json())
    .then(function(data){
        data.forEach(function(beer){
            console.log(beer)
            // const beerList = document.getElementById("list-group")
            beerList.innerHTML += `<li class="list-group-item" id= ${beer.id}>${beer.name}</li>`
        })
    })

// STEP 2 click on single beer 
// add event listener to list group -- on click display HTML
// get fetch request to the id of that beer to display it
beerList.addEventListener('click', function(event){
    const beerId = event.target.id

    fetch(`http://localhost:3000/beers/${beerId}`)
        .then(resp=>resp.json())
        .then(function(beerInfo){
            console.log(beerInfo)
               let beerInfoHTML =  `<h1>${beerInfo.name}</h1>
                    <img src=${beerInfo.image_url}>
                        <h3>${beerInfo.tagline}</h3>
                        <textarea data-id=${beerId}>${beerInfo.description}</textarea>
                        <button id="edit-beer" class="btn btn-info">Save</button>`
            beerDetail.innerHTML = beerInfoHTML
        })

})

// STEP 3
// add event listener to saveBtn and do things

beerDetail.addEventListener('click', function(event){
    // let beerID = document.querySelector(`[data-id`)
    // let beerID = event.target.dataset.id 
    // debugger
    let textArea = document.getElementsByTagName("textarea")[0]
    let beerID = textArea.dataset.id
    
    if (event.target.innerText === "Save") {
    
        fetch(`http://localhost:3000/beers/${beerID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                description: textArea.value
            })
        })
    }
})


