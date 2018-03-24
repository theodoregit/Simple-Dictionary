var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');

router.use(express.static(path.join(__dirname, 'public')));
router.use(bodyParser.json());

var fs = require("fs");
var dict;
fs.readFile("words.json", "utf8", function(err, data){
    dict = JSON.parse(data.trim());
});
router.get('/dictionary', function(req, res){
    var word = req.query['word']; 
    res.send(dict[word]);
});
router.get('/edit', (req, res, next)=>{
    var word = req.query['word'];
    var meaning = req.query['meaning'];    
    for(key in dict){
        if(key !== word){
            dict[word] = meaning;
            fs.writeFileSync('./words.json',JSON.stringify(dict));
        }
    }
    res.type('text/html');
    res.sendfile('./public/' + 'edit.html');
});

router.get('/add', (req, res, next)=>{
    var word = req.query['word'];
    var meaning = req.query['meaning'];
    for(key in dict){
        if(key !== word){
            dict[word] = meaning;
            fs.writeFileSync('./words.json',JSON.stringify(dict));
            // res.send("The word and its meaning is added succesfully! " + word);
        }
    }
    res.type('text/html');
    res.sendfile('./public/' + 'add.html');    
});

module.exports = router;