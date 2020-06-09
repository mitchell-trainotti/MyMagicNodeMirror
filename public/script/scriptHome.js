async function initialize(){ //get Data and set values

	cityAPI_url = '/citydata';
	const response2 = await fetch (cityAPI_url);
	const cityJson = await response2.json();

	document.getElementById('city1Label').innerHTML = cityJson[0].name;
	document.getElementById('city2Label').innerHTML = cityJson[1].name;
	document.getElementById('city3Label').innerHTML = cityJson[2].name;
	document.getElementById('city4Label').innerHTML = cityJson[3].name;
	document.getElementById('city5Label').innerHTML = cityJson[4].name;

	document.getElementById('submitDisplay').onclick = function(){
		if(document.getElementById('city1').checked) {
			apiCityLoc = 0;
		}else if(document.getElementById('city2').checked) {
			apiCityLoc = 1;
		}else if(document.getElementById('city3').checked) {
			apiCityLoc = 2;
		}else if(document.getElementById('city4').checked) {
			apiCityLoc = 3;
		}else if(document.getElementById('city5').checked) {
			apiCityLoc = 4;
		}
		displayURL = "custom/"+ cityJson[apiCityLoc].name+ "," + cityJson[apiCityLoc].latitude + "," + cityJson[apiCityLoc].longitude;
		location.href = displayURL;

	}


	document.getElementById('submitForm').onclick = async function(){

		var name = document.getElementById('formName').value;
		var lat = document.getElementById('formLatitude').value;
		var lon = document.getElementById('formLongitude').value;


		var urlCall = name+','+lat+','+lon;
		console.log(urlCall);
	
		var req = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
		};
	
		const url = "http://localhost:3000/api/" + urlCall;
		console.log("post url call " + url);
	
		await fetch(url, req);
		//displayURL = "custom/"+ cityJson[apiCityLoc].name+ "," + cityJson[apiCityLoc].latitude + "," + cityJson[apiCityLoc].longitude;
		//location.href = displayURL;
		alert('New City Post has been requested');
		//console.log('name: ' + name + lat + lon);
	}
}

	
initialize();