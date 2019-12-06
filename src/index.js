
function fetchBeers() {
    fetch("http://localhost:3000/beers")
        .then(data => data.json())
        .then(renderBeer)
        .catch(console.error)
}

function renderBeer(arrObjBeers) {
    const ulListGroup = document.querySelector(".list-group");

    arrObjBeers.forEach((objBeer) => {
        const liBeer = document.createElement("li");
        liBeer.className = "list-group-item";
        liBeer.innerHTML = objBeer.name;
        liBeer.dataset.id = objBeer.id;

        ulListGroup.appendChild(liBeer);
    })
}


function fetchBeer(idBeer) {
    fetch(`http://localhost:3000/beers/${idBeer}`)
        .then(data => data.json())
        .then(renderBeerDetail)
        .catch(console.error)
}

function renderBeerDetail(objBeer) {
    const divBeerDetail = document.querySelector("#beer-detail");

    const htmlBeerDetail = `
        <h1>${objBeer.name}</h1>
        <img src=${objBeer.image_url}>
        <h3>${objBeer.tagline}</h3>
        <textarea data-id=${objBeer.id}>${objBeer.description}</textarea>
        <button id="edit-beer" class="btn btn-info" onclick="btnBeerCommentSave()">
          Save
        </button>
    `;

    divBeerDetail.innerHTML = htmlBeerDetail;
}

function saveComment(objBeer) {
    const config = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(
            {
                description: objBeer.description
            }
        )
    };

    fetch(`http://localhost:3000/beers/${objBeer.id}`, config)
        .then(data => data.json())
        .then(console.log)
        .catch(console.error)
}


// DOM LOAD

document.addEventListener("DOMContentLoaded", () => {
    fetchBeers();
    liBeerClickEventListener();
});

// CLICK LISTENERS -------------------------------------------------------------


const liBeerClickEventListener = () => {
    const ulListGroup = document.querySelector(".list-group");

    ulListGroup.addEventListener('click', (event) => {
        fetchBeer(event.target.dataset.id);
    });
};

const btnBeerCommentSave = () => {
    const textarea = document.querySelector("textarea");

    saveComment({
        id: textarea.dataset.id,
        description: textarea.value
    });
};
