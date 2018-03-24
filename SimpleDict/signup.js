var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

router.use(express.static(path.join(__dirname, 'public')));
router.use(bodyParser.json());

var fs = require('fs');
var dict;
fs.readFile("users.json", "utf8", function(err, data){
    dict = JSON.parse(data.trim());
});


router.get('/signup', (req, res, next)=>{
    res.type('text/html');
    res.sendfile('./public/' + 'signup.html');
});

router.post('/signup', (req, res) => {
    var un = req.body['username'];
    var pw = req.body['password'];
    var rpw = req.body['rePassword'];
    for(key in dict){
        
        for(key in dict){
            if(key !== un && pw == rpw){
                dict[un] = pw;
                fs.writeFileSync('./users.json',JSON.stringify(dict));                
                // res.redirect('/dict/dictionary');
                res.sendfile('./public/' + 'index.html');
            }
            else{
                res.redirect('/');
            }
        }
    }
    
});

module.exports = router;