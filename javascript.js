require('dotenv').config();
var Spotify = require("node-spotify-api");
var keys = require("./keys")
var spotify = new Spotify(keys.spotify);
var inquirer = require("inquirer");
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");

//-----------------------------FUNCTION TO RUN------------------------------


function functionPicker() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What Program Do You Want To Run?",
                choices: ["spotifySearch", "OMDB", "DoWhatItSays", "getMyBands", "Exit"],
                name: "program"

            }
        ])
        .then(function (response) {
            switch (response.program) {
                case "spotifySearch":
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                message: "What Do You Want To Find?",
                                name: "search"
                            }
                        ]).then(function (response) {
                            spotifySearch(response.search);
                        })

                    break;

                case "OMDB":
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                message: "What Do You Want To Find?",
                                name: "search"
                            }
                        ]).then(function (response) {
                            OMDB(response.search);
                        })
                    break;
                case "DoWhatItSays":
                    doWhatItSays();
                    break;

                case "getMyBands":
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                message: "What Do You Want To Find?",
                                name: "search"
                            }
                        ]).then(function (response) {
                            getMyBands(response.search);
                        })
                    break;



                case "Exit":
                    console.log("You have exited LIRI")
                    break;
            }
        });
}

function pick(pick) {
    console.log(pick);
    switch (pick) {
        case "spotifySearch":
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What Do You Want To Find?",
                        name: "search"
                    }
                ]).then(function (response) {
                    spotifySearch(response.search);
                })

            break;

        case "OMDB":
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What Do You Want To Find?",
                        name: "search"
                    }
                ]).then(function (response) {
                    OMDB(response.search);
                })
            break;
    }

}


// --------------------------------SPOTIFY----------------------------------

function spotifySearch(songName) {
    spotify
        .search(
            {
                type: "track",
                query: songName,
            },
            function (err, data) {
                if (err) {
                    console.log(err);
                    return;

                }
                var outputs = data.tracks.items;
                for (var i = 0; i < outputs.length; i++) {
                    console.log("\n--------------------------------------");
                    console.log("song name: " + outputs[i].name);
                    console.log("Artists: " + outputs[i].artists[0].name);
                    console.log("preview song: " + outputs[i].preview_url);
                    console.log("album: " + outputs[i].album.name);
                    console.log("--------------------------------------\n");
                }
            }

        );
    setTimeout(function () { functionPicker() }, 2000);
}
//------------------------------------OMDB---------------------------------

function OMDB(movieName) {

    axios({
        method: 'get',
        url: "http://www.omdbapi.com/?apikey=trilogy&t=" + movieName,

    }).then(function (response) {

        var data = response.data;
        console.log("\n--------------------------------------");

        console.log("\nTitle: " + data.Title);

        console.log("Released: " + data.Released);
        console.log("Rating: " + data.Rated);
        console.log("Genre: " + data.Genre);
        console.log("Actors: " + data.Actors);
        console.log("Plot: " + data.Plot);
        console.log("--------------------------------------\n");
        setTimeout(function () { functionPicker() }, 2000);

    }).catch(function (error) {
        console.log(error);
        console.log("Movie Not Found!!");
        functionPicker();
        return;
    });



}
//----------------------------------Do what it says---------------------------------
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        }
        pick(data);
    })
}

//---------------------------------------------------------------------------------

//--------------------------------------Get my bands--------------------------------

function getMyBands(artistName) {
    axios({
        method: 'get',
        url: "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp",
    }).then(function (response) {
        console.log(response.data);

        console.log("Upcoming concerts for " + artistName + ":");
        var data = response.data;
        for (var i = 0; i < data.length; i++) {
console.log(`           The Venue is at: ${data[i].venue.name}\nThe region and country it is located in: ${data[i].venue.city}, ${data[i].venue.country}
            The show takes place on: ${moment(data[i].datetime).format("MM/DD/YYYY")}
----------------------------------------------------------------------------------------------------`);
        }
    })
    setTimeout(function () { functionPicker() }, 2000);
}

//----------------------------------------------------------------------


functionPicker();



