const mongoose = require('mongoose');

const EtudiantSchema= mongoose.Schema({
    lastName: {
        type: String, required: true
    },
    firstName: {
        type: String, required: true
    },
    Age:{
        type:Number, required:true
    },
    imageUrl:{
        type:String
    }
    

})

module.exports = mongoose.model('Etudiant', EtudiantSchema);