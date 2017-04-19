'use strict';

class SkinnyProgressBar {
    constructor(options){
        this.options = options || {};

        this.options.el = this.options.el ? this.options.el : "body";
        this.options.color = this.options.color ? this.options.color : "#01579B";

        this.model = {
            el: this.options.el,
            value: 0,
            options: this.options
        };

        this.progressBar = $("<div id='skinny-progress-bar'></div>");
        this.progressBar.css({
            "z-index": "99999",
            "height": "3px",
            "width": "0",
            "background-color": this.options.color,
            "opacity": "1",
            "border-top-right-radius": "4px",
            "border-bottom-right-radius": "4px",
            "transition": "width 200ms, opacity 500ms"
        });

        if (this.model.el == "body")
            $(this.model.el).prepend(this.progressBar);
        else
            $(this.model.el).append(this.progressBar);
    }

    load(value) {
        this.model.value = value;
        this.progressBar.css("width", this.model.value + "%");

        if (this.model.value == 100)
            this.reset();
    }

    reset() {
        this.model.value = 0;

        var self = this;
        setTimeout(() => {
            self.progressBar.css("opacity", 0);
            setTimeout(() => {
                self.progressBar.css("width", self.model.value + "%");
                setTimeout(() => {
                    self.progressBar.css("opacity", 1);
                }, 200);
            }, 500);
        }, 200);
    }
}

module.exports = SkinnyProgressBar;
