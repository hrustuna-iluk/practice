var config = require('../config');
var simpledb = require('mongoose-simpledb');

var DbConnection = function (callback) {
    var dbParams = {
        connectionString: [config.dbHost, config.dbName].join('/'),
        modelsDir: config.modelsDir,
        autoIncrementNumberIds: true
    };
    simpledb.init(dbParams, callback);
};

module.exports = DbConnection;
