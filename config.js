var path = require('path');

var config = {
  dbHost: 'mongodb://localhost',
  dbName: 'practice',
  modelsDir: path.join(__dirname, 'server', 'dbmodels'),
  templatesDir: path.join(__dirname, 'public'),
  port: 3000
};

module.exports = config;