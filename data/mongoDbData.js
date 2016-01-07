var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var mongoDbData = function(host, port) {
  this.db= new Db('ToDoList', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};

mongoDbData.prototype.getCollection= function(callback) {
  this.db.collection('Items', function(error, employee_collection) {
    if( error ) callback(error);
    else callback(null, employee_collection);
  });
};

//find all employees
mongoDbData.prototype.findAll = function(callback) {
    this.getCollection(function(error, employee_collection) {
      if( error ) callback(error)
      else {
        employee_collection.find({'complete' : false }).toArray(function(error, results) {
          if( error ) callback(error)
          else {
              var items = results.map(function(item) { return { id: item._id.toHexString(), name: item.name, info: item.info }});
              callback(null, items)
          }
        });
      }
    });
};

//save new item
mongoDbData.prototype.save = function(item, callback) {
    this.getCollection(function(error, employee_collection) {
      if( error ) callback(error)
      else {
          item.complete = false;
        employee_collection.insert(item, function() {
          callback(null, item);
        });
      }
    });
};

// find a item
mongoDbData.prototype.findById = function(id, callback) {
    this.getCollection(function(error, employee_collection) {
      if( error ) callback(error)
      else {
        employee_collection.findOne({_id: ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

// update an item
mongoDbData.prototype.complete = function(id, item, callback) {
    item.complete = true;
    this.getCollection(function(error, collection) {
      if( error ) callback(error);
      else {
        collection.update(
            {_id: ObjectID.createFromHexString(id)},
            item,
            function(error, item) {
                    if(error) callback(error);
                    else callback(null, item)       
            });
      }
    });
};

exports.mongoDbData = mongoDbData;