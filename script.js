async function getWeatherData(placeName) {
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

	getBgImage(weatherData.currentConditions.conditions);
}

async function getBgImage(weatherCondition) {
	const response = await fetch(
		`https://api.unsplash.com/search/photos?client_id=Z1yKHI4EcigNc15ysjM6RRwmfMDl3kDyEXtp_T-zEBg&page=1&per_page=1&orientation=landscape&query=${weatherCondition}-weather`,
		{ method: "GET", mode: "cors" }
	);
	const imageData = await response.json();

	const bodyElem = document.querySelector("body");
	const imageUrl = imageData.results[0].urls.raw;
	bodyElem.style.backgroundImage = `url(${imageUrl})`;
}

let placeName = "Jaipur";
getWeatherData(placeName);

const weatherForm = document.querySelector("form");
weatherForm.addEventListener("click", (e) => {
	e.preventDefault();
	const input = document.querySelector("input");
	placeName = input.value;

	getWeatherData(placeName);
});
