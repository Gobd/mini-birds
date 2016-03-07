"use strict";
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
//noinspection JSUnresolvedFunction
var mongojs = require('mongojs');
var db = mongojs('birds');
var port = 8080;
var collection = db.collection('sightings');
var app = express();
var ObjectID = require('mongodb').ObjectID;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/sighting', function (req, res) {
    collection.insert(req.body, function (err, resp) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(resp);
        }
    });

});

app.get('/api/sighting', function (req, res) {
    var name = req.query.name;
    collection.find({name: name}, function (err, resp) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(resp);
        }
    });

});

app.put('/api/sighting', function (req, res) {
    var id = req.query.id;
    collection.update({'_id' : ObjectID(id)}, {
        name: req.body.name,
        order: req.body.order,
        status: req.body.status
    }, function (err, resp) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(resp);
        }
    });

});

app.delete('/api/sighting', function (req, res) {
    var id = req.query.id;
    collection.remove({'_id' : ObjectID(id)}, function (err, resp) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(resp);
        }
    });

});

app.listen(port, function () {
    console.log('Listening on port: ' + port);
});
