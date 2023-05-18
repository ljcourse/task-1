const express = require('express');
const morgan = require('morgan');
const app = express();
const db = require('./pkg/db/index');
const auth = require('./controllers/authController');
const academy = require('./controllers/academyController');
const course = require('./controllers/courseController');
const academy0= require('./controllers/academyPostman');
const cookieParser = require("cookie-parser");

db.init();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(cookieParser());

//ejs
app.post('/test', auth.signUp);
app.post('/auth/test', auth.login);
app.post('/logout',auth.logout);
app.get('/test',academy.getAcademy);
app.get('/welcome',auth.protect,academy.getBlogView);
app.post('/welcome',academy.createBlog);
app.post('/welcome/delete/:id',academy.deleteBlog);
app.post('/welcome/update/:id',academy.updateBlog);

//postman
app.route('/course')
.get(course.getAll)
.post(course.create);

app.route('/course/:id')
.patch(course.update)
.get(course.getOne)
.delete(course.delete);

app.route('/academy')
.get(academy0.getAll)
.post(academy0.create);

app.route('/academy/:id')
.patch(academy0.update)
.get(academy0.getOne)
.delete(academy0.delete);

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('success');
});