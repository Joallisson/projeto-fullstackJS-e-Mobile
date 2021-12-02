const express = require('express'); //Armazena o express na variável, o express é responsável pelas requisições e respostas
const router = express.Router(); //A função router é a responsável por capturar as rotas que chegam na API

const TaskController = require('../controller/TaskController'); //pegando o controller TaskController
const TaskValidation = require('../middleware/TaskValidation');
const MacaddressValidation = require('../middleware/MacaddressValidation');

router.post('/', TaskValidation, TaskController.create); //CRIAR    //Se a requisição feita pelo usuário for do tipo post na rota "/", então a API vai criar uma nova tarefa
router.put('/:id', TaskValidation, TaskController.update); //ATUALIZAR    //Se a requisição usar o método put e passar o id 
router.get('/filter/all', MacaddressValidation, TaskController.all) //lISTAR
router.get('/:id', TaskController.show); //Escolher pessoa uma a ser mostrada
module.exports = router; //exportando a rota de criação de tarefas