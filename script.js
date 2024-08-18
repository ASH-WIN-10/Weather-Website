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
}

let placeName = "Jaipur";
// getWeatherData(placeName);

const weatherForm = document.querySelector("form");
weatherForm.addEventListener("click", (e) => {
	e.preventDefault();
	const input = document.querySelector("input");
	placeName = input.value;

	getWeatherData(placeName);
});
