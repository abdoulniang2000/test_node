const http = require('http');
const express = require('express');
let etudiants = require('./data')


//const server = http.createServer((req, res)=> {
  //  res.end("Hello My name is Abdoul Niang");
//}); 

const app = express();
app.get('/etudiants/:id', (req, res) =>{
    const id = req.params.id;
    res.send(`Etudiant numero ${id}`);
})

app.get('/etudiants', (req, res) =>{
    const nbrEtudiants = etudiants.length;
    res.send(` Il ya ${nbrEtudiants} etudiants`);
})

app.listen(3000, () =>{
    console.log("serveur demare sur le port 3000");
});
