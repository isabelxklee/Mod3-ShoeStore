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
        let reviewItem = document.createElement("li")
        reviewItem.classList.add("list-group-item")
        reviewItem.innerText = review.content
        reviewsList.append(reviewItem)
    })

    formContainer.innerHTML = ""

    let newForm = document.createElement('form')
    newForm.classList.add('new-review')
    newForm.innerHTML =
        `<div class="form-group">
        <textarea class="form-control" id="review-content" rows="3"></textarea>
        <input type="submit" class="btn btn-primary"></input>
        </div>`

    formContainer.append(newForm)

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
                    let reviewItem = document.createElement("li")
                    reviewItem.classList.add("list-group-item")
                    reviewItem.innerText = review.content
                    reviewsList.append(reviewItem)
            })
    })
}






















// const sidebar = document.getElementById('shoe-list')
// const reviewForm = document.getElementById('form-container')
// const reviewsList = document.getElementById('reviews-list')
// const mainShoe = document.getElementById('main-shoe')
// const mainShoeImage = mainShoe.querySelector('#shoe-image')
// const mainShoeName = mainShoe.querySelector('#shoe-name')
// const mainShoeDescription = mainShoe.querySelector('#shoe-description')
// const mainShoePrice = mainShoe.querySelector('#shoe-price')

// fetch(shoesURL)
//     .then(r => r.json())
//     .then((shoesArray) => {
//         displayMainShoe(shoesArray)
//         shoesArray.forEach((shoe) => {
//             formatShoeList(shoe)
//             selectShoe(shoe, shoesArray)
//         })
//     })

// function formatShoeList(shoe) {
//     const shoeList = document.createElement('li')
//     shoeList.innerText = `${shoe.name}`
//     shoeList.dataset.id = `${shoe.id}`
//     shoeList.style.cursor = 'pointer'
//     sidebar.append(shoeList)
// }

// function displayMainShoe(shoesArray) {
//     let firstShoe = shoesArray[0]
//     mainShoeImage.src = firstShoe.image
//     mainShoeName.innerText = firstShoe.name
//     mainShoeDescription.innerText = firstShoe.description
//     mainShoePrice.innerText = `$${firstShoe.price}`

//     firstShoe.reviews.forEach((review) => {
//         let firstShoeReviewitem = document.createElement('li')
//         firstShoeReviewitem.classList.add('list-group-item')
//         firstShoeReviewitem.innerText = review.content

//         reviewsList.append(firstShoeReviewitem)
//     })

//     displayReviewForm()
// }

// function displayReviewForm() {
//     const form = document.createElement('form')
//     form.id = 'new-review'
//     reviewForm.append(form)

//     const formDiv = document.createElement('div')
//     formDiv.classList.add('form-group')

//     const formHeader = document.createElement('h4')
//     formHeader.innerText = 'Write a review'

//     const formInputText = document.createElement('textarea')
//     formInputText.id = 'review-content'

//     const formSubmitButton = document.createElement('input')
//     formSubmitButton.setAttribute('type', 'submit')
//     formSubmitButton.classList.add('btn', 'btn-primary')
    
//     form.append(formDiv, formHeader, formInputText, formSubmitButton)
// }

// function selectShoe(shoe, shoesArray) {
//     let chosenShoe = sidebar.querySelector(`li[data-id="${shoe.id}"]`)
//     let chosenShoeInfo = shoesArray[`${shoe.id - 1}`]
    
//     chosenShoe.addEventListener("click", (event) => {
//         mainShoeImage.src = chosenShoeInfo.image
//         mainShoeName.innerText = chosenShoeInfo.name
//         mainShoeDescription.innerText = chosenShoeInfo.description
//         mainShoePrice.innerText = `$${chosenShoeInfo.price}`

//         console.log(chosenShoeInfo.id)

//         if (chosenShoeInfo.id === 1) {
//             console.log("first shoe!")
//         } else {
//             console.log("this is not the first shoe")
//             displayReviews(shoe, shoesArray)
//         }
//     })

//     reviewForm.addEventListener('submit', (event) => submitReview(shoe, event))
// }

// // steps:
// // 1. figure out a way to show specific reviews for each shoe
// // 2. don't duplicate existing reviews
// // 3. reviews for the first shoe should be displayed on page load

// function displayReviews(shoe, shoesArray) {
//     let chosenShoeInfo = shoesArray[`${shoe.id - 1}`]

//     reviewsList.innerHTML = ""

//     chosenShoeInfo.reviews.forEach((review) => {
//         let shoeReviewItem = document.createElement('li')
//         shoeReviewItem.classList.add('list-group-item')
//         shoeReviewItem.innerText = review.content

//         reviewsList.append(shoeReviewItem)
//     })
// }

// function inputFieldResults(){
//     const inputField = reviewForm.querySelector('#review-content')

//     return {
//         id: 50,
//         content: inputField.innerText
//     }
// }

// function submitReview(shoe, event) {
//     event.preventDefault();
//     let newReview = inputFieldResults()

//     fetch(`http://localhost:3000/shoes/${shoe.id}/reviews`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newReview),
//     })
//         .then(r => r.json())
//         // .then(console.log)
// }