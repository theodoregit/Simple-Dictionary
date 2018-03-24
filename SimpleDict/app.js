var express = require('express');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var path = require('path');
var signup = require('./signup.js');
var editing = require('./editing');
var dict = require('./dict');
var app = express();

// MongoClient.connect('link-to-mongodb', (err, database) => {

// });


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
var fs = require('fs');
var dict;
fs.readFile("users.json", "utf8", function(err, data){
    dict = JSON.parse(data.trim());
});

app.get('/', function(req, res){
    
});
app.post('/dict/dictionary', (req, res) => {
    var un = req.body['username'];
    var pw = req.body['password'];
    for(key in dict){
        
        if(key == un && dict[key] == pw){
            res.type('text/html');
            res.sendfile('./public/' + 'dict.html');
            console.log("valid");

        }
        else{
            // res.redirect('/');
            // console.log("error");
            // res.sendFile('./public/' + 'index.html');
        }
    }
    
});


app.use('/signup', signup);
app.use('/editing', editing);
app.use('/dict', dict);
app.listen(9000, ()=>{
    // console.log(__dirname);
});
















