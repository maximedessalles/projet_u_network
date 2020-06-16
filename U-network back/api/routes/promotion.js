const express = require('express');
const router = express.Router();
const Promotion = require('../models/promotion');
const mongoose = require('mongoose');
const mutler = require('multer');
const crypto = require('crypto');
const path = require('path');
var ObjectId = require('mongodb').ObjectID;

router.get('/ping', (req, res) => {
    res.status(200).json({ msg: 'pong', date: new Date() });
}); //localhost:3000/ping


module.exports.getPromotion = (req, res) => {
    console.log("getpromotionsBis")
    Promotion.find()
        .sort({ 'lb_promotion': 1 })
        .exec()
        .then(promotion => res.status(200).json(promotion))
        .catch(err => res.status(500).json({
            message: 'Impossible de récupérer les formations',
            err: err
        }));
};

module.exports.postPromotion = (req, res) => {
    console.log('promotion from req.body >>>', req.body);
    const maPromo = new Promotion(req.body);

    maPromo.save((err, promotion) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(201).json(promotion);
    });
};

module.exports.deletePromotion = (req, res) => {

    const id = req.params.id;
    Promotion.findByIdAndDelete(id, (err, promotion) => {
        if (err) {
            res.status(500).json(err);
        }
        res.status(202).json({
            Message: 'Promotion ' + promotion.id + 'a été supprimé',
            Erreur: err
        });
    });
};

module.exports.updatePromotionById= (req, res) => {
    const id = req.params.id;
    const promotion = {...req.body};

    console.log("body",promotion);
    Promotion.findByIdAndUpdate(id,promotion,(err, response) => {
        if(err) return res.status(500).json({ msg: 'update failed', error: err });
        res.status(200).json({ msg: `document with id ${id} updated`, response: response });
    });
};

module.exports.getPromotionById = (req,res)=>{
    const id = req.params.id;
    Promotion.findById(ObjectId(id))
    .then(promotion=>res.status(200).json(promotion))
    .catch(err=>res.status(500).json({
        message: `La promotion `+id+ `n'a pas été trouvé.`,
        error :err
    }));
};
