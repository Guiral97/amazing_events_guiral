const contCardDetail = document.getElementById('cont_card_details')


async function apiEvents(){
    try{
        var api = await (await fetch('https://mh-amazing.herokuapp.com/amazing')).json()
    }
    catch(error){
        console.log(error)
    }
    let allEvents = api.events
    let idLocation = location.search.slice(4)
    let filterById = allEvents.find(event => event.id == idLocation)

    doEventDetail(filterById)

}
apiEvents()

function doEventDetail(event){
    date = new Date(event.date).toDateString();
    let aOrE = []
    if(event.assistance !== undefined){
        aOrE =["Assitance", event.assistance]
    }else{
        aOrE =["Estimate", event.estimate]
    }
    contCardDetail.innerHTML =
        `<div class="cont_img">
            <img src="${event.image}" alt="${event.name}">
        </div>
        <article>
            <h2>${event.name}</h2>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Description:</strong> ${event.description}</p>
            <p><strong>Category:</strong> ${event.category}</p>
            <p><strong>Place:</strong> ${event.place}</p>
            <p><strong>Capacity:</strong> ${event.capacity}</p>
            <p><strong>${aOrE[0]}:</strong> ${aOrE[1]}</p>
            <p><strong>Price:</strong> ${event.price}$</p> 
        </article>`
}