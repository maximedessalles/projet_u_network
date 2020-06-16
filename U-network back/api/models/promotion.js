const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    lb_promotion:String
});

module.exports= mongoose.model('Promotion',promotionSchema);