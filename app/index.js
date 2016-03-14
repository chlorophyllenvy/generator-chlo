var generators = require('yeoman-generator');
var fs = require('fs');
var jade = require('jade');
var options =  {
		'html' : jade.renderFile('app/index-page.jade', {pretty:true})
	}

module.exports = generators.Base.extend({
	makeDirs: function() {
		// Array of directories to create
		var dirs = ['_src', 'styleguide', 'public', 'public/js', 'public/css', 'public/img', 'public/fonts', 'public/video', 'public/etc'];
		for (var dir in dirs) {
			if(!fs.stat(dirs[dir], function(){console.log('directory already exists')})) {
				continue;
			}
			fs.mkdirSync(path);
		}
		// create index.html file using jade template
		fs.stat('index.html', function(err,data){
			var data = options.html;
			if(err.code === "ENOENT") {console.log("comeon");fs.writeFileSync('index.html', data, 'utf-8')}
		})
	}
});
