var definitions = {
    SLACK_TOKEN: "CfGFJR2diL9ao8ERLcdQNHL7",
    FIREBASE_TOKEN: "LeTUNxwGc03CdCj61oh5cFKuRRnXu23ATbVuZjl8",
    FIREBASE_URL: "https://funnycss.firebaseio.com",
}

var constants = {
    HELP: '/quote "{quote}" by {author} [: quote context]"',

    UNAUTHORIZED: "Unauthorized.",
    COMMAND_ERROR: "Hmmm, seems like the command is wrong.",
    SAVE_ERROR: "Error saving quote. Please try again.",

    SUCCESS: "All set. Quote saved successfuly."
}

// var constants = require("./constants");
var parserDelimiters = require("./parserDelimiters");

var Quote = {
    Definitions: definitions,
    Constants: constants,
    ParserDelimiters: parserDelimiters
}

module.exports = Quote;
