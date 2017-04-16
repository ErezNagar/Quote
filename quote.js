var definitions = {
    SLACK_TOKEN: "CfGFJR2diL9ao8ERLcdQNHL7",
    // FIREBASE_TOKEN: "AIzaSyCNH-4sNfWmFLYbA-PXI3eeC467N9TEzQE",
    // FIREBASE_URL: "https://ledgex-quote.firebaseio.com/",
    FIREBASE_TOKEN: "AIzaSyAYSouII7Etq7cj07PECuGto4VwqeA_cro",
    FIREBASE_URL: "https://funnycss.firebaseio.com/",
}

var constants = {
    HELP: '/quote "{quote}" by {author}"',

    UNAUTHORIZED: "Unauthorized.",
    COMMAND_ERROR: "Hmmm, seems like the command is wrong.",
    SAVE_ERROR: "Error saving quote. Please try again.",

    SUCCESS: "All set. Quote saved successfuly."
}

var Quote = {
    Definitions: definitions,
    Constants: constants,
}

module.exports = Quote;
