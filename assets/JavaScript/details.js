const contCardDetail = document.getElementById('cont_card_details')


let allEvents = events.events


let idLocation = location.search.slice(4)

let filterById = allEvents.filter(event => event._id == idLocation)
filterById = filterById[0]

doEventDetail(filterById)

function doEventDetail(event){
    contCardDetail.innerHTML = 
    `<div class="cont_img">
            <img src="${event.image}" alt="${event.name}">
        </div>
        <article>
            <h2>${event.name}</h2>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Description:</strong> ${event.description}</p>
            <p><strong>Category:</strong> ${event.category}</p>
            <p><strong>Place:</strong> ${event.place}</p>
            <p><strong>Capacity:</strong> ${event.capacity}</p>
            <p><strong>Assistance:</strong> ${event.assistance}</p>
            <p><strong>Price:</strong> ${event.price}$</p> 
        </article>`
}




