async function initialize(){ //get Data and set values
	weaterAPI_url = '/weatherdata';
	const response = await fetch(weaterAPI_url);
	const json = await response.json();

	//Temperature text update
	document.getElementById('Temperature_Text').innerHTML = getTemperature(json.currently.temperature);

	//Sunrise text update
	var offset = json.offset; //offset indicates the offset in time from London
	var sunsetSec = (json.daily.data[0].sunsetTime+offset*3600)%86400; //adding 7 hours (from London) in seconds, and then removing the day
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

	var weather = json.currently.summary;
	document.getElementById('Weather_Text').innerHTML = titleCase(weather);
	document.getElementById('Weather_Image').src = getImage(weather, sunriseSec, sunsetSec);

}

function setTime(){
	document.getElementById('Time_Text').innerHTML = getTime();

	//Day text update
	document.getElementById('Day_Text').innerHTML = getDay();
	//Day text update
	document.getElementById('Date_Text').innerHTML = getDate();
}

function getImage(weather, sunriseSec, sunsetSec){

	//I updated the images in the folder to be the how the weather is descriped in the API.
	//I simply make the path be dependant on the description.
	var path = "staticFiles/assets/"+weather+".png";
	
	//We then must calculate the current time and see if it is past sunset time and sunrise time.
	var today = new Date();
	var hour = today.getHours();
	var minutes = today.getMinutes();
	var time = hour*3600 + minutes*60;
	
	//If our time is after sunset or before sunrise that means the sun is not out and our images
	//should contain the moon instead of the sun.  In the images file each weather condition has 2 files, one for day time
	//and one for night time.
	if(time>sunsetSec || time<sunriseSec){
		path = "staticFiles/assets/"+weather+" Night.png";
	}
	
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
	var hour = today.getHours();
	var minute = today.getMinutes();
			if (hour>=12){					//Adding endings
					suffix = "P.M.";}
			else{
					suffix = "A.M.";}
						
	minute = addZero(minute);		//Call addZero function, to add a zero in front of 1 digit times for formatting purposes
	hour = removeMilitary(hour);	//Call removeMilitary Function
				
	var fullTime = hour + ":" + minute + " " + suffix;	//Combine hour minute and the suffix

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

setTime();
initialize();
setInterval(setTime, 5000);
setInterval(initialize, 60000*15);