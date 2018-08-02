const gulp = require('gulp');
const del = require('del');
const spritesmith = require('gulp.spritesmith');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rigger = require('gulp-rigger');
const rename = require('gulp-rename');
const prefix = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const plumber = require('gulp-plumber');
const svgSprite = require('gulp-svg-sprites');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const babel = require('gulp-babel');
const notifier = require('node-notifier');
const eslint = require('gulp-eslint');
const path = require('path');
const sassLint = require('sass-lint');
const through = require('through2');
const svgToSss = require('gulp-svg-to-css');
const insert = require('gulp-insert');
const runSequence = require('run-sequence');

const { reload } = browserSync;

const pathes = {
  dist: {
    html: 'dist/html',
    js: 'dist/js',
    css: 'dist/css',
    sprites: 'dist/images/sprites',
    img: 'dist/images',
    fonts: 'dist/fonts',
  },
  src: {
    html: 'src/html',
    js: 'src/js',
    sass: 'src/sass',
    img: 'src/images',
    svg: 'src/images-sprite/svg-sprite',
    cssIcons: 'src/images-sprite/css-sprite',
    templates: 'src/templates',
    fonts: 'src/fonts',
  },
};

const config = {
  jsBuild: [
    `${pathes.src.js}/libs/jQuery/jquery-3.3.1.min.js`,
    `${pathes.src.js}/libs/bootstrap/bootstrap.js`,
    `${pathes.src.js}/libs/jquery-ui/jquery-ui-1.10.3.custom.min.js`,
    `${pathes.src.js}/libs/jquery-validate/jquery-validate.min.js`,
    `${pathes.src.js}/libs/masked-input/jquery.maskedinput.min.js`,
    `${pathes.src.js}/libs/colorbox/jquery.colorbox-min.js`,
    `${pathes.src.js}/libs/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js`,
    `${pathes.src.js}/libs/mCustomScrollbar/jquery.mCustomScrollbar.js`,
    `${pathes.src.js}/libs/jquery-revolution/jquery.themepunch.revolution.min.js`,
    `${pathes.src.js}/libs/slick/slick.min.js`,
    `${pathes.src.js}/main.js`,
  ],
};

function plumberFn(error) {
  notifier.notify(error.message);
}

gulp.task('clean', () => {
  const vals = [];
  for (const key in pathes.dist) {
    vals.push(pathes.dist[key]);
  }
  return del.sync(vals);
});

gulp.task('copy', () => {
  gulp
    .src(`${pathes.src.fonts}/**/*`)
    .pipe(gulp.dest(`${pathes.dist.fonts}`));
});

gulp.task('sass-lint', () =>
  gulp.src([`${pathes.src.sass}/**/*.s+(a|c)ss`, `!${pathes.src.sass}/libs/**/*`]).pipe(
    through.obj((chunk, enc, cb) => {
      const file = chunk;
      const userOptions = {};

      // load our config from sassLint and the user provided options if available
      file.sassConfig = sassLint.getConfig(userOptions);
      // save the config file within the file object for access when this file is piped around
      file.userOptions = userOptions;

      // lint the file and pass the user defined options and config path to sass lint to handle
      file.sassLint = [
        sassLint.lintFileText(
          {
            text: file.contents,
            format: path.extname(file.path).replace('.', ''),
            filename: path.relative(process.cwd(), file.path),
          },
          userOptions
        ),
      ];

      // show messages
      if (file.sassLint[0].warningCount > 0 || file.sassLint[0].errorCount > 0) {
        const message = file.sassLint[0].messages
          .map(m => `${m.message} ${m.line}:${m.column} (${m.ruleId})`)
          .join(',\n');

        notifier.notify({
          title: `SCSS: ${path.basename(file.path)}`,
          message,
        });

        console.log(file.path, message);
      }
      cb(null, file);
    })
  )
);

gulp.task('html', () =>
  gulp
    .src(`${pathes.src.html}/*.html`)
    .pipe(plumber(plumberFn))
    .pipe(rigger())
    .pipe(gulp.dest(pathes.dist.html))
    .pipe(reload({ stream: true }))
);

gulp.task('html-watch', ['html'], reload);

gulp.task('icons-to-scss', () =>
  gulp
    .src(`${pathes.src.cssIcons}/**/*.svg`)
    .pipe(
      cheerio({
        run: function run($) {
          $('[svg]').attr('width', '100%');
          $('[svg]').attr('height', '100%');
        },
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(
      svgToSss({
        name: 'icons.scss',
        prefix: 'icon-',
        template: `.{{prefix}}{{filename}}{{postfix}}:after { background-image: url('{{{dataurl}}}'); }`,
      })
    )
    .pipe(
      insert.prepend(`// generated SVG icons
      [class*='icon-']:after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      }\n\n`)
    )
    .pipe(gulp.dest(pathes.src.sass))
    .pipe(reload({ stream: true }))
);

gulp.task('sass', () =>
  gulp
    .src([`${pathes.src.sass}/style.scss`])
    .pipe(plumber(plumberFn))
    .pipe(sass())
    .pipe(prefix(['< 1%', 'ie 10']))
    .pipe(gulp.dest(pathes.dist.css))
    .pipe(reload({ stream: true }))
);

gulp.task('css-min-style', ['sass'], () =>
  gulp
    .src([`${pathes.dist.css}/style.css`])
    .pipe(plumber(plumberFn))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(pathes.dist.css))
    .pipe(reload({ stream: true }))
);

gulp.task('js', () =>
  gulp
    .src(config.jsBuild)
    .pipe(plumber(plumberFn))
    .pipe(
      babel({
        presets: ['env'],
      })
    )
    .pipe(concat('build.js'))
    .pipe(uglify())
    .pipe(gulp.dest(pathes.dist.js))
    .pipe(reload({ stream: true }))
);

gulp.task('img', () =>
  gulp
    .src(`${pathes.src.img}/**/*`)
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{ removeViewBox: true }],
        use: [pngquant()],
      })
    )
    .pipe(gulp.dest(pathes.dist.img))
);

gulp.task('svg-sprite-build', () =>
  gulp
    .src(`${pathes.src.svg}/**/*`)
    // minify svg
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    // remove all fill and style declarations in out shapes
    .pipe(
      cheerio({
        run: function run($) {
          $('[fill^="#"]').removeAttr('fill');
          $('[style]').removeAttr('style');
          $('[class]').removeAttr('class');
          $('[id]').removeAttr('id');
          $('style').remove();
          $('title').remove();
        },
        parserOptions: { xmlMode: true },
      })
    )
    // cheerio plugin create unnecessary string '>', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(
      svgSprite({
        mode: 'symbols',
        preview: false,
        svg: {
          symbols: 'sprite.html',
        },
      })
    )
    .pipe(gulp.dest(`${pathes.src.html}/include`))
);



gulp.task('build', callback => {
  runSequence(
    'clean',
    ['copy', 'html', 'js', 'svg-sprite-build', 'img'],
    'css-min-style',
    callback
  );
});

gulp.task('watch', ['build'], () => {
  browserSync({ server: './dist' });

  gulp.watch(`${pathes.src.html}/**/*.html`, ['html-watch']);
  gulp.watch(`${pathes.src.js}/**/*.js`, ['js']);
  gulp.watch([`${pathes.src.sass}/**/*.scss`], ['css-min-style', 'sass-lint']);
  gulp.watch(`${pathes.src.img}/**/*`, ['img']);
  gulp.watch(`${pathes.src.svg}/*.svg`, ['svg-sprite-build']);
});

gulp.task('default', ['watch']);
