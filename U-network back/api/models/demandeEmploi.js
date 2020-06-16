const mongoose = require('mongoose');
// const FormationSchema = require('./formation');
const demandeEmploiSchema = new mongoose.Schema({
	lb_demande:String,
	user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
	filiere:{type:mongoose.Schema.Types.ObjectId,ref:'Filiere'},
	typeContrat:{type : String,required:true},
	smallDescription:{type : String,required:true},
	longDescription:String,
	lieu:{type : String,required:true},
	emailContact:{type : String,required:true},
	createdOn: {type:Date, default : Date.now}
});

module.exports= mongoose.model('demandeEmploi',demandeEmploiSchema);
