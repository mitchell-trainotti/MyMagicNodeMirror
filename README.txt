Hello, and welcome to my version of the Magic Mirror a program I have created from scatch.  At this time (5/12/2020) our vanilla javascript function has been updated to be hosted on a local node server, through our app.js file.  I have created a proxy on this server to pull API information to get around the CORS error! :) At this time I haven't hidden my API key so I ask that you don't abuse it, so the program can function (I only get 1000 calls a day).  I hope you enjoy!

To finish setting up the project (after running npm install) create a .env file in the main folder.  In this file create 2 variables API_KEY and DB_URL.  Darksky is no longer accepting new accounts, feel free to request my API key and I will send it right over. The DB_URL should link to a mongoDB with documents in the format of {name: String, latitude: String, longitude: String}.

As always feel free to reach out for anything at all at mitchell.trainotti@gmail.com.

Thanks for reading, enjoy!