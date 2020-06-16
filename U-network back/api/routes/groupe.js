const express = require('express');
const router = express.Router();
const Groupe = require('../models/groupe');
const mongoose = require('mongoose');
const mutler = require('multer');
const crypto = require('crypto');
const path = require('path');
var ObjectId = require('mongodb').ObjectID;

router.get('/ping', (req, res) => {
    res.status(200).json({ msg: 'pong', date: new Date() });
}); //localhost:3000/ping


module.exports.getGroupe = (req, res) => {
    Groupe.find()
        .sort({ 'lb_groupe': 1 })
        .exec()
        .then(groupe => res.status(200).json(groupe))
        .catch(err => res.status(500).json({
            message: 'Impossible de récupérer les formations',
            err: err
        }));
};

module.exports.postGroupe = (req, res) => {
    const monGroupe = new Groupe(req.body);
    console.log(monGroupe);
    monGroupe.save((err, groupe) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(201).json(groupe);
    });
};

module.exports.deleteGroupe = (req, res) => {

    const id = req.params.id;
    Groupe.findByIdAndDelete(id, (err, groupe) => {
        if (err) {
            res.status(500).json(err);
        }
        res.status(202).json({
            Message: 'Groupe ' + groupe.id + 'a été supprimé',
            Erreur: err
        });
    });
};

module.exports.updateGroupeById= (req, res) => {
    const id = req.params.id;
    const groupe = {...req.body};

    console.log("body",groupe);
    Groupe.findByIdAndUpdate(id,groupe,(err, response) => {
        if(err) return res.status(500).json({ msg: 'update failed', error: err });
        res.status(200).json({ msg: `document with id ${id} updated`, response: response });
    });
};

module.exports.getGroupeById = (req,res)=>{
    const id = req.params.id;
    Groupe.findById(ObjectId(id))
    .then(groupe=>res.status(200).json(groupe))
    .catch(err=>res.status(500).json({
        message: `La promotion `+id+ `n'a pas été trouvé.`,
        error :err
    }));
};


module.exports.getGroupeByUser = (req,res)=>{
    const id = req.params.id;
    Groupe.find({"user":id})
    .then(groupe=>res.status(200).json(groupe))
    .catch(err=>res.status(500).json({
        message: `Le groupe `+id+ `n'a pas été trouvé.`,
        error :err
    }));
};