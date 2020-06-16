const express = require('express');
const router = express.Router();
const demandeEmploi = require('../models/demandeEmploi.js');
const mongoose = require('mongoose');
const mutler = require('multer');
const crypto = require('crypto');
const path = require('path');
var ObjectId = require('mongodb').ObjectID;

module.exports.getDemande=(req,res)=>{
	const filters = req.params.filters;
	demandeEmploi.find(filters)
		.sort({'lb_recrutement':1})
		.exec()
		.then(recrutements=>res.status(200).json(recrutements))
		.catch(err=>res.status(500).json({
			message : 'Impossible de récupérer les offres de recrutement',
			err:err
		}));
};

module.exports.postDemande=(req,res)=>{
	console.log('recrutement from req.body >>>', req.body);
	var maDemande = new demandeEmploi(req.body);
	maDemande.user = ObjectId(maDemande.user)
	maDemande.filiere = ObjectId(maDemande.filiere)
	maDemande.save((err, offre) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(201).json(offre);
	});
};

module.exports.getDemandeById=(req,res)=>{
	const id = req.params.id;
	console.log(id)
	demandeEmploi.findOne(ObjectId(id))
		.then(demande=>res.status(200).json(demande))
		.catch(err=>res.status(500).json({
			message: 'L\'annonce '+id `n'a pas été trouvé.`,
			error :err
		}));
};

module.exports.getDemandeByFiliere=(req,res)=>{
	const id = req.params.id;
	console.log(id)
	demandeEmploi.find({"filiere":ObjectId(id)})
		.then(offre=>res.status(200).json(offre))
		.catch(err=>res.status(500).json({
			message: 'L\'annonce '+id `n'a pas été trouvé.`,
			error :err
		}));
};


