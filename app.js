// IMPORTS
require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

// ROUTE IMPORTS
const passportConfig = require("./config/passport-conifg"); // eslint-disable-line
const cerealRouter = require("./routes/cereals");
const indexRouter = require("./routes/index");
const commentRouter = require("./routes/comments");

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
	next();
});

// MONGODB CONFIG
mongoose.connect(process.env.DBCONNECT, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true
});

// ROUTE CONFIG
app.use("/", indexRouter);
app.use("/cereals", cerealRouter);
app.use("/cereals/:id/comments", commentRouter);
app.get("*", (req, res) => {
    res.status(404).render('error');
})

app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});

/* 
    TODO:
    - add user profile / option to delete account
    - Add sort by option to cereals page
    - Switch to file upload instead of image link
    - Add mailer to confirm register
 */

