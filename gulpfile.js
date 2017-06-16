 var gulp          = require('gulp');
 var postcss       = require('gulp-postcss');
 var pcsarithmetic = require('./index.js');

 gulp.task('css', function() {
 	var processors = [
 		pcsarithmetic({
 			//calcMultipleUnits: false
 		})
 	];
 	return gulp.src('src/css/*.css')
 		   .pipe(postcss(processors))
 		   .pipe(gulp.dest('src/dist/css'));
 });