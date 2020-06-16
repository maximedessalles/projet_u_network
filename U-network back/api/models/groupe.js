const mongoose = require('mongoose');

const groupeSchema = new mongoose.Schema({
    lb_groupe:String,
    creator:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    user:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}]
});

module.exports= mongoose.model('Groupe',groupeSchema);