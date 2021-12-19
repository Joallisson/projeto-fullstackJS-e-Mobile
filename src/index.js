const express = require('express'); //O express é uma dependência que faz as requisições, processa e devolve ela
const server = express();
server.use(express.json());

const TaskRoutes = require('./routes/TaskRoutes');
server.use('/task', TaskRoutes); //Rota Raiz

server.listen(3000, () => {
    console.log("API ONLINE");
})