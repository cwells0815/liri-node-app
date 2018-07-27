require("dotenv").config();



// Packages and Modules
var spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys");
var fs = require('fs');


//Global variables
var spotify = new spotify(keys.spotify);


var nodeArgument = process.argv;
var pickCase = process.argv[2];
var inputText = "";

for (var i = 3; i < nodeArgument.length; i++) {
    if ((i > 3) && (i < nodeArgument.length)) {
        inputText = inputText + "+" + nodeArgument[i];
    } else {
        inputText = inputText + nodeArgument[i];
    }
}
//This will be the switch statement that trigured certain functions upon our call
switch (pickCase) {
    case "spotify-this-song":
        if (inputText) {
            music(inputText);
        } else {
            music("Headstone")
        };

        break;

    case "movie-this":
        if (inputText) {
            omdb(inputText);
        } else {
            omdb('Mr. Nobody')
        };

        break;

    case "do-what-it-says":
        doIt();

        break;
};

function music(song) {
    spotify.search({
        type: "track",
        query: song
    }, function (error, data) {
        if(!error) {
            for (var i = 0; i < data.tracks.items.length; i++){
                var songData = data.tracks.items[i];
                console.log("---------------------------------");
                console.log("Track Name: " + songData.name);
                console.log("Artist: " + songData.artists[0].name);
                console.log("Album: " + songData.album.name);
                console.log("URL: " + songData.preview_url);
                console.log("---------------------------------");

                //This will be apart of the bonus
                log("---------------------------------");
                log("Track Name: " + songdata.name);
                log("Artist: " + songdata.artists[0].name);
                log("Album: " + songdata.album.name);
                log("URL: " + songdata.preview_url);
                log("---------------------------------");
            }
        
        }
});
}

function omdb(movieName) {
    // Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors:  " + JSON.parse(body).Actors);

            //BONUS add movie to log.txt
            log("Title: " + JSON.parse(body).Title);
            log("Release Year: " + JSON.parse(body).Year);
            log("IMDB Rating: " + JSON.parse(body).imdbRating);
            log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            log("Country: " + JSON.parse(body).Country);
            log("Language: " + JSON.parse(body).Language);
            log("Plot: " + JSON.parse(body).Plot);
            log("Actors: " + JSON.parse(body).Actors);  
  } else {
      console.log("ERROR!");
  }
  if (movieName === "Mr. Nobody") {
    console.log("-------------");
    console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>");
    console.log("It's on Netflix!");

    log("-------------");
    log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>");
    log("It's on Netflix!");
}
});
}

function doIt() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        // DO NOT PUT SPACES AROUND COMMA: random.txt has no spaces
        var txt = data.split(',');
        music(txt[1]);
    });
}

function log(logging){
    fs.appendFile('log.txt', logging, function(error){
        if(error){
            throw error;
        }
    });
}