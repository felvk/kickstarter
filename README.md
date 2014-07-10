About the kickstarter
°°°°°°°°°°°°°°°°°°°°°

It is a collection of pre-defined toolsets for front-end development.
In the src directory you'll find all the files for develplment. In here you can use Jade templates for html, Sass for CSS, Bootstrap and Compass. 
The gulp taskrunner watches the changes in the src directory and generates the files for production usage in the build directory.

You can configure the tasks in the gulpfile.js (for more infos visit: www.gulpjs.com)




Get the kickstarter started
°°°°°°°°°°°°°°°°°°°°°°°°°°°

FIRST: To get the system running, you have to install the following tools:

  - node.js
      download installer on www.nodejs.org

  - ruby
      win: www.rubyinstaller.org
      mac: already pre-installed on mac osx

  - sass
      cli: gem install -g sass

  - bootstrap-sass
      cli: gem install -g bootstrap-sass

  - compass
      cli: gem update --system
      cli: gem install compass

  - gulp
      cli: npm install -g gulp



THEN: In you terminal navigate into you project directory and install the dependencies for the kickstarter:

  - npm install gulp gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-uglify gulp-imagemin gulp-rename gulp-clean gulp-concat gulp-notify gulp-cache gulp-livereload gulp-compass gulp-jade gulp-express-service gulp-flatten gulp-browserify --save-dev



FINALLY: In you project directory root start the node.js Server and the gulp taskrunner

  - node server.js
  - gulp