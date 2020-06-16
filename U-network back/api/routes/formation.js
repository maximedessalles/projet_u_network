const express = require('express');
const router = express.Router();
const Formation = require('../models/Formation');
const mongoose = require('mongoose');
const mutler = require('multer');
const crypto = require('crypto');
const path = require('path');
var ObjectId = require('mongodb').ObjectID;


module.exports.getFormation = (req,res)=>{
    Formation.find()
    .sort({'lb_formation':1})
    .exec()
    .then(formation=>res.status(200).json(formation))
    .catch(err=>res.status(500).json({
        message : 'Impossible de récupérer les formations',
        err:err
    }));
};

module.exports.postFormation=(req,res)=>{
    console.log('formation from req.body >>>', req.body);
	const maForma = new Formation(req.body);
    
    maForma.save((err, formation) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.status(201).json(formation);
	});
};


module.exports.deleteFormation=(req,res)=>{
    
    const id = req.params.id;
    Formation.findByIdAndDelete(id,(err,formation)=>{
        if(err){
            res.status(500).json(err);
        }
        res.status(202).json({
            Message : 'Filiere '+formation.id+'a été supprimé',
            Erreur : err
        });
    });
    };


    module.exports.getFormationById = (req,res)=>{
        const id = req.params.id;
        Formation.findById(ObjectId(id))
        .then(filiere=>res.status(200).json(filiere))
        .catch(err=>res.status(500).json({
            message: `La formation `+id+ `n'a pas été trouvé.`,
            error :err
        }));
    };

    module.exports.updateFormationById= (req, res) => {
        const id = req.params.id;
        const formation = {...req.body};
    
        console.log("body",formation);
        Formation.findByIdAndUpdate(id,formation,(err, response) => {
            if(err) return res.status(500).json({ msg: 'update failed', error: err });
            res.status(200).json({ msg: `document with id ${id} updated`, response: response });
        });
    };
    