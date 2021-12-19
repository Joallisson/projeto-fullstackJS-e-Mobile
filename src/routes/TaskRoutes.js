const express = require('express'); //Armazena o express na variável, o express é responsável pelas requisições e respostas
const router = express.Router(); //A função router é a responsável por capturar as rotas que chegam na API

const TaskController = require('../controller/TaskController'); //pegando o controller TaskController
const TaskValidation = require('../middleware/TaskValidation');
const MacaddressValidation = require('../middleware/MacaddressValidation');

//*OBS: IMPORTANTE RESSALTAR QUE QUANDO TEM DOIS PONTOS ":" É POR QUÊ A PALAVRA É UM PARÂMETRO
router.post('/', TaskValidation, TaskController.create); //CRIAR    //Se a requisição feita pelo usuário for do tipo post na rota "/", então a API vai criar uma nova tarefa
router.put('/:id', TaskValidation, TaskController.update); //ATUALIZAR    //Se a requisição usar o método put e passar o id 
router.get('/:id', TaskController.show); //MOSTRAR //Escolher pessoa uma a ser mostrada
router.delete('/:id', TaskController.delete); //DELETAR //Deletando a terefa que tem o id do parâmetro 

router.put('/:id/:done', TaskController.done) //Atualizar status da tarefa
router.get('/filter/all', MacaddressValidation, TaskController.all) //lISTAR Todas as tarefas
router.get('/filter/late', MacaddressValidation, TaskController.late) //Listar todas as tarefas atrasadas
router.get('/filter/today', MacaddressValidation, TaskController.today) //Listar todas as tarefas de hoje

module.exports = router; //exportando a rota de criação de tarefas