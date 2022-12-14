// DOM
const cont_card = document.getElementById('cont_card')
const title = document.getElementById('title')
const contCheck = document.getElementById('cont_check')
const inputSearch = document.getElementById('search_fild')

async function apiEvents(){
    try{
        var api = await (await fetch('https://63bec0a6f5cfc0949b601cc9.mockapi.io/mindhub/amazing-events')).json()
    }
    catch(error){
        console.log(error)
    }
        const todayDate = "2022-01-01"        
        const card = api
        
        // PAGE FILTER
        const homeEvents = card.filter(() => title.text.includes('Home'))
        const pastEvents = card.filter(() => title.text.includes('Past')).filter(card => card.date < todayDate)
        const futureEvents = card.filter(() => title.text.includes('Upcoming')).filter(card => card.date > todayDate)

        // GET ALL EVENTS
        let allCards = [...homeEvents, ...futureEvents, ...pastEvents]
        allCards.forEach(doEvent)

        // GET N FILTER CATEGORIES
        const filterCategory = new Set(card.map(event => event.category)).forEach(doCategories)

        // GET INPUT CHECK ARRAY N EVENT
        let checkBoxes = Array.from(document.querySelectorAll('.form-check-input'))
        checkBoxes.forEach(check => check.addEventListener('click', crossFilter))

        inputSearch.addEventListener('input', crossFilter)

        // CROSS FILTER N PUSH HTML
        function crossFilter() {
            let filteredCategory = checkEvents(allCards)
            let filteredSearch = filterSearch(filteredCategory, inputSearch.value)
            if (filteredSearch.length !== 0) {
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
        
        
    } 
    apiEvents()
    
function filterSearch(array, text) {
    let cardsFilterSearch = array.filter(event => event.name.toLowerCase().includes(text.toLowerCase()))
    if (cardsFilterSearch.length === 0) {
        dontFound()
        return []
    }
    return cardsFilterSearch
}

function doCategories(category) {
    contCheck.innerHTML += `<div class="form-check checks">
                                <label class="form-check-label text-light">
                                    ${category}
                                <input class="form-check-input" type="checkbox" value="${category}" id="${category}"/>
                                </label>
                            </div>`
}

function dontFound(){
    cont_card.innerHTML =  `<div class="cont_df_img">
                                <h2 class="text-light">Event dont found</h2>
                                <img src="https://i.gifer.com/XSNt.gif" alt="" class="img-fluid" id="dont_found_img">
                            </div>`
}

function doEvent(event) {
    cont_card.innerHTML += `<div class="card">
                                <img src=" ${event.image}" alt="..." />
                                <div class="card_text">
                                    <h3 class="card-title" style="height: 25%;"> ${event.name}</h3>
                                    <p class="card-text" style="height: 50%;">
                                        ${event.description}
                                    </p>
                                    <div class="d-flex justify-content-around align-items-center" style="width: 100%; height: 20%;">
                                        <p class="p-0 m-0"><strong>Price:</strong> ${event.price}$</p>
                                        <a href="./details.html?id=${event._id}" type="submit" class="btn px-1"  style=" background-color: #CBD6E8; color:#D00B5B;"><strong>View More</strong></a>
                                    </div>
                                </div>
                            </div>`
}