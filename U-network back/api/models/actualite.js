

const mongoose = require('mongoose');
const FormationSchema = require('./formation');
const actualiteSchema = new mongoose.Schema({
    corps: String,
    file: String,
    lien: String,
    video: String,
    groupeId:{type:mongoose.Schema.Types.ObjectId,ref:"Groupe"},
    creator:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    createdOn: Date,
    like: [{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    comments: [{
        creator:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        date:Date,
        content:String
    }]
});

module.exports= mongoose.model('Actualite',actualiteSchema);