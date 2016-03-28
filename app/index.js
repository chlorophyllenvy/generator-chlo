var generators = require('yeoman-generator');
var fs = require('fs');
var jade = require('jade');
var html =  {
		'index' : jade.renderFile('app/index-page.jade', {pretty:true}),
		'footer' : jade.renderFile('app/footer-page.jade', {pretty:true})
	};
// var styl = jade.renderFile('app/gulp-file.jade', {type:'Less'});
// List of directories that will be created. Push whatever you need to into this array
var dirs = ['_src', '_src/js', '_src/style', 'styleguide', 'public', 'public/js', 'public/css', 'public/img', 'public/fonts', 'public/video', 'public/etc'];
// List of files that will be created.  Push whatever you need to into this array
var fls = ['index'];

module.exports = generators.Base.extend({
	templating: function() {
  		var done = this.async();
  		this.prompt({
  			type: 'list',
  			name: 'template',
  			message: 'What type of templating will you use?',
  			default: 'Jade',
  			choices: ['Jade', 'PHP']
  		}, function(answers) {
  			// if(answers.template === 'Jade') {this.log("Hurrah, it's Jade")};
  			// if(answers.template === 'PHP') {this.log("Oh yeah! We <3 PHP!")};
  			done();
  		}.bind(this));
  	},
  	styling: function() {
  		var done = this.async();
  		this.prompt({
  			type:'list',
  			name: 'style',
  			message: 'What will you use to write CSS?',
  			default: 'Less',
  			choices: ['less', 'stylus', 'sass']
  		}, function(answers) {
        var rs = answers.style;
        var jd = jade.renderFile('app/gulp-file.jade', {type:{rs: true}});
        fs.writeFile('./_src/gulpy.js', jd,'utf-8');
  			done();
  		}.bind(this))
  	},
  	// style: function() {
  	// 	fs.writeFile('gulpy.js', styl,'utf-8');
  	// },
  	isiFooter: function() {
  		var done = this.async();
  		this.prompt({
  			type: 'confirm',
  			name: 'footer',
  			message: 'Will you need an isiFooter?',
  			default: 'Yes'
  		}, function(answers) {
  			// this.log(answers.footer);
  			if(answers.footer) {
  				dirs.push('footer', 'footer/assets');
  				fls.push('footer/footer');
  			}
  			done();
  		}.bind(this));
  	},
	makeDirs: function() {
		// Array of directories to create
		dirs = dirs.sort();
		for (var dir in dirs) {
			fs.mkdir(dirs[dir], function(err, stat){if(err && err.code == "EEXIST"){ return;} });
		}
		for (var file in fls) {
			var string = fls[file];
			var splt = fls[file].lastIndexOf('/');
			var code = "";
			console.log(string, splt, string.slice(splt));
			splt < 0 ? code = html[fls[file]] : code = html[string.slice(splt+1)];
			fs.writeFile(fls[file]+'.html', code, 'utf-8', function(err, stat){if(err && err.code =='EEXIST'){ return; } });
		}
	}
});
