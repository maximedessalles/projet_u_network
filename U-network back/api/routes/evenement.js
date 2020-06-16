const express = require('express');
const router = express.Router();
const Evenement = require('../models/evenement');
const mongoose = require('mongoose');
const mutler = require('multer');
const crypto = require('crypto');
const path = require('path');
var ObjectId = require('mongodb').ObjectID;



module.exports.postEvenement = (req, res) => {
    console.log('filiere from req.body >>>', req.body);
    const monEv = new Evenement(req.body);

    monEv.save((err, evenement) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(201).json(evenement);
    });
};



module.exports.getEvenement = (req, res) => {
    console.log('creator from req.body >>>', req.params);
    const id = req.params.id;

    Evenement.find()
        .sort("-createdOn")
        .then(evenements => res.status(200).json(evenements))
        .catch(err => res.status(500).json({
            message: `Les evenements pour  ` + id + `n'ont pas été trouvé.`,
            error: err
        }));
};

module.exports.updateEvenement = (req, res) => {
    console.log("updateactu")
    const id = req.params.id;
    const evenement = req.body;
    console.log("UpdateActu",req.body)
    Evenement.findByIdAndUpdate(id, evenement, {new: true})
        .then(evenement => res.status(200).json(evenement))
        .catch(err => res.status(500).json({
            message: `Les actualités pour  ` + id + `n'ont pas été trouvé.`,
            error: err
        }));
};

