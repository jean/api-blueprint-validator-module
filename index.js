/**
* Module which exports validator to accept text input along with file
**/

var dataParser = require('./lib/blueprint-parser')
module.exports = function (data, cb) {
	 dataParser.parseAndValidateString(data, cb);
}
