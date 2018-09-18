if(typeof express === "undefined") {
    express = require('express');
}
if(typeof bodyParser === "undefined") {
    bodyParser = require('body-parser');
}
if(typeof utils === "undefined") {
    utils = require('../utils');
}
if(typeof db === "undefined") {
    db = require('../db')(function(error) {
    	console.error(error);
    	process.exit();
    });
}
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/register/', function(req, res) {
	if(utils.checkObject(req.body, ['name', 'username', 'email', 'phone', 'password'], function(value) { return value.length > 0; })) {
		db.query('SELECT id FROM users WHERE username = ? OR email = ?', [req.body.username, req.body.email], function(error, usersData) {
			if(!error) {
				if(usersData.length == 0) {
					db.query('INSERT INTO users SET name = ?, username = ?, email = ?, phone = ?, password = ?', [req.body.name, req.body.username, req.body.email, req.body.phone, req.body.password], function(error, results) {
						if(!error) {
							req.session.userId = results.insertId;
							res.status(200);
							res.json({message: 'You have successfully registered'});
						} else {
							res.status(500);
							res.json({errorMessage: 'Unknown error has been encountered, please try again later'});
						}
					});
				} else {
					res.status(400);
					res.json({errorMessage: 'Email or username is already taken'});
				}
			} else {
				res.status(500);
				res.json({errorMessage: 'Unknown error has been encountered, please try again later'});
			}
		});
	} else {
		res.status(400);
		res.json({errorMessage: 'Some of the required parameters are missed'});
	}
});
router.post('/login/', function(req, res) {
	if(utils.checkObject(req.body, ['email', 'password'], function(value) { return value.length > 0; })) {
		db.query('SELECT id FROM users WHERE email = ? AND password = ?', [req.body.email, req.body.password], function(error, results) {
			if(!error) {
				if(results.length > 0) {
					req.session.userId = results[0].id;
					res.status(200);
					res.json({message: 'You have successfully logged in'});
				} else {
					res.status(400);
					res.json({errorMessage: 'The email or password you entered is incorrect'});
				}
			} else {
				res.status(500);
				res.json({errorMessage: 'Unknown error has been encountered, please try again later'});
			}
		});
	} else {
		res.status(400);
		res.json({errorMessage: 'Some of the required parameters are missed'});
	}
});
router.get('/user_data/', function(req, res) {
	if(typeof req.session.userId !== 'undefined') {
		db.query('SELECT name, username, email, phone, password FROM users WHERE id = ?', [req.session.userId], function(error, results) {
			if(!error) {
				if(results.length > 0) {
					res.status(200);
					res.json(results[0]);
				} else {
					res.status(400);
					res.json({errorMessage: 'User doesn\'t exist'});
				}
			} else {
				res.status(500);
				res.json({errorMessage: 'Unknown error has been encountered, please try again later'});
			}
		});
	} else {
		res.status(400);
		res.json({errorMessage: 'You\'re not authorized'});
	}
});
router.post('/logout/', function(req, res) {
	sessionStore.destroy(req.sessionID, function(error) {
		res.json({message: 'You have successfully logged out'});
	});
});
router.all('*', function(req, res) {
	res.status(404);
	res.json({errorMessage: 'Invalid API method'});
});

module.exports = router;