const cont_card = document.getElementById('cont_card')
const title = document.getElementById('title')
const todayDate = events.currentDate   


const card = [...events.events].map (doEvent => doEvent)
const allEvents = card.filter(()=> title.text.includes('Home')).forEach(doEvent)
const pastEvents = card.filter(()=> title.text.includes('Past')).filter ((card) => card.date < todayDate).forEach(doEvent)
const futureEvents = card.filter(() => title.text.includes('Upcoming')).filter ((card) => card.date > todayDate).forEach(doEvent)

function doEvent(event){
        cont_card.innerHTML += `
            <div class="card" style="width: 15rem; height: 24rem;">
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
            </div>
            `
} 