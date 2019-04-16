require("dotenv").config();

var keys = require("./key.js");
var fs = require("fs");
var axios = require("axios");
var request = require("request");

var moment = require('moment');
    moment().format();

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var switchCase = process.argv[2];
//var inputTitle = process.argv[3];

var nodeArgs = process.argv;
var inputTitle = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      inputTitle = inputTitle + " " + nodeArgs[i];
      //console.log(inputTitle)
    }
    else {
      inputTitle += nodeArgs[i];
  
    }
  }

console.log("hello")
console.log(inputTitle + '\n' + '\n')

mainCase(switchCase, inputTitle);

function mainCase(switchCase, inputTitle) {
    switch (switchCase) {
        case 'concert-this':
            concertFun(inputTitle);
            break;
        case 'spotify-this-song':
            songFun(inputTitle);
            break;
        case 'movie-this':
            movieFun(inputTitle);
            break;
        case 'do-what-it-says':
            someFun();
            break;
        default:
            console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

function concertFun(inputTitle) {
    
    var URL = "https://rest.bandsintown.com/artists/" + inputTitle + "/events?app_id=codingbootcamp";
    //console.log(URL);
    
    axios.get(URL).then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var date = (response.data[i].datetime).slice(0, -9);
                var nDate = moment(date).format("MM/DD/YYYY")
                console.log(i);
                console.log("**********EVENT INFO*********");
                console.log("Venue: " + response.data[i].venue.name);
                console.log("City: " + response.data[i].venue.city);
                console.log("Date: " + nDate);
                console.log("*****************************\n\n");
            }
        });
}


function songFun(inputTitle) {
    
    spotify.search(
        {
            type: "track",
            query: inputTitle
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            //console.log(data)
            var songs = data.tracks.items;
            // var songs1 = data.tracks.items.external_urls;
            // console.log(songs1)


            for (var i = 0; i < 5; i++) {
                console.log(i);
                console.log("**********SONG INFO*********");
                console.log("Song name: " + songs[i].name);
                console.log("Link to Song: " + songs[i].external_urls.spotify);
                console.log("Album: " + songs[i].album.name);
                console.log("Artist(s): " + songs[i].artists[0].name);
                console.log("*****************************\n\n");
            }
        }
    );
};

function movieFun(inputTitle) {
    if (inputTitle === "") {
        inputTitle = "Mr. Nobody"
        console.log("-----------------------");      
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
        
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + inputTitle + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            //console.log(response)
            console.log("**********MOVIE INFO*********"); 
            console.log("Title: " + response.data.Title);  
            console.log("Release Year: " + response.data.Year);   
            console.log("IMDB Rating: " + response.data.imdbRating);  
            console.log("Country of Production: " + response.data.Country); 
            console.log("Language: " + response.data.Language);               
            console.log("Plot: " + response.data.Plot);             
            console.log("Actors: " + response.data.Actors);               
            console.log("*****************************");               
        }
    );
} 

function someFun() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        mainCase(dataArr[0], dataArr[1]);
    });
}