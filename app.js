const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    const city = req.body.cityname;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f797ab8846093ca1ce0dc243e4e1c504&units=metric";
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherdata = JSON.parse(data);
            console.log(weatherdata);
            const temp = weatherdata.main.temp
            console.log(temp);
            const description = weatherdata.weather[0].description
            res.write("<p>the weather is currently " + description + "</p>");
            res.write("<p>the temperature in " + city + " is " + temp + " degree celcius</p>");
            res.send();
        })
    })
})

app.listen(3000, function() {
    console.log("server started at port 3000");
})