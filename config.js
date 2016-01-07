var config = {}

config.host = process.env.HOST || "https://cloudshootout.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "4OxOlgLyQ5J4iLe7M5SkkBNDQbhANvbtbikK6qxBmQ9FnLX+8kweo2DyUB4UjYCTpONLELwybuyxrHa4QU24PQ==";
config.databaseId = "ToDoList";
config.collectionId = "Items";

config.mongoPort = 27017
config.mongoHost = 'localhost'

module.exports = config;