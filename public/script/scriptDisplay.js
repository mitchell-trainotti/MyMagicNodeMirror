async function initialize(){ //set values
	json = await getJSON();
	//Time text update
	offset = json.offset; //offset indicates the offset in time from London
	setTime();

	//Temperature text update
	document.getElementById('Temperature_Text').innerHTML = getTemperature(json.currently.temperature);

	//Sunrise text update
	var sunsetSec = (json.daily.data[0].sunsetTime+offset*3600)%86400; //adding offset hours (from London) in seconds, and then removing the day
	var sunriseSec = (json.daily.data[0].sunriseTime+offset*3600)%86400;
	sunTimes = getSun(sunriseSec, sunsetSec);
	document.getElementById('Sunrise_Text').innerHTML = sunTimes[0];
	document.getElementById('Sunset_Text').innerHTML = sunTimes[1];

	//Lowhi text update
	var TemperatureLow = json.hourly.data[0].temperature;
	var TemperatureHi = json.hourly.data[0].temperature;
	var TemperatureData = json.hourly.data;

	//When the API returns the Hi's and Low's they are not updated throughout the day. If the high for the day is 80 degrees that occurs at 11AM and it is now 1PM, the high will still read 80 degrees.  This for loop is used to compare the temperature to what the predicted output for the next 10 hours to get a better indicator for the high and low for the forseeable future.
	
	document.getElementById('LowHi_Text').innerHTML = getLowHi(TemperatureLow, TemperatureHi, TemperatureData);

	//Update UV Index text
	document.getElementById('UV_Index_Text').innerHTML = ("UV Index Peak = " + json.daily.data[0].uvIndex);
	
	//Update Rain Chance text
	var RainChance = json.daily.data[0].precipProbability * 100;
	document.getElementById('Rain_Chance_Text').innerHTML = getRainChance(RainChance);
	
	//Update Summary text
	document.getElementById('Daily_Summary_Text').innerHTML = json.daily.data[0].summary;

	//Update Weather text
	var weather = json.currently.summary;
	document.getElementById('Weather_Text').innerHTML = titleCase(weather);

	//Update Image
	var imgIcon = json.currently.icon;
	document.getElementById('Weather_Image').src = getImage(imgIcon);
}

async function getJSON(){
	console.log("new things: " + window.location.search);
	var options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	};

	const cityurl = "http://localhost:3000/citydata";
	// console.log("post url call " + url);

	const cityresponse = await fetch(cityurl, options);
	const cityjson = await cityresponse.json();
	windowURL = window.location.href;
	slashPos = windowURL.lastIndexOf("/");
	cityName = windowURL.slice(slashPos+1);
	cityName = cityName.replace("%20", " ");
	console.log("slashPos in " + windowURL + " is " + slashPos);
	console.log("city name: " + cityName);
	
	for (i = 0; i<cityjson.data.length; i++){
		console.log("for loop");
		cityCompare = cityjson.data[i].name;
		if (cityName == cityCompare){
			cityLat = cityjson.data[i].latitude;
			cityLon = cityjson.data[i].longitude;
			coordinates = cityLat + ',' + cityLon;
			break;
		}

	}


	var options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	};

	const url = "http://localhost:3000/weatherdata/" + coordinates;
	// console.log("post url call " + url);
	console.log("url request: " + url);
	const response = await fetch(url, options);
	const json = await response.json();
	return json;
}

function setTime(){

	//Day text update
	document.getElementById('Day_Text').innerHTML = getDay();
	//Date text update
	document.getElementById('Date_Text').innerHTML = getDate();
	//Time text update
	document.getElementById('Time_Text').innerHTML = getTime();

}

function getImage(imgIcon){

	//I updated the images in the folder to be the how the weather is descriped in the API.
	//I simply make the path be dependant on the description.
	var path = "/staticFiles/assets/"+imgIcon+".png";
	
	//We return the path so we can update our image.
	return path;
}

function titleCase(str) {
   //Title case is used to change the output from all lowercase to a more appealing look of capitalizing the first letter of each word. Eg. titlecase(it iS ClOudY) => It Is Cloudy
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
	   // You do not need to check if i is larger than splitStr length, as your for does that for you sssign it back to the array
	   splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   // Directly return the joined string
   return splitStr.join(' '); 
}

function getRainChance(RainChance){
	RainChance = Math.round(RainChance);
	article = 'a';
	
	//I need to update the phrase just incase the article is incorrect. For example: 'There is a 8% change of percipitation', needs to update its article to 'an'.
	if (((RainChance == 8) || (RainChance == 11) || (RainChance == 18)) || ((RainChance>=80)&&(RainChance<90))){
			article = 'an';
	}	
	
	RainChance = "There is " + article + " " + RainChance + "%" + " chance of Precipitation";
	return RainChance;
}

