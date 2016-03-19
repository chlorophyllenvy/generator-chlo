var generators = require('yeoman-generator');
var fs = require('fs');
var jade = require('jade');
var html =  {
		'index' : jade.renderFile('app/index-page.jade', {pretty:true}),
		'footer' : jade.renderFile('app/footer-page.jade', {ppretty:true})
	}
// List of directories that will be created. Push whatever you need to into this array
var dirs = ['_src', '_src/js', '_src/style', 'styleguide', 'public', 'public/js', 'public/css', 'public/img', 'public/fonts', 'public/video', 'public/etc'];
// List of files that will be created.  Push whatever you need to into this array
var fls = ['index'];

module.exports = generators.Base.extend({
	// templating: function() {
 //  		var done = this.async();
 //  		this.prompt({
 //  			type: 'list',
 //  			name: 'template',
 //  			message: 'What type of templating will you use?',
 //  			default: 'Jade',
 //  			choices: ['Jade', 'PHP']
 //  		}, function(answers) {
 //  			// this.log(answers.template);
 //  			if(answers.template === 'Jade') {this.log("Hurrah, it's Jade")};
 //  			if(answers.template === 'PHP') {this.log("Oh yeah! We <3 PHP!")};
 //  			done();
 //  		}.bind(this));
 //  	},
 //  	isiFooter: function() {
 //  		var done = this.async();
 //  		this.prompt({
 //  			type: 'confirm',
 //  			name: 'footer',
 //  			message: 'Will you need an isiFooter?',
 //  			default: 'Yes'
 //  		}, function(answers) {
 //  			this.log(answers.footer);
 //  			if(answers.footer) {
 //  				dirs.push('footer');
 //  				fls.push('footer/index.html');
 //  				// console.log(dirs);
 //  			}
 //  			done();
 //  		}.bind(this));
 //  	},
	makeDirs: function() {
		// Array of directories to create
		dirs = dirs.sort();
		for (var dir in dirs) {
			fs.mkdir(dirs[dir], function(err, stat){if(err && err.code == "EEXIST"){ return;} });
		}

		// for (var dir in dirs) {
		// 	// this.log(dirs[dir]);
		// 	if(fs.stat(dirs[dir], function(err, data){

		// 		console.log(err, data);
		// 		if(err && err.code === "ENOENT") {
		// 			console.log('directory doesn\'t exist, creating');
		// 			fs.mkdirSync(dirs[dir]);
		// 		}
		// 		console.log('directory already exists')})) {
		// 		// continue;
		// 	}
		// 	// fs.mkdirSync(dirs[dir]);
		// }
		// for (var i = fls.length; i = 0; i++){
		// 	if(fs.stat(fls[i]+'.html'), function(err, data){
		// 		var d = html.file;
		// 		if(err && err.code === "EEXIST") {
		// 			this.log('Not writing file'+file+'.html'); 
		// 			fs.writeFileSync(file+'.html', d, 'utf-8');
		// 		}
		// 	});
		// }
	}


});
