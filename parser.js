"use strict";

var delimiters = {
    QUOTE: '"',
    AUTHOR: " By ",
}

class Parser {
    constructor() {
        this.getQuote = function(command){
            if (command.replace(/[^/"]/g, "").length !== 2)
                return null;

            let quote = command.split(delimiters.QUOTE);
            if (quote.length !== 3)
                return null;

            quote.shift();

            if (quote[0].length === 0)
                return null;

            return quote[0];
        };

        this.getAuther = function(command){
            command = command.replace(delimiters.AUTHOR, delimiters.AUTHOR.toLowerCase());

            if (command.indexOf(delimiters.AUTHOR.toLowerCase()) === -1)
                return null;

            let author = command.replace(delimiters.AUTHOR.toLowerCase(), "");
            if (author.length == 0)
                return null;

            return author.trim();
        };
    }

    parseCommand(command) {
        let quote, author;

        if (!(quote = this.getQuote(command)))
            return null;

        if (!(author = this.getAuther(command.replace('"' + quote + '"', ""))))
            return null;

        return {
            quote: quote,
            author: author,
        }
    }
}

module.exports = Parser;
