async function setBgImgByWeatherCondition(weatherCondition) {
	const unsplashUrl = `https://api.unsplash.com/search/photos?client_id=Z1yKHI4EcigNc15ysjM6RRwmfMDl3kDyEXtp_T-zEBg&page=1&per_page=1&orientation=landscape&query=${weatherCondition}-weather`;
	const response = await fetch(unsplashUrl, { method: "GET", mode: "cors" });
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

async function fetchWeatherData(placeName) {
	const loaderElement = document.querySelector(".loader-wrapper");
	loaderElement.classList.add("display");

	const visualCrossingUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${placeName}?unitGroup=metric&key=JPPTP2Z7DMHG2KAFAX5B7745S&contentType=json`;
	const response = await fetch(visualCrossingUrl, {
		method: "GET",
		mode: "cors",
	});

	const weatherData = await response.json();

	const placeElem = document.querySelector("#placeName");
	const tempElem = document.querySelector("#temp");
	const weatherConditionElem = document.querySelector("#weatherCondition");

	placeElem.textContent = weatherData.address;
	tempElem.textContent = weatherData.currentConditions.temp;
	weatherConditionElem.textContent = weatherData.currentConditions.conditions;

	setBgImgByWeatherCondition(weatherConditionElem.textContent);
}

function searchWeather(e) {
	e.preventDefault();
	const inputElem = document.querySelector("input");
	const placeName = inputElem.value;
	inputElem.value = "";

	fetchWeatherData(placeName);
}

const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", searchWeather);

// Show weather for Jaipur
fetchWeatherData("Jaipur");
