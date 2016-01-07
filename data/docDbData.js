var DocumentDBClient = require('documentdb').DocumentClient;
var docdbUtils = require('./docDbUtils');

function TaskDao(documentDBClient, databaseId, collectionId, callback) {
    this.client = documentDBClient;
    this.databaseId = databaseId;
    this.collectionId = collectionId;
    this.database = null;
    this.collection = null;
}

module.exports = TaskDao;

TaskDao.prototype = {
    init: function () {
        var self = this;

        docdbUtils.getOrCreateDatabase(self.client, self.databaseId, function (err, db) {
            if (err) {
                callback(err);

            } else {
                self.database = db;
                docdbUtils.getOrCreateCollection(self.client, self.database._self, self.collectionId, function (err, coll) {
                    if (err) {
                        callback(err);

                    } else {
                        self.collection = coll;
                    }
                });
            }
        });
    },

    findAll: function (callback) {
        var self = this;
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.completed=@completed',
            parameters: [{
                name: '@completed',
                value: false
            }]
        };

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            } else {
                var items = results.map(function (r) { return { id: r.id, name: r.name, info: r.info } });
                callback(null, items);
            }
        });
    },

    save: function (item, callback) {
        var self = this;
        item.date = Date.now();
        item.completed = false;

        self.client.createDocument(self.collection._self, item, function (err, doc) {
            if (err) {
                callback(err);
            } else {
                callback(doc);
            }
        });
    },

    complete: function (itemId, document, callback) {
        var self = this;
        document.completed = true;
        self.client.replaceDocument(document._self, document, function (err, item) {
            if (err) {
                callback(err);
            } else {
                callback(item);
            }
        });
    },
    
    findById: function (itemId, callback) {
        var self = this;
        
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: itemId
            }]
        };

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            } else {
                callback(null, results[0]);
            }
        });
    }
};