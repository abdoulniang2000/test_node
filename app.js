
const http = require('http');
const express = require('express');
let etudiants = require('./data');
let success = require('./helper');
const morgan = require('morgan');
const bodyParser= require('body-parser');


/*
const logger = function (req, res, next) {
    const date = new Date();
    console.log(`la date est ${date}`);
    next();
}
const togger = function (req, res, next) {
    console.log(`voici middleware 2`);
    next();
}
    */


//const server = http.createServer((req, res)=> {
  //  res.end("Hello My name is Abdoul Niang");
//}); 




const app = express();
app.use(morgan(`dev`));
app.use(bodyParser.json());

/*app.use(logger,togger);*/

app.get('/etudiants/:id', (req, res) =>{
    const id = req.params.id;
    const etudiant = etudiants.find((et) => et.id == id);
    if(etudiant){
        const message = "Etudiant trouve";
        res.json(success(message, etudiant));
    }else{
        res.send("l etudiant est introuvable");
    }
})

app.get('/etudiants', (req, res) =>{
    const message = "Liste des etudiants";
    res.json(success(message, etudiants));
})

app.post('/etudts', (req, res) =>{
    const id = 8;
    const name = req.body.name;
    const newEtudiant = { id: id, name: name };
    etudiants.push(newEtudiant);
    res.json(newEtudiant);
});

app.put('/etds/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const etudiant = etudiants.find(e=>e.id===id);
    console.log(etudiant);
    etudiant.name = name;
    res.json(etudiant);
})
app.delete('/etdit/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const etudiant = etudiants.find(e=>e.id===id);
    console.log(etudiant);
    etudiants= etudiants.filter(etudiant=>etudiant.id!==id);
    res.json(etudiants);
})


app.listen(3000, () =>{
    console.log("serveur demare sur le port 3000");
});





