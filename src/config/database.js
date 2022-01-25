const moongose = require('mongoose'); //módulo do NodeJS desenvolvido para conectar-se ao MongoDB
const url = 'mongodb://localhost:27017/todo'; //local onde está o banco de dados

moongose.connect(url, {useNewUrlParser: true}); //fazendo a conexão com o banco de dados

module.exports = moongose; //Devolver a constamte moongose já conectado com o BD