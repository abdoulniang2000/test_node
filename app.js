
const http = require('http');
const express = require('express');
let etudiants = require('./data');
let success = require('./helper');
const morgan = require('morgan');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const Etudiant = require('./models/etudiants');


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

mongoose.connect("mongodb://127.0.0.1:27017/etudiants")
.then(() => console.log('Connexion à la base de données réussie'))
.catch((err) => console.log('Erreur de connexion à la base de données :', err))






/*app.use(logger,togger);*/

/* app.get('/etudiants/:id', (req, res) =>{
    const id = req.params.id;
    const etudiant = etudiants.find((et) => et.id == id);
    if(etudiant){
        const message = "Etudiant trouve";
        res.json(success(message, etudiant));
    }else{
        res.send("l etudiant est introuvable");
    }
}) */

/* app.get('/etudiants', (req, res) =>{
    const message = "Liste des etudiants";
    res.json(success(message, etudiants));
}) */

    app.get('/etudiants/:id', async (req, res) =>{
        try {
            const etudiantId = req.params.id;
            const etudiant = await Etudiant.findById(etudiantId);
            res.json(etudiant);
        } catch (err) {
            res.send({ message: 'erreur ', error: err });
        }
    
    })
    app.get('/etudiants', async (req, res) =>{
        try {
            const etudiants = await Etudiant.find();
            res.json(etudiants);
        } catch (err) {
            res.send({ message: 'erreur ', error: err });
        }
    
    })

/* app.post('/etudts', (req, res) =>{
const id = 8;
const name = req.body.name;
const newEtudiant = { id: id, name: name };
etudiants.push(newEtudiant);
res.json(newEtudiant);
}); */
app.post('/etudts', (req, res) =>{
    const id = 8;
    const newEtudiant = new Etudiant({...req.body});
    newEtudiant.save();
    res.json(newEtudiant);
    });



/* app.put('/etds/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const etudiant = etudiants.find(e=>e.id===id);
    console.log(etudiant);
    etudiant.name = name;
    res.json(etudiant);
}) */
    app.put('/etds/:id',async (req, res) =>{
        try {
            const etudiantId = req.params.id;
            const updatedEtudiant = await Etudiant.findByIdAndUpdate(etudiantId,req.body);
            if (updatedEtudiant) {
                res.json(updatedEtudiant);
            } else {
                res.send({ message: 'Etudiant not trouvé' });
            }
        } catch (err) {
            // En cas d'erreur, renvoyer un message d'erreur avec un statut HTTP 500
            res.send({ message: 'erreur de mise à jour de l etudiant', error: err });
        }
    })
/* app.delete('/etdit/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const etudiant = etudiants.find(e=>e.id===id);
    console.log(etudiant);
    etudiants= etudiants.filter(etudiant=>etudiant.id!==id);
    res.json(etudiants);
}) */
    app.delete('/etdit/:id',async (req, res) =>{
        try {
            const etudiantId = req.params.id;
            const deletedEtudiant = await Etudiant.findByIdAndDelete(etudiantId);
            if (deletedEtudiant) {
                res.send({ message: 'Etudiant est suprime' });
            } else {
                res.send({ message: 'Etudiant not trouve' });
            }
        } catch (err) {
            res.send({ message: 'erreur lors de la supression de l etudiant', error: err });
        }
    })


app.listen(3000, () =>{
    console.log("serveur demare sur le port 3000");
});





