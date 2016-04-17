var express = require("express");
var bodyParser = require("body-parser");
const Firebase = require('firebase-client');
// const Firebase = require('firebase');
// var Firebase = require("Firebase");

var Definitions = require("./definitions");
var commandParser = require("./commandParser");
commandParser = new commandParser();

var app = express();
var port = process.env.PORT || 8888;

// var getCurrentDate = function(){
//     var today = new Date();
//     var dd = today.getDate();
//     var mm = today.getMonth() + 1;
//     var yyyy = today.getFullYear();
//
//     if (dd < 10)
//         dd = "0" + dd;
//
//     if (mm < 10)
//         mm = "0" + mm;
//
//     return mm + "/" + dd + "/" + yyyy;
// };


// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function (req, res) {
    console.log("Incoming slack quote...");
    if (req.body.token !== Definitions.Constants.APP_TOKEN){
        console.error(Definitions.Constants.COMMAND_ERROR);
        res.send(Definitions.Constants.COMMAND_ERROR + " " + Definitions.Constants.HELP);
        return;
    }

    //  route support, for example, adding user names, help

    var quoteData = commandParser.parse(req.body.text);
    quoteData.timestamp = Date.now(); //getCurrentDate();

    var firebase = new Firebase({
      url: "https://funnycss.firebaseio.com",
      auth: "LeTUNxwGc03CdCj61oh5cFKuRRnXu23ATbVuZjl8"
    });

    firebase.push("/quotes", quoteData).then(function(body){
        console.log(body);
        res.send("Quote saved.");
    }).fail( function(err){
        console.error("Data could not be saved." + err);
        res.send("Error saving quote. Please try again.");
    });

    // var quotesRef = new Firebase("https://funnycss.firebaseio.com/quotes");
    // quotesRef.push(quoteData, function(){
    //     if (error) {
            // console.error("Data could not be saved." + error);
            // res.send("Error saving quote. Please try again.");
            // return;
    //     }
    //
        // res.send("Quote saved.");
    // });
});

app.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});
