const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer')

module.exports.users = (req, res) => {
    User.find({}, '-password')
        .sort({ 'name': 1 })
        .exec()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({
            message: 'Utilisateur non trouvé',
            err: err
        }));
};

module.exports.usersWithFilter = (req, res) => {
    var filters = req.body
    var findFilter = {
        name: new RegExp(filters.name)
    }
    var filterFormated = {}
    for (filter in filters) {
        if (filters[filter] != "") {
            if (filter !== "name") {
                filterFormated[filter] = new ObjectId(filters[filter]);
            }
        }
    }
    User.find({}, '-password')
        .sort()
        .exec()
        .then(users => {
            console.log("filter", filterFormated)
            for (filter in filterFormated) {
                for (var i = users.length - 1; i >= 0; i--) {
                    var toDelete = true;
                    for (var j = 0; j < users[i].etude.length; j++) {
                        console.log(users[i].etude[j][filter])
                        if ("" + users[i].etude[j][filter] == "" + filterFormated[filter]) {
                            toDelete = false;
                        }
                    }
                    if (toDelete) {
                        users.splice(i, 1)
                    }
                }
            }
            res.status(200).json(users)
        })
        .catch(err => res.status(500).json({
            message: 'Utilisateur non trouvé',
            err: err
        }));
};

module.exports.getUserById = (req, res) => {
    const id = req.params.id;
    console.log("id", id)
    User.findById(id, '-password')
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({
            message: `L'utilisateur ` + id + `n'a pas été trouvé.`,
            error: err
        }));
};

module.exports.getUserEmail = (req, res) => {
    User.find({}, "email")
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({
            message: `L'utilisateur ` + id + `n'a pas été trouvé.`,
            error: err
        }));
};

module.exports.userDelete = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id, (err, user) => {
        if (err) {
            res.status(500).json(err);
        }
        res.status(202).json({
            Message: 'User ' + user.id + 'a été supprimé',
            Erreur: err
        });
    });
};

module.exports.user = (req, res) => {
    var newUser = new User(req.body);
    if (newUser.password.indexOf("13579&") != -1) {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'contact.UNetwork.Pro@gmail.com',
                pass: '123Azerty'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        var mailOptions = {
            from: 'contact.UNetwork.Pro@gmail.com',
            to: newUser.email,
            subject: "Première connexion à l'application U-Network ",
            text: 'Veuillez utiliser le mot de passe suivant pour la première connexion à l\'application U-Network : ' + newUser.password
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(500)
                console.log(error);
            } else {
                newUser.password = bcrypt.hashSync(newUser.password, 10);

                newUser.save((err, user) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    }

                    res.status(201).json(user);
                });
                res.status(200)
                console.log('Email sent: ' + info.response);
            }
        });
    } else {
        newUser.password = bcrypt.hashSync(newUser.password, 10);

        newUser.save((err, user) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.status(201).json(user);
        });
    }


};



module.exports.getUserWithFilter = (req, res) => {
    const idFormation = req.params.idFormation;
    const idPromotion = req.params.idPromotion;
    console.log(idFormation +" "+idPromotion);
    User.find({"etude.promotion": ObjectId(idPromotion),"etude.formation": ObjectId(idFormation)})
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({
            message: `L'utilisateur n'a pas été trouvé.` + err,
            error: err
        }));
};



module.exports.confirmation = (req, res) => {
    try {
        jwt.verify(req.params.token, process.env.JWT_SECRET,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ status: false, message: 'Mauvais Token' });
                else {
                    User.findOne({ _id: decoded._id }, (err, user) => {
                        if (!user)
                            return res.status(404).json({ status: false, message: 'Utilisateur non trouvé' });
                        else {
                            user.compteActive = true;
                            user.save();
                            return res.status(200).json({ status: true, message: `Compte activé ${user.pseudo}` });
                        }
                    });
                }
            });
    } catch (e) {
        res.send(JSON.stringify(e))
    }
};

module.exports.authenticate = (req, res) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // error from passport middleware
            console.log("400 :", err);
            return res.status(400).json(err);
        } else if (user) {
            // registered user
            //if (user.compteActive) {
            User.findById(ObjectId(user._id))
                .then(user2 => user = user2);
            return res.status(200).json({ "token": user.generateJwt(), "user": user });
            //} else {
            //  return res.status(200).json({"active": false})
            //}
        } else {
            // unknown user or wrong password
            console.log("404: " + JSON.stringify(info));
            return res.status(404).json(info);
        }
    })(req, res);
};

module.exports.logout = (req, res) => {
    req.logOut();
    console.log(`Deconnexion de l'utilisateur :`, req.body);
    res.status(200).json({
        msg: 'Loggout successfully'
    });
};


module.exports.register = (req, res) => {

    var newUser = new User(req.body);
    delete newUser._id;
    console.log('user from req.body >>>', newUser);
    newUser.save((err, user) => {
        if (err) {
            console.error("erreur", err.message);
            return res.status(500).json(err);
        }


        res.status(201).json(user);
    });
};

module.exports.updateUserById = (req, res) => {
    const id = req.params.id;
    const user = { ...req.body };
    if (user.password != undefined) {
        user.password = bcrypt.hashSync(user.password, 10);
    }


    console.log("body", user);
    User.findByIdAndUpdate(id, user, (err, response) => {
        if (err) return res.status(500).json({ msg: 'update failed', error: err });
        res.status(200).json({ msg: `document with id ${id} updated`, response: response });
    });
};


module.exports.getUserWithoutEtude = (req, res) => {
    const idFormation = req.params.idFormation;
    const idPromotion = req.params.idPromotion;

    User.find({
        $or: [
            { "etude.promotion": { $ne: ObjectId(idPromotion) } },
            { "etude.formation": { $ne: ObjectId(idFormation) } }
        ]
    })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({
            message: `L'utilisateur n'a pas été trouvé.`,
            error: err
        }));
};

module.exports.sendEmail = (req, res) => {
    const contact = req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'contact.UNetwork.Pro@gmail.com',
            pass: '123Azerty'
        }
    });
    var mailOptions = {
        from: 'contact.UNetwork.Pro@gmail.com',
        to: 'maximedessalles@hotmail.fr',
        subject: "Contact de " + contact.name,
        text: 'Email : ' + contact.email + "\n" + contact.message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(500)
            console.log(error);
        } else {
            res.status(200)
            console.log('Email sent: ' + info.response);
        }
    });

};
