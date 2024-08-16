const http = require('http');
const server = http.createServer((req, res)=> {
    res.end("Hello My name is Abdoul Niang");
});

server.listen(3000, () =>{
    console.log("serveur demare sur le port 3000");
});