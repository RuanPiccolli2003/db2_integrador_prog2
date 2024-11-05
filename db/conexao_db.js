const sequellize = require('sequelize')



const sequelize =  new sequellize('restaurante','postgres','postgres', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432

})


sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
});


 module.exports = sequelize
