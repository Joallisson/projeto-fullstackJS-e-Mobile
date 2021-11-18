const { Schema } = require('mongoose');
const moongose = require('../config/database.js'); //acessando o o arquivo de conexão com bd
const Schema = moongose.Schema; //Armazenado as informações do esquema do banco de dados em uma constante

const TaskSchema = new Schema({ //Criando o modelo que na verdade é um objeto para ir para a "tabela" do BD
    macaddress: {type: String, required: true},
    type: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    when: {type: Date, required: true},
    done: {type: Boolean, default: false},
    create: {type: Date, default: Date.now()}
});

module.exports = moongose.model('Task', TaskSchema); //exportando objeto que foi criado