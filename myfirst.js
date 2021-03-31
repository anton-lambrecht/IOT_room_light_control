const express = require("express");
//var Gpio = require('onoff').Gpio;
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express(); // start an epxpress app
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//var light1 = new Gpio(26, 'out');
//var light2 = new Gpio(19, 'out');
//var light3 = new Gpio(13, 'out');

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/light1', (req, res) =>{

    //light1.writeSync(1);
    console.log(Date().toString() + ":\tlight 1 toggle");
    res.json("Finished");
    //light1.writeSync(0);

});

app.get('/light2', (req, res) =>{
    //light2.writeSync(1);
    console.log(Date().toString() + ":\tlight 2 toggle");
    res.json("Finished");
    //light2.writeSync(0);
});

app.get('/light3', (req, res) =>{
    //light3.writeSync(1);
    console.log(Date().toString() + ":\tlight 3 toggle");
    res.json("Finished");
    //light3.writeSync(0);
});

app.get('/lightStorage', (req, res) =>{
    let data = fs.readFileSync("./Lights.json");
    res.json(JSON.parse(data));
});

app.post('/lightStorage', (req, res) => {
    fs.writeFile("Lights.json", JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
        console.log('data > Lights.json');
    });
    res.json("upload completed");
});

app.get('*', (req, res) =>{
    res.json("Page not found maaan");
});


app.listen(8000, () => {
    console.log("app is running");
});