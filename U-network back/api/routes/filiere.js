const express = require('express');
const router = express.Router();
const Filiere = require('../models/filiere');
const mongoose = require('mongoose');
const mutler = require('multer');
const crypto = require('crypto');
const path = require('path');
var ObjectId = require('mongodb').ObjectID;

module.exports.ping = (req,res)=>{
    res.status(200).json({msg:'pong',date: new Date()});
}; //localhost:3000/ping


module.exports.getFiliere=(req,res)=>{
    Filiere.find()
    .sort({'lb_filiere':1})
    .exec()
    .then(filiere=>res.status(200).json(filiere))
    .catch(err=>res.status(500).json({
        message : 'Impossible de récupérer les filières',
        err:err
    }));
};

module.exports.postFiliere=(req,res)=>{
    console.log('filiere from req.body >>>', req.body);
	const maFil = new Filiere(req.body);
    
    maFil.save((err, filiere) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(201).json(filiere);
	});
};



module.exports.deleteFiliere=(req,res)=>{
    
const id = req.params.id;
Filiere.findByIdAndDelete(id,(err,filiere)=>{
    if(err){
        res.status(500).json(err);
    }
    res.status(202).json({
        Message : 'Filiere '+filiere.id+'a été supprimé',
        Erreur : err
    });
});
};

module.exports.getFiliereById = (req,res)=>{
    const id = req.params.id;
    Filiere.findById(ObjectId(id))
    .then(filiere=>res.status(200).json(filiere))
    .catch(err=>res.status(500).json({
        message: `La filière `+id+ `n'a pas été trouvé.`,
        error :err
    }));
};


module.exports.updateFiliereById= (req, res) => {
    const id = req.params.id;
    const filiere = {...req.body};

    console.log("body",filiere);
    Filiere.findByIdAndUpdate(id,filiere,(err, response) => {
        if(err) return res.status(500).json({ msg: 'update failed', error: err });
        res.status(200).json({ msg: `document with id ${id} updated`, response: response });
    });
};

module.exports.getFiliereByFormation = (req,res)=>{
    const id = req.params.id;
    Filiere.find({"formation":id})
    .then(filiere=>res.status(200).json(filiere))
    .catch(err=>res.status(500).json({
        message: `La filière `+id+ `n'a pas été trouvé.`,
        error :err
    }));
};




