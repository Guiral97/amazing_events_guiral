const cont_card = document.getElementById('cont_card')

for(let event of events){
    pushEvent(event, cont_card)
}

function pushEvent(event,container){
    container.innerHTML += `
    <div class="card" style="width: 15rem; height: 24rem;">
    <img src="${event.image}" style="height: 30%; object-fit: cover; border-radius: 0.3rem 0.3rem 0 0 ;" alt="..." />
    <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">
            ${event.description}
        </p>
        <div class="d-flex gap-2" style="width: 100%;">
            <p>Price:${event.price}$</p>
            <a href="#" class="btn btn-primary">View More</a>
        </div>
    </div>
</div>
    `
}
// pushEvent(events[0],cont_card)











