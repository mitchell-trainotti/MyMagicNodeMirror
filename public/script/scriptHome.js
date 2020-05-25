async function initialize(){ //get Data and set values

	cityAPI_url = '/citydata';
	const response2 = await fetch (cityAPI_url);
	const cityJson = await response2.json();

	document.getElementById('city1Label').innerHTML = cityJson[0].name;
	document.getElementById('city2Label').innerHTML = cityJson[1].name;
	document.getElementById('city3Label').innerHTML = cityJson[2].name;
	document.getElementById('city4Label').innerHTML = cityJson[3].name;
	document.getElementById('city5Label').innerHTML = cityJson[4].name;

	document.getElementById('submit1').onclick = function(){
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
}
initialize();