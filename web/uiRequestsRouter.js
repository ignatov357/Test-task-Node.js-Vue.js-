if(typeof express === "undefined") {
    express = require('express');
}
if(typeof path === "undefined") {
    path = require('path');
}
var router = express.Router();

router.use(express.static(path.join(__dirname, 'assets')));

router.all('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'static/index.html'));
});
router.all('*', function(req, res) {
	res.redirect('/');
});

module.exports = router;