const bodyParser = require("body-parser");
const express = require("express")
const app = express();
const https = require("https");

app.get("/",(req,res)=>{
    //res.send("server is up");
    res.sendFile(__dirname + "/index.html")
})

app.use(bodyParser.urlencoded({extended: true}));

app.post("/",(req,res)=>{
    console.log(req.body.cityName);
    const query  = req.body.cityName
    const appKey = "b2afa86730dee65ab6acf1c98ce0e944"
    const unit = "metric"
    url="https://api.openweathermap.org/data/2.5/weather?units="+ unit +"&appid="+appKey+"&q="+query;
    https.get(url,(response)=>{
    response.on("data",(data)=>{
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDesc = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const url = "http://openweather.org/img/wn/"+icon+"@2x.png"
    res.set("Content-Type", "text/html");
    res.write("The weather is curently "+ weatherDesc);
    res.write("<h1>The temperature in "+ query +" is " + temp + " degree celcius.</h1>");
    res.write("<img src =" + url + ">");
    res.send();
  })
})

})



app.listen(3000,()=>{
  console.log("Server is running on port 3000");
})
