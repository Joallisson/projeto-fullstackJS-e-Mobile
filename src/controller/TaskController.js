const { response } = require('express');
const TaskModel = require('../model/TaskModel'); //Pegando o TaskModel

class TaskController { //Criando classe TaskController
    async create(req, res){ //Função assícrona para criar uma nova tarefa
        const task = new TaskModel(req.body); //Criando objeto com o corpo da requisição para criar uma nova tarefa
        //Função para esperar até que essa tarefa seja concluída pelo JS
        await task //Contém os dados da requisição
                .save() //salva os dados da requsição no BD
                .then(response => {return res.status(200).json(response)}) //Se der tudo certo
                .catch(error => {return res.status(500).json(error)}); //Se der alguma coisa errada
    }

    async update(req, res){
        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true}) //req.params.id = O "req.params.id" esttá armazenando o "_id" da requisição /req.body = passando o corpo da requisição para ser atualizado/new: true = devolver a tarefa atualizada

        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    }
}

module.exports = new TaskController();