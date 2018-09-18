var checkObject = function(object, keysRequired, valueSatisfier) {
	for(key of keysRequired) {
		if(typeof object[key] === 'undefined' || !valueSatisfier(object[key])) {
			return false;
		}
	}

	return true;
}

module.exports = {checkObject};