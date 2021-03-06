const { response } = require('express');
const TaskModel = require('../model/TaskModel'); //Pegando o TaskModel

const current = new Date(); //Pegando a data atual e aramazenado nessa constante
const {
    startOfDay, 
    endOfDay, 
    startOfWeek, 
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear
} = require('date-fns'); //Importando biblioteca com funções que sabem o começo e o fim do dia

class TaskController { //Criando classe TaskController
    async create(req, res){ //Função assícrona para criar uma nova tarefa
        const task = new TaskModel(req.body); //Criando objeto com o corpo da requisição para criar uma nova tarefa
        //Função para esperar até que essa tarefa seja concluída pelo JS
        await task //Contém os dados da requisição
                .save() //salva os dados da requsição no BD
                .then(response => {return res.status(200).json(response)}) //Se der tudo certo
                .catch(error => {return res.status(500).json(error)}); //Se der alguma coisa errada
    }

    async update(req, res){ //Atualizar as tarefas
        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true}) //req.params.id = O "req.params.id" esttá armazenando o "_id" da requisição /req.body = passando o corpo da requisição para ser atualizado/new: true = devolver a tarefa atualizada

        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    }

    async all(req, res){ //Listar todas as tarefas
        await TaskModel.find({ macaddress: {'$in': req.params.macaddress}}) //Pegar o macaddress no banco de dados
        .sort('when') //ordenar por data e hora
        .then(response => {
            return res.status(200).json(response); //Se der tudo certo
        })
        .catch(error => {
            return res.status(500).json(error); //Se der tudo errado
        });
    }

    async show(req, res){ //Mostrar uma única tarefa
        await TaskModel.findById(req.params.id)
        .then(response => {
            if (response) {
                return res.status(200).json(response)
            } else {
                return res.status(404).json({error: "Tarefa não encontrada"})
            }
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }

    async delete(req, res){ //Deletar uma tarefa
        await TaskModel.deleteOne({'_id': req.params.id})
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(error => {
            return res.status(500).json(error)
        })
    }

    async done(req, res){ //Atualizar o status da tarefa
        await TaskModel.findByIdAndUpdate(
            {'_id': req.params.id},
            {'done': req.params.done}, 
            {new: true})
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

    async late(req, res){ //Mostrando as tarefas atrasadas
        await TaskModel //acessando o DB
        .find({ //Encontre
            'when': {'$lt': current}, //Para saber se as tarefas estão atrasadas, encontra as datas ('$lt' => Less Then ou Menor Que) menores que o atual
            'macaddress': {'$in': req.params.macaddress}
        })
        .sort('when') //Ordenando pela data
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(error => {
            return res.status(500).json(error)
        })
    }

    async today(req, res){ //Mostrando as tarefas do dia
        await TaskModel.find({
            'macaddress': {'$in': req.params.macaddress}, //Verificando o macaddress //'$in' = está contido
            'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)} //Verificando se a data atual está entre o começo e o fim do dia  //'$gte' = maior ou igual que //'$lt' = menor que
        })
        .sort('when') //Ordenando pela data
        .then(response => {
            return res.status(200).json(response) //Deu tudo certo
        })
        .catch(error => {
            return res.status(500).json(error) //Alguma coisa deu errada
        })
    }

    async week(req, res){ //Mostrando as tarefas da semana
        await TaskModel.find({
            'macaddress': {'$in': req.params.macaddress}, //Verificando o macaddress //'$in' = está contido
            'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)} //Verificando se a data atual está entre o começo e o fim da semana  //'$gte' = maior ou igual que //'$lt' = menor ou igual que
        })
        .sort('when') //Ordenando pela data
        .then(response => {
            return res.status(200).json(response) //Deu tudo certo
        })
        .catch(error => {
            return res.status(500).json(error) //Alguma coisa deu errada
        })
    }

    async month(req, res){ //Mostrando as tarefas do mês
        await TaskModel.find({
            'macaddress': {'$in': req.params.macaddress}, //Verificando o macaddress //'$in' = está contido
            'when': {'$gte': startOfMonth(current), '$lte': endOfMonth(current)} //Verificando se a data atual está entre o começo e o fim do mes  //'$gte' = maior ou igual que //'$lt' = menor ou igual que
        })
        .sort('when') //Ordenando pela data
        .then(response => {
            return res.status(200).json(response) //Deu tudo certo
        })
        .catch(error => {
            return res.status(500).json(error) //Alguma coisa deu errada
        })
    }

    async year(req, res){
        await TaskModel.find({
            'macaddress': {'$in': req.params.macaddress}, //Verificando o macaddress //'$in' = está contido
            'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)} //Verificando se a data atual está entre o começo e o fim do ano  //'$gte' = maior ou igual que //'$lt' = menor ou igual que
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response) //Se der tudo certo
        })
        .catch(error => {
            return res.status(500).json(error) //Se der tudo errado
        })
    }
}

module.exports = new TaskController(); //Exportando função que do CRUD da API