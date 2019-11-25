window.addEventListener("load", () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temp-description");
	let temperatureDegree = document.querySelector(".temp-value");
	let locationTimezone = document.querySelector(".location-timezone");
	let temperatureSection = document.querySelector(".temperature-section");
	let temperatureUnit = document.querySelector(".temp-unit");

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition( position => {
			long = position.coords.longitude; 
			lat = position.coords.latitude; 

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/5a5a22dd687a061b01f6ecbc033c8615/${lat},${long}`;

			fetch(api)
			.then(response => {
				return response.json();
			})
			.then(response => {

				const {temperature, summary, icon} = response.currently;
				temperatureDegree.innerHTML = temperature;
				temperatureDescription.innerHTML = summary;
				locationTimezone.innerHTML = response.timezone;

				setIcons(icon, document.querySelector(".icon"));
			
				let celsius = (temperature - 32) * (5/9);

				temperatureSection.addEventListener("click", () => {
				if (temperatureUnit.innerHTML === "F") {
					temperatureUnit.innerHTML = "C";
					temperatureDegree.innerHTML = Math.floor(celsius);
				} else {
					temperatureDegree.innerHTML = temperature;
					temperatureUnit.innerHTML = "F";
					}
				});
			})
		});
	};

	function setIcons(icon, iconID) {
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	};
});