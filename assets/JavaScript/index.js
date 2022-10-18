// DOM
const cont_card = document.getElementById('cont_card')
const title = document.getElementById('title')
const contCheck = document.getElementById('cont_check')
const inputSearch = document.getElementById('search_fild')


const todayDate = events.currentDate

// PAGE FILTER
const card = [...events.events].map(events => events)
const homeEvents = card.filter(() => title.text.includes('Home'))
const pastEvents = card.filter(() => title.text.includes('Past')).filter((card) => card.date < todayDate)
const futureEvents = card.filter(() => title.text.includes('Upcoming')).filter((card) => card.date > todayDate)


// GET ALL EVENTS
let allCards = [...homeEvents, ...futureEvents, ...pastEvents]
allCards.forEach(doEvent)

// GET N FILTER CATEGORIES
const filterCategory = card.map((event) => event.category)
const categories = Array.from(new Set(filterCategory)).forEach(doCategories) 

function doCategories(category) {
    contCheck.innerHTML += `<div class="form-check checks">
                                <label class="form-check-label">
                                    ${category}
                                <input class="form-check-input" type="checkbox" value="${category}" id="${category}"/>
                                </label>
                            </div>`
}

// GET INPUT CHECK ARRAY N EVENT
let checkBoxes = Array.from(document.querySelectorAll('.form-check-input'))
checkBoxes.forEach(check => check.addEventListener('click', Checks))

inputSearch.addEventListener('input', Checks)



// CROSS FILTER N PUSH HTML
function Checks(){
    let filteredCategory = checkEvents(allCards)
    let filteredSearch = filterSearch(filteredCategory, inputSearch.value)
    if(filteredSearch.length !== 0){
        cont_card.innerHTML = ``    
    }
    filteredSearch.forEach(doEvent)
}

function checkEvents(array){
    let checkboxesChecked = checkBoxes.filter(check => check.checked).map(category => category.value)
    if (checkboxesChecked.length > 0){
        let filteredCheckBox = array.filter(event => checkboxesChecked.includes(event.category))
        return filteredCheckBox
    }
    return array
}

function filterSearch(array,text){
    let cardsFilterSearch = array.filter(event => event.name.toLowerCase().includes(text.toLowerCase()))
    if (cardsFilterSearch.length === 0){
        dontFound()
        return []
    }
    return cardsFilterSearch
}

function dontFound(){
    cont_card.innerHTML =  `<div class="cont_df_img">
                                <p>Event dont found</p>
                                <img src="https://media1.giphy.com/media/lqFHf5fYMSuKcSOJph/giphy.gif?cid=ecf05e47at58j0e04euem24lav8u8srmsy9ed9flshjk8lxy&rid=giphy.gif&ct=g" alt="" id="dont_found_img">
                            </div>`
}


function doEvent(event) {
    cont_card.innerHTML += `<div class="card" style="width: 15rem; height: 24rem;">
                                <img src="${event.image}" style="height: 30%; object-fit: cover; border-radius: 0.3rem 0.3rem 0 0 ;" alt="..." />
                                <div class="card-body" style="height: 70%;">
                                    <h5 class="card-title" style="height: 25%;">${event.name}</h5>
                                    <p class="card-text" style="height: 50%;">
                                        ${event.description}
                                    </p>
                                    <div class="d-flex gap-4 align-items-center" style="width: 100%; height: 20%;">
                                        <p class="p-0 m-0"><strong>Price:</strong>${event.price}$</p>
                                        <a href="./details.html" class="btn px-1" style=" background-color: #CBD6E8; color:#D00B5B;"><strong>View More</strong></a>
                                    </div>
                                </div>
                            </div>`
}