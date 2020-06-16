const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const User = require('../api/models/user');


passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, (name, pwd, cb) => {
	User.findOne({ email: name }, (err, user) => {
		if (err) {
			console.error(`could not find ${name} in MongoDB`, err);
		}
		if (user == undefined) {
			console.error(`could not find ${name} in MongoDB`, err);
		} else {
			console.log(bcrypt.compareSync(pwd, user.password))
			if (!bcrypt.compareSync(pwd, user.password)) {
				console.error(`wrong password for ${name}`);
				cb(null, false);
			} else {
				delete user.password
				console.error(`Connexion de l'utilisateur : ${name} `);
				cb(null, user);
			}
		}
	});
}));