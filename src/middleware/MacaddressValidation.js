const MacaddressValidation = (req, res, next) => { //Criando consntante para armazenar se vai da erro ou não no endereço mac
    if (!req.body.macaddress) { //Senão tiver o endereço mac retorne um amensagem de erro
        return res.status(400).json({error: "O endereço mac é obrigatório"});
    } else { //Se tiver o endereço mac retorne para a próxima função
        next(); //Retorna pra rota get
    }
}

module.exports = MacaddressValidation;