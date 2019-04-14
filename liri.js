require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var keys = require("./key.js");
var request = require("request");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var userOption = process.argv[2];
//var inputParameter = process.argv[3];

var nodeArgs = process.argv;
var inputParameter = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      inputParameter = inputParameter + " " + nodeArgs[i];
      //console.log(inputParameter)
    }
    else {
      inputParameter += nodeArgs[i];
  
    }
  }

console.log("hello")
console.log(inputParameter)

UserInputs(userOption, inputParameter);

function UserInputs(userOption, inputParameter) {
    switch (userOption) {
        case 'concert-this':
            showConcertInfo(inputParameter);
            break;
        case 'spotify-this-song':
            showSongInfo(inputParameter);
            break;
        case 'movie-this':
            showMovieInfo(inputParameter);
            break;
        case 'do-what-it-says':
            showSomeInfo();
            break;
        default:
            console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}


function showConcertInfo(inputParameter) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            //console.log(concerts)
            var res = inputParameter.toUpperCase();
            console.log("UPCOMING SHOWS FOR " + res + " ARE...")
            for (var i = 0; i < concerts.length; i++) {
                console.log(i);
                //fs.appendFileSync("log.txt", i+"\n"); 
                console.log("**********EVENT INFO*********");
                //fs.appendFileSync("log.txt", "**********EVENT INFO*********\n");//Append in log.txt file
                console.log("Name of the Venue: " + concerts[i].venue.name);
                //fs.appendFileSync("log.txt", "Name of the Venue: " + concerts[i].venue.name+"\n");
                console.log("Venue Location: " + concerts[i].venue.city);
                //fs.appendFileSync("log.txt", "Venue Location: " +  concerts[i].venue.city+"\n");
                console.log("Date of the Event: " + concerts[i].datetime);
                //fs.appendFileSync("log.txt", "Date of the Event: " +  concerts[i].datetime+"\n");
                console.log("*****************************");
                //fs.appendFileSync("log.txt", "*****************************"+"\n");
            }
        } else {
            console.log('Error occurred.');
        }
    });
}

function showSongInfo(inputParameter) {
    if (inputParameter === undefined) {
        inputParameter = "The Sign"; //default Song
    }
    spotify.search(
        {
            type: "track",
            query: inputParameter
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            //console.log(data)
            var songs = data.tracks.items;
            //console.log(songs)


            for (var i = 0; i < 5; i++) {
                console.log(i);
                //fs.appendFileSync("log.txt", i +"\n");
                console.log("**********SONG INFO*********");
                //fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
                console.log("Song name: " + songs[i].name);
                //fs.appendFileSync("log.txt", "song name: " + songs[i].name +"\n");
                console.log("Preview song: " + songs[i].preview_url);
                //fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url +"\n");
                console.log("Album: " + songs[i].album.name);
                //fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                console.log("Artist(s): " + songs[i].artists[0].name);
                //fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                console.log("*****************************");
                //fs.appendFileSync("log.txt", "*****************************\n");
            }
        }
    );
};


function showMovieInfo(inputParameter) {
    if (inputParameter === undefined) {
        inputParameter = "Mr. Nobody"
        console.log("-----------------------");
        //fs.appendFileSync("log.txt", "-----------------------\n");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        //fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" +"\n");
        console.log("It's on Netflix!");
        //fs.appendFileSync("log.txt", "It's on Netflix!\n");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + inputParameter + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            //console.log(response)
            console.log("**********MOVIE INFO*********"); 
                //fs.appendFileSync("log.txt", "**********MOVIE INFO*********");
            console.log("Title: " + response.data.Title);
                //fs.appendFileSync("log.txt", "Title: " + response.data.Title");
            console.log("Release Year: " + response.data.Year);
                //fs.appendFileSync("log.txt", "Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
                //fs.appendFileSync("log.txt", "IMDB Rating: " + response.data.imdbRating);
            console.log("Country of Production: " + response.data.Country);
                //fs.appendFileSync("log.txt", "Country of Production: " + response.data.Country);
            console.log("Language: " + response.data.Language);
                //fs.appendFileSync("log.txt", "Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
                //fs.appendFileSync("log.txt", "Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
                //fs.appendFileSync("log.txt", "Actors: " + response.data.Actors);
            console.log("*****************************");
                //fs.appendFileSync("log.txt", "*****************************");
        }
    );
} 

function showSomeInfo() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        UserInputs(dataArr[0], dataArr[1]);
    });
}
