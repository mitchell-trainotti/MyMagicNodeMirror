async function initialize(){ //get Data and set values

	cityAPI_url = '/citydata';
	const response2 = await fetch (cityAPI_url);
	const cityJson = await response2.json();
	city1 = cityJson[0];
	console.log("this is city 1: " + city1.name);
	console.log(cityJson[0].name);
	document.getElementById('city1').value = "butthole";

	document.getElementById('city1Label').innerHTML = cityJson[0].name;
	document.getElementById('city2Label').innerHTML = cityJson[1].name;
	document.getElementById('city3Label').innerHTML = cityJson[2].name;
	document.getElementById('city4Label').innerHTML = cityJson[3].name;
	document.getElementById('city5Label').innerHTML = cityJson[4].name;

}
initialize();