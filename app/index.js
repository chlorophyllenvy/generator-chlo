var generators = require('yeoman-generator');
var fs = require('fs');

module.exports = generators.Base.extend({
	makeDirs: function() {
		console.log("Derp sapperstein.");
		fs.mkdirSync('_src');
		fs.mkdirSync('styleguide');
		fs.mkdirSync('public');
		fs.mkdirSync('public/js');
		fs.mkdirSync('public/css');
		fs.mkdirSync('public/img');
		fs.mkdirSync('public/fonts');
		fs.mkdirSync('public/video');
		fs.mkdirSync('public/etc');
	}
});
