const express = require('express'); //Armazena o express na variável, o express é responsável pelas requisições e respostas
const router = express.Router(); //A função router é a responsável por capturar as rotas que chegam na API
const TaskController = require('../controller/TaskController'); //pegando o controller TaskController

router.post('/', TaskController.create); //Se a requisição feita pelo usuário for do tipo post na rota "/", então a API vai criar uma nova tarefa

module.exports = router; //exportando a rota de criação de tarefas