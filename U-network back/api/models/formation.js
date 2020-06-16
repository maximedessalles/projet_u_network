const mongoose = require('mongoose');

delete mongoose.connection.models['Formation'];

const formationSchema = new mongoose.Schema({
    lb_formation:String
});


module.exports= mongoose.model('Formation',formationSchema);