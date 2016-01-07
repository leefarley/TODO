var express = require('express');
var DocumentDBClient = require('documentdb').DocumentClient;

var config = require('../config');
var async = require('async');
var router = express.Router();


var DataRepo = require('../data/docDbData');
//var DataRepo = require('../data/mongoDbData').mongoDbData;

var docDbClient = new DocumentDBClient(config.host, {
   masterKey: config.authKey
});

var dataRepo = new DataRepo(docDbClient, config.databaseId, config.collectionId);
dataRepo.init();
//var dataRepo = new DataRepo('localhost', 27017);

/* GET home page. */
router.get('/api/things', function(req, res, next) {
  dataRepo.findAll(function (err, data) {
      res.status(200).json(data)
  });
});

/* POST add item. */
router.post('/api/things', function(req, res, next) {
  dataRepo.save(req.body, function() {
      res.status(201).json();
  })
});

/* PUT complete item. */
 router.put('/api/things/complete/:id', function (req, res, next) {
     dataRepo.findById(req.params.id, function(err, item) {
        dataRepo.complete(req.params.id, item, function() {
            res.status(204).json();
        });
     });
 })

module.exports = router;