const express = require('express');
const router = express.Router();
const Recrutement = require('../models/recrutement');
const mongoose = require('mongoose');
const mutler = require('multer');
const crypto = require('crypto');
const path = require('path');
var ObjectId = require('mongodb').ObjectID;

module.exports.getRecrutement=(req,res)=>{
	const filters = req.params.filters;
	Recrutement.find(filters)
		.sort({'lb_recrutement':1})
		.exec()
		.then(recrutements=>res.status(200).json(recrutements))
		.catch(err=>res.status(500).json({
			message : 'Impossible de récupérer les offres de recrutement',
			err:err
		}));
};

module.exports.postRecrutement=(req,res)=>{
	console.log('recrutement from req.body >>>', req.body);
	var monRecrutement = new Recrutement(req.body);
	monRecrutement.user = ObjectId(monRecrutement.user)
	monRecrutement.filiere = ObjectId(monRecrutement.filiere)
	monRecrutement.save((err, offre) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(201).json(offre);
	});
};

module.exports.getRecrutementById=(req,res)=>{
	const id = req.params.id;
	console.log(id)
	Recrutement.findOne(ObjectId(id))
		.then(offre=>res.status(200).json(offre))
		.catch(err=>res.status(500).json({
			message: 'L\'annonce '+id `n'a pas été trouvé.`,
			error :err
		}));
};

module.exports.getRecrutementByFiliere=(req,res)=>{
	const id = req.params.id;
	console.log(id)
	Recrutement.find({"filiere":ObjectId(id)})
		.then(offre=>res.status(200).json(offre))
		.catch(err=>res.status(500).json({
			message: 'L\'annonce '+id `n'a pas été trouvé.`,
			error :err
		}));
};

