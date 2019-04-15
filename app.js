var express = require("express");
var app = express();
var request = require("request");
var moment = require("moment");

app.locals.moment = require("moment");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));  //serving the "public" file directory, to access the CSS stylesheet

app.get("/", function(req, res){
    res.render("home");
});

app.get("/nextlaunch", function(req, res){
    request('https://api.spacexdata.com/v3/launches/next', function (error, response, body) {
        if(!error && response.statusCode == 200){
        var parsedData = JSON.parse(body);
        var flightNumber = (parsedData.flight_number);
        var rocketType = (parsedData.rocket.rocket_name);
        var launchDate = (moment(parsedData.launch_date_utc).format("dddd, MMMM Do YYYY, h:mm:ss a"));
        var missionName = (parsedData.mission_name);
        var missionDetails = (parsedData.details);
        var launchSite = (parsedData.launch_site.site_name_long);
        res.render("nextlaunch", {flightNumber: flightNumber, rocketType: rocketType, launchDate: launchDate, missionName: missionName, missionDetails: missionDetails, launchSite: launchSite});
        }
    });
});

app.get("/latestlaunch", function(req, res){
    request('https://api.spacexdata.com/v3/launches/latest', function (error, response, body) {
        if(!error && response.statusCode == 200){
        var parsedData = JSON.parse(body);
        var flightNumber = (parsedData.flight_number);
        var rocketType = (parsedData.rocket.rocket_name);
        var launchDate = (moment(parsedData.launch_date_utc).format("dddd, MMMM Do YYYY, h:mm:ss a"));
        var missionName = (parsedData.mission_name);
        var missionDetails = (parsedData.details);
        var launchSite = (parsedData.launch_site.site_name_long);
        res.render("latestlaunch", {flightNumber: flightNumber, rocketType: rocketType, launchDate: launchDate, missionName: missionName, missionDetails: missionDetails, launchSite: launchSite});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is up and running");
});