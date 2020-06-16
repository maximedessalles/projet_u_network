const mongoose = require('mongoose');
// const FormationSchema = require('./formation');
const recrutementSchema = new mongoose.Schema({
	lb_recrutement:String,
	user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
	filiere:{type:mongoose.Schema.Types.ObjectId,ref:'Filiere'},
	typeContrat:{type : String,required:true},
	smallDescription:{type : String,required:true},
	longDescription:String,
	lieu:{type : String,required:true},
	emailContact:{type : String,required:true},
	createdOn: {type:Date, default : Date.now}
});

module.exports= mongoose.model('Recrutement',recrutementSchema);
