var generators = require('yeoman-generator');
var fs = require('fs');
var jade = require('jade');
var html =  {
		'index' : jade.renderFile('app/index-page.jade', {pretty:true}),
		'footer' : jade.renderFile('app/footer-page.jade', {pretty:true})
	};
var cssLess = false,
cssStylus = false,
cssSass = false;
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
  			choices: ['Less', 'Stylus', 'Sass']
  		}, function(answers) {
        switch(answers.style) {
          case 'Less':
          cssLess = true;
          break;
          case 'Stylus':
          cssStylus = true;
          break;
          case 'cssSass':
          cssSass = true;
          break;
        }
        // var rs = answers.style;
        // var concat = 'css+rs;
        // var concat = true;
  			done();
  		}.bind(this))
  	},
  	isiFooter: function() {
  		var done = this.async();
  		this.prompt({
  			type: 'confirm',
  			name: 'footer',
  			message: 'Will you need an isiFooter?',
  			default: 'yes'
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
    // Files to write
		for (var file in fls) {
			var string = fls[file];
			var splt = fls[file].lastIndexOf('/');
			var code = "";
			console.log(string, splt, string.slice(splt));
			splt < 0 ? code = html[fls[file]] : code = html[string.slice(splt+1)];
			fs.writeFile(fls[file]+'.html', code, 'utf-8', function(err, stat){if(err && err.code =='EEXIST'){ return; } });
		}

    // Write Gulp File
    console.log(cssLess, cssStylus, cssSass);
    var glp = jade.renderFile('app/gulp-file.jade', {type:{less: cssLess, stylus: cssStylus, sass:cssStylus}});
    console.log(glp)
    fs.writeFile('./_src/gulpfile.js', glp,'utf-8');
	}
});
