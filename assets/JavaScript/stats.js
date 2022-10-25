const tabla3 = document.getElementById('tabla3')
const tabla2 = document.getElementById('tabla2')

async function apiEvents(){
    try{
        var api = await (await fetch('https://amazing-events.herokuapp.com/api/events')).json()
    }
    catch(error){
        console.log(error)
    }
    let allEvents = api.events
    let pastEvents = api.events.filter(event => event.assistance)
    let upcomingEvents = api.events.filter(event => event.estimate)

    console.log(upcomingEvents);

    allEvents.map(event => {
        event.percentageAssistance = 100 * event.assistance / event.capacity
        event.revenue = event.price * event.assistance
    })
    // console.log(allEvents);
    pastEvents.map(event => {
        event.percentageAssistance = 100 * event.assistance / event.capacity
        event.revenue = parseInt(event.price) * parseInt (event.assistance)
    })

    upcomingEvents.map(event => {
        event.percentageAssistance = 100 * event.estimate / event.capacity
        event.revenue = parseInt(event.price) * parseInt (event.estimate)
    })
    // console.log(upcomingEvents);




    let capEvents = [...allEvents].sort((a,b) => a.capacity - b.capacity)
    let maxCapEvent = capEvents[capEvents.length-1]
    // console.log(maxCapEvent);

    let percRevenEvent = [...pastEvents].sort((a,b) => a.revenue - b.revenue)
    // console.log(percRevenEvent);  
    let minPercRevenEvent = percRevenEvent[0]
    // console.log(minPercRevenEvent);
    let maxPercRevenEvent = percRevenEvent[percRevenEvent.length-1]
    // console.log(maxPercRevenEvent);


    let percAssisEvent = [...pastEvents].sort((a,b) => a.percentageAssistance - b.percentageAssistance)
    // console.log(percAssisEvent);
    let minPercAssi = percAssisEvent[0]
    // console.log(minPercAssi);
    let maxPercAssi = percAssisEvent[percAssisEvent.length-1]
    // console.log(maxPercAssi);


    let filterCategory = new Set(pastEvents.map(event => event.category))
    filterCategory = [...filterCategory]
    console.log(filterCategory);

    
    let dateCategory = [...new Set (allEvents.map(event => event.category))]
    let upcomingCategory = [...new Set (upcomingEvents.map(event => event.category))]
    // console.log(dateCategory);

    dateCategory.forEach(element => {
        let capacity = 0
        let assistance = 0
        let revenues = 0
        pastEvents.forEach(event => {
            if(event.category === element){
                capacity += event.capacity
                assistance += event.assistance
                revenues += event.revenue
                // console.log(revenues);
            }
        })
        // console.log("hola");
        tabla3.innerHTML += `<tr>
                                <td>${element}</td>
                                <td>${revenues.toLocaleString('de-DE')}</td>
                                <td>${Math.round(assistance * 100 / capacity)}%</td>
                            </tr>`
    });


    upcomingCategory.forEach(element => {
        let capacity = 0
        let estimate = 0
        let revenues = 0
        upcomingEvents.forEach(event => {
            if(event.category === element){
                capacity += event.capacity
                estimate += event.estimate
                revenues += event.revenue
                // console.log(revenues);
            }
        })
        // console.log("hola");
        tabla2.innerHTML += `<tr>
                                <td>${element}</td>
                                <td>${revenues.toLocaleString('de-DE')}</td>
                                <td>${Math.round(estimate * 100 / capacity)}%</td>
                            </tr>`
    });
}
apiEvents()

    