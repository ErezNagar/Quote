var express = require("express");
var bodyParser = require("body-parser");
var Firebase = require("firebase-client");
var Quote = require("./quote");
var commandParser = require("./commandParser");

var quoteStore = new Firebase({
    url: Quote.Definitions.FIREBASE_URL,
    auth: Quote.Definitions.FIREBASE_TOKEN
});

commandParser = new commandParser();

var QuoteApp = express();

// QuoteApp.use(bodyParser.json());
QuoteApp.use(bodyParser.urlencoded({ extended: true }));

QuoteApp.post("/", function (req, res) {
    if (req.body.token !== Quote.Definitions.SLACK_TOKEN){
        console.error(Quote.Constants.UNAUTHORIZED);
        res.send(Quote.Constants.UNAUTHORIZED);
        return;
    }

    var quote = commandParser.parse(req.body.text);
    if (!quote){
        console.error(Quote.Constants.COMMAND_ERROR);
        res.send(Quote.Constants.COMMAND_ERROR + " " + Quote.Constants.HELP);
        return;
    }

    quote.timestamp = Date.now(); //getCurrentDate();

    quoteStore.push("/quotes", quote)
        .then(function(body){
            res.send(Quote.Constants.SUCCESS);
        }).fail( function(err){
            console.error("Data could not be saved. " + err);
            res.send(Quote.Constants.SAVE_ERROR);
        });
});

QuoteApp.listen(process.env.PORT || 8888, function () {
  console.log("Quote listening on port " + (process.env.PORT || 8888) + "...");
});
