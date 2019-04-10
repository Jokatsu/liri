require('dotenv').config();
var Spotify = require("node-spotify-api");

var spotify = new Spotify({
    id: process.env.clientID,
    secret: process.env.clientSecret
});

var moment = require("moment");
var axios = require("axios");
var fs = require("fs");

//-----------------------------FUNCTION TO RUN------------------------------


function functionPicker()









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
                console.log(data.tracks.items)
                for (var i = 0; i < outputs.length; i++) {
                    // console.log(i);
                    console.log("song name: " + outputs[i].name);
                    console.log("Artists: " + outputs[i].artists[0].name);
                    console.log("preview song: " + outputs[i].preview_url);
                    console.log("album: " + outputs[i].album.name);
                    console.log("-----------------------------------");
                }
            }
        );
}
//----------------------------------------------------------------------------





