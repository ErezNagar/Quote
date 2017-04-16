"use strict";
var Quote = require("./quote");

class CommandParser {
    // /quote "{quote}" by {author} [: quote context]

    constructor() {
        this.delimiters = Quote.ParserDelimiters;

        this.parseContext = function(text){
            if (text.indexOf(":") == -1)
                return null;

            if ((text = text.split(this.delimiters.CONTEXT)).length != 2)
                return null;

            return text[1].trim();
        };

        this.parseAuther = function(text, prefix){
            text = text.replace('"' + prefix + '"', "")
                       .split(this.delimiters.CONTEXT)[0]
                       .replace(this.delimiters.AUTHOR, this.delimiters.AUTHOR.toLowerCase());

            if (text.indexOf(this.delimiters.AUTHOR.toLowerCase()) == -1)
                return null;

            let author = text.replace(this.delimiters.AUTHOR.toLowerCase(), "");
            if (author.length == 0)
                return null;

            return author.trim();
        };

        this.getQuote = function(command){
            console.log("command:");
            console.log(command);

            console.log("command.replace(/[^/']/g, ''):");
            console.log(command.replace(/[^/"]/g, ""));

            if (command.replace(/[^/"]/g, "").length != 2)
                return null;

            let quote = command.split(this.delimiters.QUOTE);

            console.log("quote:");
            console.log(quote);

            quote.shift();

            console.log("quote.shift():");
            console.log(quote);

            if (quote[0].length == 0)
                return null;

            return quote[0].replace('"', ' ');
        };
    }

    parse(command) {
        let quote, author, context = "";

        if (!(quote = this.getQuote(command)))
            return null;

        if (!(author = this.parseAuther(command, quote)))
            return null;

        if (command.indexOf(":") != -1){
            if ( !(context = this.parseContext(command)) )
                return null;
        }

        return {
            quote: quote,
            author: author,
            context: context
        }
    }
}

module.exports = CommandParser;
