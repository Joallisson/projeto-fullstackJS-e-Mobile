const express = require('express'); //O express é uma dependência que faz as requisições, processa e devolve ela
const server = express();

server.get('/teste', (req, res) => {
    res.send("Agora Deu Certo o Nodemon Finalmente");
});

server.listen(3000, () => {
    console.log("API ONLINE");
})