const path = require('path');

module.exports = {
  config: path.resolve('./banco/config/config.js'),  
  'models-path': path.resolve('./banco/models'),  
  'migrations-path': path.resolve('./banco/migrations'), 
  'seeders-path': path.resolve('./banco/seeders'),  
};
