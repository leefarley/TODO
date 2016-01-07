var express = require('express');
var config = require('../config');
var async = require('async');
var router = express.Router();

// var DocumentDBClient = require('documentdb').DocumentClient;
// var DataRepo = require('../data/docDbData');
// var docDbClient = new DocumentDBClient(config.host, {
//   masterKey: config.authKey
// });
// var dataRepo = new DataRepo(docDbClient, config.databaseId, config.collectionId);
// dataRepo.init();

var DataRepo = require('../data/mongoDbData').mongoDbData;
var dataRepo = new DataRepo(config.mongoHost, config.mongoPort);

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