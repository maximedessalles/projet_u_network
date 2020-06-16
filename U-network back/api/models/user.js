const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    email : {type : String,required:true},
    civilite:String,
    password : {type:String},
    name:String,
    firstName : String,
    image:String,
    createdOn : {type:Date, default : Date.now},
    isMailValid:Boolean,
    telephone:String,
    etude:[{
        formation:{type:mongoose.Schema.Types.ObjectId,ref:"Formation"},
        promotion:{type:mongoose.Schema.Types.ObjectId,ref:"Promotion"},
        filiere:  {type:mongoose.Schema.Types.ObjectId,ref:"Filiere"}
    }],
    experience:[{
        entreprise:String,
        dateDebut:Date,
        dateFin:Date,
        libelle_poste:String,
        salaire:String,
        description:String
    }],
    user_add:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    user_wait:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    user_friend:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    role:[String],
    isRGPDAcceptedRegister:Boolean,
    isRGPDAcceptedLogin:Boolean,
    forcePasswordChange:Boolean
});



userSchema.methods.generateJwt = function () {
    console.log("data",process.env.JWT_SECRET);
    /*
    LES VARIABLES GLOBAL NE FONCTIONNE PAS TODO
    return jwt.sign(
        {_id: this._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXP}
    );*/
    return jwt.sign(
        {_id: this._id},
        "SECRET123&",
        {expiresIn: "15d"}
    );
};

module.exports= mongoose.model('User',userSchema);