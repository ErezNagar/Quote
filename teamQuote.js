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

class QuoteCard extends React.Component {
    timestampToDate(timestamp) {
        var date = new Date(timestamp);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();

        if (dd < 10)
            dd = "0" + dd;

        if (mm < 10)
            mm = "0" + mm;

        return mm + "/" + dd + "/" + yyyy;
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 m10 l12">
                    <div className="card white">
                        <div className="card-content" style={{backgroundImage: "linear-gradient(45deg," + this.props.bgColor1 + " , " +this.props. bgColor2 + ")"}}>
                            <div className="card-title">
                                <i className="fa fa-quote-left"></i>
                                <div className="body">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>

                        <div className="card-action card-footer">
                            <cite>{this.props.author}</cite>
                            <span className="timestamp">
                                {this.timestampToDate(this.props.timestamp)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class QuoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            page: 0,
            endOfData: false
        };
    }

    componentDidMount() {
        this.loader = new SkinnyProgressBar({
            el: ".loader",
            color: "#11839b"
        });

        this.fetch();

        var page = $(document);
        $(window).scroll(() => {
            if (this.state.endOfData)
                return;

            if (page.scrollTop() + $(document.body).height() >= page.height())
                this.fetch();
        }.bind(this));
    }

    // Views
    renderEndOfDataView(){
        return (
            <div className="endOfData">
                You&#39;ve seen it all.
            </div>
        );
    }

    renderQuoteView(quoteKey, quote){
        return (
            <QuoteCard key={quoteKey} author={quote.author} timestamp={quote.timestamp} bgColor1={quote.bgColor1} bgColor2={quote.bgColor2}>
                {quote.quote}
            </QuoteCard>
        );
    }

    render() {
        if (this.state.endOfData)
            return (
                <div>
                    <div className="quote-list">{this.state.quotes}</div>
                    {this.renderEndOfDataView()}
                </div>
            );

        return (
            <div className="quote-list">{this.state.quotes}</div>
        );
    }

    // Utils
    fetch() {
        this.loader.load(10);
        var fetchSize = this.props.pageSize * (this.state.page + 1);

        firebase.database().ref("/quotes").limitToLast(fetchSize).once("value").then(data => {
            this.loader.load(20);
            var dataCount = data.numChildren()

            if (this.state.quotes.length === dataCount){
                this.loader.load(100);
                this.setState({endOfData: true});
                return;
            }

            data = data.val();
            if (data == null){
                this.loader.load(100);
                console.log("error");
                return;
            }

            this.addQuotes(data, dataCount);
        }.bind(this));
    }

    addQuotes(data, dataCount){
        var i = 0,
            page = this.state.page + 1,
            newQuotes = [];

        // Order quotes from newest to oldest
        var newQuotesCount = (dataCount % this.props.pageSize) || this.props.pageSize;
        for (var quoteKey in data){
            if (i == newQuotesCount)
                break;

            this.loader.load(((i / newQuotesCount) * 100 / 80));

            data[quoteKey].bgColor1 = this.props.quoteColors[Math.floor(Math.random() * colors.length)];
            data[quoteKey].bgColor2 = this.props.quoteColors[Math.floor(Math.random() * colors.length)];

            newQuotes.unshift(this.renderQuoteView(quoteKey, data[quoteKey]));
            i++;
        }

        var quotes = this.state.quotes;
        quotes.push(...newQuotes);

        this.setState({quotes: quotes, page: page++});
        this.loader.load(100);
    }
}

QuoteList.propTypes = {
    pageSize: React.PropTypes.number.isRequired,
    quoteColors: React.PropTypes.array.isRequired,
};

var colors = ["#b71c1c", "#c62828", "#d32f2f", "#e53935", "#d81b60",
              "#c2185b", "#ad1457", "#880e4f", "#8e24aa", "#7b1fa2",
              "#6a1b9a", "#4a148c"];
ReactDOM.render(<QuoteList pageSize={10} quoteColors={colors} />, document.getElementById("quote-app"));
