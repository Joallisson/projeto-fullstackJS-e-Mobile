const TaskModel = require('../model/TaskModel');
const { isPast} = require('date-fns'); //Pacote com funções para se trabalhar com data e hora no NodeJS

const TaskValidation = async(req, res, next) => { //Criando uma constante para validar os dados da requisiçaõ
    const {macaddress, type, title, description, when} = req.body;

    if (!macaddress) { //Senão tiver o macaddress, devolve uma mensagem de erro
        return res.status(400).json({error: 'O macaddress é obrigatório'});
    } else if(!type){
        return res.status(400).json({error: 'O tipo é obrigatório'});
    }else if(!title){
        return res.status(400).json({error: 'O título é obrigatório'})
    }else if(!description){
        return res.status(400).json({error: 'A descrição é obrigatória'});
    }else if(!when){ //Senão tiver a data e hora
        return res.status(400).json({error: 'A data e a hora são obrigatórias'});
    }else{ //Se tiver todos os dados obrigatórios na requisição

        let exists; //criando variável se existe uma tarefa

        if(req.params.id){ //Se tiver passando um ID na URL como parâmetro, então o usuário vai atualizar uma nova tarefa
            exists = await TaskModel.findOne({ 
                '_id': {'$ne': req.params.id}, //'$ne' = Significa: Not Exists ou seja ele ignora o id
                'when': {'$eq': new Date(when)}, //'$eq' = Significa: igual
                'macaddress': {'$in': macaddress} //'$in' = Significa: está contido
            });
        }else{ //Senão tiver passando um ID na URL como parâmetro, então o usuário vai cadastrar uma nova tarefa

            if(isPast(new Date(when))){ //Usando uma função para saber se usuário criou uma terefa no passado e convertendo o "when" de string para date
                return res.status(400).json({error: 'Insira uma tarefa furura'});
            }

            exists = await TaskModel.findOne({ //Atribuindo à variável existis uma função assíncona (que para a execução das tarefas, no caso node aguarde o mongo retornar as informações) para saber se uma tarefa já foi criada na mesma data e no mesmo macaddress
                'when': {'$eq': new Date(when)}, //'$eq' = Significa: igual
                'macaddress': {'$in': macaddress} //'$in' = Significa: está contido
            });
        }

        if(exists){ //Se existir uma tarefa no mesmo dia e no mesmo celular ou computador do usuário, não vai ser possível cadastrar essa nova tarefa
            return res.status(400).json({error: 'Já esxiste uma tarefa cadastrada nesse dia'});
        }

        next(); //Se tudo deu certo então vai ser criada a nova tarefa
    }
}

module.exports = TaskValidation;