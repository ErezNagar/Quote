var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// app.use("/Spacecraft", SpacecraftRouter);

var port = process.env.PORT || 8888;


app.use(bodyParser.json());

app.post("/", function (req, res) {
    console.log("Incoming...");
    console.log(req);
    console.log(req.body);
    console.log(req.body.token);
    console.log(req.body.command);
    console.log(req.body.text);
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});
