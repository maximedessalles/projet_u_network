const mongoose = require('mongoose');
const FormationSchema = require('./formation');
const filiereSchema = new mongoose.Schema({
    lb_filiere:String,
    formation:[{type:mongoose.Schema.Types.ObjectId,ref:"Formation"}]
});

module.exports= mongoose.model('Filiere',filiereSchema);