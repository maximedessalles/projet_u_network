require('./config/passportConfig');


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connection = mongoose.connection;
const rtsIndex = require('./auth/routes');
var expressJwt = require('express-jwt');
const passport = require('passport');

app.set('port', (process.env.port || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
}));


// Application du token sur toute les route excepter certaines

app.use(expressJwt({
    secret: "SECRET123&",
    getToken: function (req) {
        console.log('get Token')
        if (req.headers.authorization) {
            return req.headers.authorization;
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({
    path: [
        { url: '/api/userEmail', methods: ['GET'] },
        '/api/register',
        { url: '/api/filiereByFormation/:id', methods: ['GET'] },
        '/api/login',
        '/api/sendEmail',
        { url: /^\/api\/user\/.*/, methods: ['GET'] },
        '/api/user',
        { url: '/api/promotion', methods: ['GET'] },
        { url: '/api/formation', methods: ['GET'] },
        { url: '/api/filiere', methods: ['GET'] },
        { url: '/api/userWithFilter', methods: ['POST'] },
        /^\/api\/filiereByFormation\/.*/,
        { url: /^\/api\/user\/.*/, methods: ['PUT'] }
         
        
    ]
}));

app.use(passport.initialize());

app.use('/api', rtsIndex);

// configuring a local strategy
// == using username and password to identify and authorize a user

const uploadDir = require('path').join(__dirname, '/uploads');
console.log('uploadDir', uploadDir);
app.use(express.static(uploadDir));


app.use((req, res) => {
    const err = new Error('404 - Not Found');
    err.status = 404;
    res.json({ msg: '404 - Not found', err: err });
});
mongoose.connect('mongodb://localhost:27017/UNetwork', { useNewUrlParser: true });
connection.on('error', (err) => {
    console.error('connection à mongodb erreur : ' + err.message);
});


connection.once('open', () => {
    console.log('Connecté à mongodb');
    app.listen(app.get('port'), () => {
        console.log('Serveur express écoute sur le port ' + app.get('port'));
    });
});
