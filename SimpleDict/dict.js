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

router.get('/dictionary', (req, res, next)=>{
    var word = req.query['word'];
    res.send(dict[word]);
    console.log(dict[word]);
});

router.get('/suggestion', (req, res, next)=>{
    var word = req.query['word'];
    var hints = '<ul>';
    
    for(key in dict){
        if((key+'').startsWith(word)){
            // hints += '<li><a href='+'http://localhost:3000/dictionary?word='+key+'>'+key+'</a></li>';
            hints += '<li><a href='+'./dictionary?word='+key+'>'+key+'</a></li>';
            
        }
        
        // res.send(dict[word]);
    }
    
    hints += "</ul>";
    res.send(hints);
});

module.exports = router;