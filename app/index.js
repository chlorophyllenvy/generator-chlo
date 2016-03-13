var generators = require('yeoman-generator');
var fs = require('fs');

module.exports = generators.Base.extend({
	makeDirs: function() {
		console.log("Derp sapperstein.");
		var dirs = ['_src', 'styleguide', 'public', 'public/js', 'public/css', 'public/img', 'public/fonts', 'public/video', 'public/etc'];
		for (var dir in dirs) {
			// console.log(dirs[dir]);
			// console.log(fs.statSync(dirs[dir]));
			if(!fs.stat(dirs[dir], function(){console.log('directory already exists')})) {
				continue;
			}
			fs.mkdirSync(path);
		}
		fs.open('index.html', function(err, data){ if(err) {fs.writeFileSync('index.html',''};})
		// if (!fs.stat('index.html'), function(){console.log('index already exists')}) {
		// 	console.log(fs.stat('./index.html'));
		// 	fs.writeFileSync('index.html','');
		// }
		// fs.mkdirSync('_src');
		// fs.mkdirSync('styleguide');
		// fs.mkdirSync('public');
		// fs.mkdirSync('public/js');
		// fs.mkdirSync('public/css');
		// fs.mkdirSync('public/img');
		// fs.mkdirSync('public/fonts');
		// fs.mkdirSync('public/video');
		// fs.mkdirSync('public/etc');
		// fs.writeFileSync('index.html','');
	}
});
