let recommendations = {
    countries: [],
    temples: [],
    beaches: []
};

async function fetchRecommendations() {
    try {
        const response = await fetch('travel_recommendation.json');
        const data = await response.json();
        recommendations = data; // Store the fetched data in the recommendations variable
        console.log(recommendations); // Check if data is fetched correctly
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchRecommendations();

function executeSearch(e) {
    // e.preventDefault(); // Prevent the form from
    const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
    const resultsContainer = document.querySelector('.results');

    resultsContainer.innerHTML = ''; // Clear previous results

    // Fetch results based on keyword
    const countryResults = recommendations.countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm)
    );

    const templeResults = recommendations.temples.filter(temple =>
        temple.name.toLowerCase().includes(searchTerm)
    );

    const beachResults = recommendations.beaches.filter(beach =>
        beach.name.toLowerCase().includes(searchTerm)
    );

    // Display the results
    if (countryResults.length > 0 || templeResults.length > 0 || beachResults.length > 0) {
        displayResults(countryResults, templeResults, beachResults);
    } else {
        resultsContainer.innerHTML = '<p>No recommendations found.</p>';
    }

    // return false;
}

function displayResults(countries, temples, beaches) {
    const resultsContainer = document.querySelector('.results');

    // Display country results
    countries.forEach(country => {
        country.cities.forEach(city => {
            resultsContainer.innerHTML += `
                <div class="recommendation">
                    <h3>${city.name}</h3>
                    <img src="./images/${city.imageUrl}" alt="${city.name}">
                    <p>${city.description}</p>
                </div>
            `;
        });
    });

    // Display temple results
    temples.forEach(temple => {
        resultsContainer.innerHTML += `
            <div class="recommendation">
                <h3>${temple.name}</h3>
                <img src="./images/${temple.imageUrl}" alt="${temple.name}">
                <p>${temple.description}</p>
            </div>
        `;
    });

    // Display beach results
    beaches.forEach(beach => {
        resultsContainer.innerHTML += `
            <div class="recommendation">
                <h3>${beach.name}</h3>
                <img src="./images/${beach.imageUrl}" alt="${beach.name}">
                <p>${beach.description}</p>
            </div>
        `;
    });
}

function clearResults() {
    document.querySelector('.search-bar input').value = '';
    document.querySelector('.results').innerHTML = ''; // Clear displayed results
    console.log('Results cleared');
}
