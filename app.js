var express = require("express");
var bodyParser = require("body-parser");

var SpacecraftRouter = require("./Routers/SpacecraftRouter.js");

var app = express();

// app.use("/Spacecraft", SpacecraftRouter);

var port = process.env.PORT || 8888;


app.use(bodyParser.json());

app.post("/", function (req, res) {
    console.log("Incoming...");
    console.log(req.body);
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});
