// deliverable 1: load all the shoes in the sidebar. show the first shoe in the main container by default.
// deliverable 2: user should be able to see more info about a shoe, its reviews, and a form in the main container, by clicking on it in the sidebar.
// deliverable 3: user should be able to add a new review through the form.

const shoesURL = `http://localhost:3000/shoes`
const sidebar = document.getElementById('shoe-list')
const reviewForm = document.getElementById('form-container')
const reviewsList = document.getElementById('reviews-list')
const mainShoe = document.getElementById('main-shoe')
const mainShoeImage = mainShoe.querySelector('#shoe-image')
const mainShoeName = mainShoe.querySelector('#shoe-name')
const mainShoeDescription = mainShoe.querySelector('#shoe-description')
const mainShoePrice = mainShoe.querySelector('#shoe-price')

reviewForm.addEventListener('submit', (event) => submitReview(event))

fetch(shoesURL)
    .then(r => r.json())
    .then((shoesArray) => {
        displayMainShoe(shoesArray)
        shoesArray.forEach((shoe) => {
            formatShoeList(shoe)
            selectShoe(shoe, shoesArray)
        })
    })

function formatShoeList(shoe) {
    const shoeList = document.createElement('li')
    shoeList.innerText = `${shoe.name}`
    shoeList.dataset.id = `${shoe.id}`
    shoeList.style.cursor = 'pointer'
    sidebar.append(shoeList)
}

function displayMainShoe(shoesArray) {
    let firstShoe = shoesArray[0]
    mainShoeImage.src = firstShoe.image
    mainShoeName.innerText = firstShoe.name
    mainShoeDescription.innerText = firstShoe.description
    mainShoePrice.innerText = `$${firstShoe.price}`

    firstShoe.reviews.forEach((review) => {
        let firstShoeReviewitem = document.createElement('li')
        firstShoeReviewitem.classList.add('list-group-item')
        firstShoeReviewitem.innerText = review.content

        reviewsList.append(firstShoeReviewitem)
    })

    displayReviewForm()
}

function displayReviewForm() {
    const form = document.createElement('form')
    form.id = 'new-review'
    reviewForm.append(form)

    const formDiv = document.createElement('div')
    formDiv.classList.add('form-group')

    const formHeader = document.createElement('h4')
    formHeader.innerText = 'Write a review'

    const formInputText = document.createElement('textarea')
    formInputText.id = 'review-content'

    const formSubmitButton = document.createElement('input')
    formSubmitButton.setAttribute('type', 'submit')
    formSubmitButton.classList.add('btn', 'btn-primary')
    
    form.append(formDiv, formHeader, formInputText, formSubmitButton)
}

function selectShoe(shoe, shoesArray) {
    let chosenShoe = sidebar.querySelector(`li[data-id="${shoe.id}"]`)
    let chosenShoeInfo = shoesArray[`${shoe.id - 1}`]
    
    chosenShoe.addEventListener("click", (event) => {
        mainShoeImage.src = chosenShoeInfo.image
        mainShoeName.innerText = chosenShoeInfo.name
        mainShoeDescription.innerText = chosenShoeInfo.description
        mainShoePrice.innerText = `$${chosenShoeInfo.price}`

        console.log(chosenShoeInfo.id)

        if (chosenShoeInfo.id === 1) {
            console.log("first shoe!")
        } else {
            console.log("this is not the first shoe")
            displayReviews(shoe, shoesArray)
        }
    })
}

// steps:
// 1. figure out a way to show specific reviews for each shoe
// 2. don't duplicate existing reviews
// 3. reviews for the first shoe should be displayed on page load

function displayReviews(shoe, shoesArray) {
    let chosenShoeInfo = shoesArray[`${shoe.id - 1}`]

    reviewsList.innerHTML = ""

    chosenShoeInfo.reviews.forEach((review) => {
        let shoeReviewItem = document.createElement('li')
        shoeReviewItem.classList.add('list-group-item')
        shoeReviewItem.innerText = review.content

        reviewsList.append(shoeReviewItem)
    })
}

// last deliverable!!!!
// let the user fill out the new review form
// save the new review info on the backend and display on the frontend

function reviewFormInputs() {
    return {
        content: event.target.content.value
    }
}

function submitReview(event) {
    event.preventDefault();
        // let newReview = reviewFormInputs();
        
        // console.log(event.target)
        // console.log(newReview)
}