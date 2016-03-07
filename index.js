var express=require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('birds');
var port = 8080;
var collection = db.collection('sightings');
var app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/sighting', function(req, res, next){
    console.log(req.body);
    res.status(200).json('post');
});

app.get('/api/sighting', function(req, res, next){
    console.log(req.body);
    res.status(200).json('get');
});

app.put('/api/sighting', function(req, res, next){
    console.log(req.body);
    res.status(200).json('put');
});

app.delete('/api/sighting', function(req, res, next){
    console.log(req.body);
    res.status(200).json('del');
});

app.listen(port, function(){
    console.log('Listening on port: ' + port);
});
