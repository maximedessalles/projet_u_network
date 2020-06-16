const express = require('express');
const router = express.Router();
const Actualite = require('../models/actualite');
const mongoose = require('mongoose');
const mutler = require('multer');
const crypto = require('crypto');
const path = require('path');
var ObjectId = require('mongodb').ObjectID;

module.exports.getActualiteByGroupe = (req, res) => {
    const id = req.params.id;
    Actualite.find({ "groupeId": id })
        .populate("comments.creator")
        .then(actualite => res.status(200).json(actualite))
        .catch(err => res.status(500).json({
            message: `Les actualités pour  ` + id + `n'ont pas été trouvé.`,
            error: err
        }));
};

module.exports.postActualite = (req, res) => {
    console.log('filiere from req.body >>>', req.body);
    const monActu = new Actualite(req.body);

    monActu.save((err, actualite) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(201).json(actualite);
    });
};

module.exports.getActualiteByUser = (req, res) => {
    console.log('creator from req.body >>>', req.params);
    const id = req.params.id;

    Actualite.find({ "creator": id, "groupeId": null})
        .populate("comments.creator")
        .sort("-createdOn")
        .then(actualite => res.status(200).json(actualite))
        .catch(err => res.status(500).json({
            message: `Les actualités pour  ` + id + `n'ont pas été trouvé.`,
            error: err
        }));
};

module.exports.getActualite = (req, res) => {
    console.log('creator from req.body >>>', req.params);
    const id = req.params.id;

    Actualite.find({"groupeId": null})
        .populate("comments.creator")
        .sort("-createdOn")
        .then(actualite => res.status(200).json(actualite))
        .catch(err => res.status(500).json({
            message: `Les actualités pour  ` + id + `n'ont pas été trouvé.`,
            error: err
        }));
};

module.exports.updateActualite = (req, res) => {
    console.log("updateactu")
    const id = req.params.id;
    const publication = req.body;
    console.log("UpdateActu",req.body)
    Actualite.findByIdAndUpdate(id, publication, {new: true})
        .then(actualite => res.status(200).json(actualite))
        .catch(err => res.status(500).json({
            message: `Les actualités pour  ` + id + `n'ont pas été trouvé.`,
            error: err
        }));
};

