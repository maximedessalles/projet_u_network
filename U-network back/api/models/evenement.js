const mongoose = require('mongoose');
const evenementSchema = new mongoose.Schema({
    titre:String,
    corps: String,
    creator:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    createdOn: Date,
    participants: [{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    date:Date,
    lieu:String
});

module.exports= mongoose.model('Evenement',evenementSchema);