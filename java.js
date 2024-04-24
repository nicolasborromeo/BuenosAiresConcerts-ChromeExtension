
function startApp() {

    let tableHeader = document.getElementById('tableHeader')
    tableHeader.hidden = true

    let welcomeMsg = document.createElement('div')
    welcomeMsg.setAttribute('id', 'welcome-msg')
    welcomeMsg.style.padding = '15px'
    welcomeMsg.style.textAlign = 'center'
    welcomeMsg.innerText = 'Welcome to the Concert Tracker App. Select a date and location!'
    document.getElementById('table').appendChild(welcomeMsg)

}

function listenForClick() {
    document.querySelector('.button').addEventListener('click', async (e) => {
        console.log('BUTTON CLICKED')

        //hide welcome-msg and table header
        document.getElementById('welcome-msg').hidden = true
        document.getElementById('tableHeader').hidden = true

        cleanTable()
        load()

        e.preventDefault() //so it doesn't reload the page everytime

        //LISTEN FOR DATES AND LOCATION
        let minDate = document.querySelector('input[id="from-date"]').value
        let maxDate = document.querySelector('input[id="to-date"]').value
        let location = document.getElementById('location').value
        //parse for url
        let userInput = `name=${location.replace(' ', '%20')}&minDate=${minDate}&maxDate=${maxDate}`

        //set fetch parameters
        const url = `https://concerts-artists-events-tracker.p.rapidapi.com/location?${userInput}&page=1`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '162533e4d2msh959ff92e11ad278p1cf2e6jsnd8daccf28035',
                'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
            }
        }

        //DO THE FETCH
        let response = await fetch(url, options)
        let result = await response.json()

        //POPULATE WITH DATA
        cleanTable()
        populateData(result)
    })
}

function load() {
    let tableBody = document.getElementById('tableBody')
    console.log('tableClean', tableBody)
    let loading = document.createElement('div')
    loading.style.textAlign = 'center'
    loading.style.display = 'flex'
    loading.style.justifyContent = 'center'
    loading.innerText = 'Loading...'
    loading.setAttribute('id', 'loading')
    tableBody.appendChild(loading)

}

function cleanTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''
}

function populateData(result) {


    document.getElementById('tableHeader').hidden = false

    let dataArray = result.data

    const tableBody = document.getElementById('tableBody');
    console.log(tableBody)
    // Add a row for each concert
    dataArray.forEach(el => {
        // Create a new row
        const row = document.createElement('tr');

        // Populate the row with concert information
        const date = el.startDate.split("T")[0]
        const dateShort = date.split('24-')[1]
        row.innerHTML = `
        <td>${dateShort}</td>
        <td>${el.name}</td>
        <td>${el.location.name}</td>
    `;

        // Append the row to the table body
        tableBody.appendChild(row);
    });

}


window.onload = () => {
    startApp()
    listenForClick()
}
