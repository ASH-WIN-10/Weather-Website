async function getBgImage(weatherCondition) {
	const response = await fetch(
		`https://api.unsplash.com/search/photos?client_id=Z1yKHI4EcigNc15ysjM6RRwmfMDl3kDyEXtp_T-zEBg&page=1&per_page=1&orientation=landscape&query=${weatherCondition}-weather`,
		{ method: "GET", mode: "cors" }
	);
	const imageData = await response.json();

	const bodyElem = document.querySelector("body");
	const imageUrl = imageData.results[0].urls.full;

	const image = new Image();
	image.src = imageUrl;
	image.addEventListener("load", () => {
		bodyElem.style.backgroundImage = `url(${imageUrl})`;
		// Hide the loader
		const loader = document.querySelector(".loader-wrapper");
		loader.classList.remove("display");
	});
}

async function getWeatherData(placeName) {
	const loader = document.querySelector(".loader-wrapper");
	loader.classList.add("display");

	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${placeName}?unitGroup=metric&key=JPPTP2Z7DMHG2KAFAX5B7745S&contentType=json`,
		{ method: "GET", mode: "cors" }
	);
	const weatherData = await response.json();

	const place = document.querySelector("#placeName");
	const temp = document.querySelector("#temp");
	const weatherCondition = document.querySelector("#weatherCondition");
	place.textContent = weatherData.address;
	temp.textContent = weatherData.currentConditions.temp;
	weatherCondition.textContent = weatherData.currentConditions.conditions;

	getBgImage(weatherCondition.textContent);
}

function searchWeather(e) {
	e.preventDefault();
	const input = document.querySelector("input");
	const placeName = input.value;
	input.value = "";

	getWeatherData(placeName);
}

const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", searchWeather);

// Show weather for Jaipur
getWeatherData("Jaipur");
