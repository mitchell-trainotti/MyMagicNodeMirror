async function initialize(){ //get Data and set values
	const cityAPI_url = '/citydata';
	const response2 = await fetch (cityAPI_url);
	cityJson = await response2.json();
	console.log(cityJson);

	let container = document.getElementById('bodyText');
	
	function makeRadioButton(text, name, value, container) {

		let label = document.createElement("label");
		let radio = document.createElement("input");
		let br = document.createElement('br');
		radio.type = "radio";
		radio.name = name;
		radio.value = value;

		label.className = "Letters";
		label.id = value;
		label.appendChild(document.createTextNode(text));
		
		container.appendChild(radio);
		container.appendChild(label);
		container.appendChild(br);
	  }

	for(let i = 0; i < cityJson.data.length; i++) {
		let tempCity = cityJson.data[i];
		makeRadioButton(tempCity.name, 'cities', tempCity._id, container)
	}

	document.getElementById('submitDisplay').onclick = async function(){
		let cityID = document.querySelector('input[name="cities"]:checked').value;
		// let cityName = document.querySelector('id=cityID').innerHTML;
		let cityName = document.getElementById(cityID).innerText;

		// var options = {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// };

		window.location.href = 'http://localhost:3000/custom/' + cityName;
	}


	document.getElementById('submitForm').onclick = async function(){
		console.log("submit form hit");
		let selectedId = document.querySelector('input[name="cities"]:checked').value;

		var name = document.getElementById('formName').value;
		var lat = document.getElementById('formLatitude').value;
		var lon = document.getElementById('formLongitude').value;

		let body = {
			name: name,
			lat: lat,
			lon: lon,
			id: selectedId
		};

		var options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		};
	
		const url = "http://localhost:3000/editCity";
		// console.log("post url call " + url);
	
		await fetch(url, options);
		//displayURL = "custom/"+ cityJson[apiCityLoc].name+ "," + cityJson[apiCityLoc].latitude + "," + cityJson[apiCityLoc].longitude;
		//location.href = displayURL;
		alert('New City Post has been requested');
		//console.log('name: ' + name + lat + lon);
		document.getElementById(selectedId).innerText = name;
	}
}

let cityJson = "";

initialize();