function getDay(){
	
	var date = new Date();
	var weekday = new Array(7);
	weekday[0] =  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";
	
	var day = weekday[date.getDay()];
	
	return day;	
}

function getDate(){
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth();
	var day = today.getDate();
		switch (month){
			case 0:
				month = "January";
			break;
	
			case 1:
				month = "February";
			break;
	
			case 2:
				month = "March";
			break;
	
			case 3:
				month = "April";
			break;
			
			case 4:
				month = "May";
			break;
	
			case 5:
				month = "June";
			break;
	
			case 6:
				month = "July";
			break;
	
			case 7:
				month = "August";
			break;
	
			case 8:
				month = "September";
			break;
	
			case 9:
				month = "October";
			break;
	
			case 10:
				month = "November";
			break;
	
			case 11:
				month = "December";
			break;
		}
			
//Adding suffix to day
	var j = day % 10,
	k = day % 100;
	if (j == 1 && k != 11) {
		day = day + "st";
	}
	else if (j == 2 && k != 12) {
		day = day + "nd";
	}
	else if (j == 3 && k != 13) {
		day = day + "rd";
	}
	else day = day + "th";
	//end of suffix adding
var fullDate = (month + " " + day + ", " + year); 
return fullDate;
}

function getLowHi(TemperatureLow, TemperatureHi, TemperatureData){	

	for(i = 0; i<=9; i++){
		NewTemperature = TemperatureData[i].temperature;
		
			if (TemperatureHi < NewTemperature){
				TemperatureHi = NewTemperature;}
			
			if (TemperatureLow > NewTemperature){
				TemperatureLow = NewTemperature;}
	
	}

	TemperatureHi = Math.round(TemperatureHi);
	TemperatureLow = Math.round(TemperatureLow);

	//adding arrows below.
	var Prediction_Text = (TemperatureLow + "&#8457"+ "&#8681" + " " + TemperatureHi + "&#8457" + "&#8679");
	
return Prediction_Text;
}

function getSun(sunriseSec, sunsetSec){

	var today = new Date();
	var hour = today.getHours();
	var minutes = today.getMinutes();
	var time = hour + minutes/60;
	
	sunsetHour = Math.floor(sunsetSec/3600);
	sunsetMin = (sunsetSec - sunsetHour*3600)/60;
	
	sunsetHour = sunsetHour - 12; //the sunset is always in the PM so we can remove the military easier
	sunsetMin = addZero(sunsetMin);
	
	sunsetText = ("Sunset is at " + sunsetHour + ":" + sunsetMin + " P.M.");

	sunriseHour = Math.floor(sunriseSec/3600);
	sunriseMin = (sunriseSec - sunriseHour*3600)/60;
	
	sunriseMin = addZero(sunriseMin);
	
	sunriseText = ("Sunrise is at " + sunriseHour + ":" + sunriseMin + " A.M.");
	
	return [sunriseText, sunsetText];
}

function getTime(){
	var today = new Date();
	var msTime = today.getTime();
    minutes = Math.floor((msTime / (1000 * 60)) % 60);
    hours = Math.floor((msTime / (1000 * 60 * 60)) % 24) + offset;
	var suffix = 'P.M.';
  if(hours<0){
	  hours = hours +24;
  }

  if (hours < 12){
	  suffix = 'A.M.'
  }

  hours = removeMilitary(hours);
  minutes = (minutes < 10) ? "0" + minutes : minutes;

  var fullTime = hours + ":" + minutes + " " + suffix;
	return fullTime;
}

function addZero(number){
	if (number<10){
		number = "0" + number;
	}
return number;
}

function removeMilitary(hour){ //This function can be removed if desired by user.
	if (hour > 0 && hour <= 12) {
		hour = "" + hour;
	} else if (hour > 12) {
		hour = "" + (hour - 12);
	} else if (hour == 0) {
		hour= "12";
	}
	return hour;
}

function getTemperature(temp){
	Temperature = Math.round(temp);
	Temperature = (Temperature + '&#8457');
return Temperature;
}

var offset = 0;
initialize();
setInterval(setTime, 1000);
setInterval(initialize, 60000*15);


document.getElementById('submit1').onclick = function(){
	displayURL ="/";
	location.href = displayURL;
};


window.onload = function() {
	console.log("window has been loaded");
	document.getElementById('cover').hidden = true;
};