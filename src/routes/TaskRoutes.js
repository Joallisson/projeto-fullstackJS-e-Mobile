const express = require('express'); //Armazena o express na variável, o express é responsável pelas requisições e respostas
const router = express.Router(); //A função router é a responsável por capturar as rotas que chegam na API

const TaskController = require('../controller/TaskController'); //pegando o controller TaskController
const TaskValidation = require('../middleware/TaskValidation');

//*OBS: IMPORTANTE RESSALTAR QUE QUANDO TEM DOIS PONTOS ":" É POR QUÊ A PALAVRA É UM PARÂMETRO
router.post('/', TaskValidation, TaskController.create); //CRIAR    //Se a requisição feita pelo usuário for do tipo post na rota "/", então a API vai criar uma nova tarefa
router.put('/:id', TaskValidation, TaskController.update); //ATUALIZAR    //Se a requisição usar o método put e passar o id 
router.put('/:id/:done', TaskController.done) //Atualizar status da tarefa
router.get('/:id', TaskController.show); //MOSTRAR //Escolher pessoa uma a ser mostrada
router.delete('/:id', TaskController.delete); //DELETAR //Deletando a terefa que tem o id do parâmetro 

//ROTAS DE FILTRO
router.get('/filter/late/:macaddress', TaskController.late) //Listar todas as tarefas atrasadas
router.get('/filter/all/:macaddress',  TaskController.all) //lISTAR Todas as tarefas
router.get('/filter/today/:macaddress',TaskController.today) //Listar todas as tarefas de hoje
router.get('/filter/week/:macaddress', TaskController.week) //Listar todas as tarefas da semana
router.get('/filter/month/:macaddress',TaskController.month) //Listar todas as tarefas do mês
router.get('/filter/year/:macaddress', TaskController.year) //Listar todas as tarefas do ano

module.exports = router; //exportando a rota de criação de tarefas