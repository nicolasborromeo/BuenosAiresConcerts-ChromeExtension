

async function fetchData() {
    const url = 'https://concerts-artists-events-tracker.p.rapidapi.com/location?name=Buenos%20Aires&minDate=2024-05-01&maxDate=2024-05-08&page=1';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '162533e4d2msh959ff92e11ad278p1cf2e6jsnd8daccf28035',
            'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
        }
    };

    try {
        document.getElementById('tableHeader').hidden = true

        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data);
        let dataArray = result.data
        
        const tableBody = document.getElementById('tableBody');

        // Clear any existing content in the table body

        // tableBody.innerHTML = '';
        document.getElementById('loading').style.display = 'none'
        document.getElementById('tableHeader').hidden = false
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

    } catch (error) {
        console.error(error);
    }
}

fetchData()
