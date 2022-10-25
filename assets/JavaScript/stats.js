const table1 = document.getElementById('table1')
const table2 = document.getElementById('table2')
const table3 = document.getElementById('table3')

async function apiEvents(){
    try{
        var api = await (await fetch('https://mh-amazing.herokuapp.com/amazing')).json()
    }
    catch(error){
        console.log(error)
    }
    let allEvents = api.events
    let pastEvents = api.events.filter(event => event.assistance)
    let upcomingEvents = api.events.filter(event => event.estimate)


    allEvents.map(event => {
        event.percentageAssistance = 100 * event.assistance / event.capacity
        event.revenue = event.price * event.assistance
    })
    pastEvents.map(event => {
        event.percentageAssistance = 100 * event.assistance / event.capacity
        event.revenue = parseInt(event.price) * parseInt (event.assistance)
    })

    upcomingEvents.map(event => {
        event.percentageAssistance = 100 * event.estimate / event.capacity
        event.revenue = parseInt(event.price) * parseInt (event.estimate)
    })


    let capEvents = [...allEvents].sort((a,b) => a.capacity - b.capacity)
    let maxCapEvent = capEvents[capEvents.length-1]


    let percAssisEvent = [...pastEvents].sort((a,b) => a.percentageAssistance - b.percentageAssistance)
    let minPercAssi = percAssisEvent[0]
    let maxPercAssi = percAssisEvent[percAssisEvent.length-1]



    let allCategory = [...new Set (allEvents.map(event => event.category))]
    let upcomingCategory = [...new Set (upcomingEvents.map(event => event.category))]

    allCategory.forEach(element => {
        let capacity = 0
        let assistance = 0
        let revenues = 0
        pastEvents.forEach(event => {
            if(event.category === element){
                capacity += event.capacity
                assistance += event.assistance
                revenues += event.revenue
            }
        })
        table3.innerHTML += `<tr>
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
            }
        })
        table2.innerHTML += `<tr>
                                <td>${element}</td>
                                <td>${revenues.toLocaleString('de-DE')}</td>
                                <td>${Math.round(estimate * 100 / capacity)}%</td>
                            </tr>`
                        });
                        
        table1.innerHTML += `<tr>
                                <td>${maxPercAssi.name}: ${Math.round(maxPercAssi.percentageAssistance)}%</td>
                                <td>${minPercAssi.name}: ${Math.round(minPercAssi.percentageAssistance)}%</td>
                                <td>${maxCapEvent.name}: ${parseInt(maxCapEvent.capacity).toLocaleString('de-DE')}</td>
                            </tr>`
}
apiEvents()

    