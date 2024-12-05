const path = require('path');

module.exports = {
  config: path.resolve('./banco/config/config.js'),  // Caminho para seu arquivo de configuração
  'models-path': path.resolve('./banco/models'),  // Caminho para seus models
  'migrations-path': path.resolve('./banco/migrations'),  // Caminho para as migrações
  'seeders-path': path.resolve('./banco/seeders'),  // Caminho para os seeders
};
