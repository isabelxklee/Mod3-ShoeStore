// deliverable 1: load all the shoes in the sidebar. show the first shoe in the main container by default.
// deliverable 2: user should be able to see more info about a shoe, its reviews, and a form in the main container, by clicking on it in the sidebar.
// deliverable 3: user should be able to add a new review through the form.

const shoesURL = `http://localhost:3000/shoes`
const sidebarList = document.getElementById('shoe-list')
const mainContainer = document.getElementById('main-shoe')
const shoeImage = mainContainer.querySelector('#shoe-image')
const shoeName = mainContainer.querySelector('#shoe-name')
const shoeDescription = mainContainer.querySelector('#shoe-description')
const shoePrice = mainContainer.querySelector('#shoe-price')
const reviewsList = document.getElementById('reviews-list')
const formContainer = document.getElementById('form-container')

fetch(shoesURL)
    .then(r => r.json())
    .then((shoesArray) => {
        shoesArray.forEach((shoe) => {
            turnShoeToListItem(shoe)
        })
        renderMainContainer(shoesArray[0])
    })

function turnShoeToListItem(shoe) {
    // console.log(shoe)

    let sidebarShoe = document.createElement("li")
    sidebarShoe.classList.add("list-group-item")
    sidebarShoe.innerText = shoe.name
    sidebarList.append(sidebarShoe)

    sidebarShoe.addEventListener("click", (event) => {
        renderMainContainer(shoe)
    })    
}

function renderMainContainer(shoe) {
    shoeImage.src = shoe.image
    shoeName.innerText = shoe.name
    shoeDescription.innerText = shoe.description
    shoePrice.innerText = `$${shoe.price}`

    reviewsList.innerHTML = ""
    // console.log(reviewsList)

    shoe.reviews.forEach((review) => {
        turnReviewIntoListItem(review)
    })

    formContainer.innerHTML = ""

    createNewForm()
    formSubmit(shoe)
}

function turnReviewIntoListItem(review) {
    let reviewItem = document.createElement("li")
    reviewItem.classList.add("list-group-item")
    reviewItem.innerText = review.content
    reviewsList.append(reviewItem)
}

function createNewForm() {
    let newForm = document.createElement('form')
    newForm.classList.add('new-review')
    newForm.innerHTML =
        `<div class="form-group">
        <textarea class="form-control" id="review-content" rows="3"></textarea>
        <input type="submit" class="btn btn-primary"></input>
        </div>`

    formContainer.append(newForm)
}

function formSubmit(shoe) {
    const newForm = formContainer.querySelector('.new-review')
    const inputField = newForm.querySelector('#review-content')

    newForm.addEventListener("submit", (event) => {
        event.preventDefault(),
        console.log(inputField.value)

        fetch(`http://localhost:3000/shoes/${shoe.id}/reviews`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                content: inputField.value
            })
        })
            .then(r => r.json())
            .then((review) => {
                shoe.reviews.push(review)
                turnReviewIntoListItem(review)
            })
    })
}