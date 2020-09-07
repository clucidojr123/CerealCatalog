const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

// LANDING PAGE
router.get("/", (req, res) => {
    res.render("index");
});  

// LOGIN
router.get("/login", (req, res) => {
    if(req.user) {
        req.flash('error', 'You are already logged in.');
        res.redirect('/');
    } else
        res.render("auth/login");
});

router.post('/login', passport.authenticate('local', { 
    successRedirect: '/cereals',
    successFlash: 'Successfully logged in. Welcome to the Cereal Catalog!',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.' })
);

// LOGOUT
router.get('/logout', (req, res) => {
    if(!req.user) {
        req.flash('error', 'Unable to log out - you weren\'t logged in!');
        res.redirect('/cereals');
    } else {
        req.logout();
        req.flash('success', 'Successfully logged out.');
        res.redirect('/');
    }
});

// REGISTER
router.get("/register", (req, res) => {
    if(req.user) {
        req.flash('error', 'Please log out before registering a new account.');
        req.redirect('/');
    } else
        res.render("auth/register");
});

router.post("/register", (req, res) => {
    try {
        const newUser = {
            email: req.body.email,
            username: req.body.username,
        };
        User.register(newUser, req.body.password, (err) => {
            if(err) {
                req.flash('error', err.message);
                res.redirect('/register');
            }
            passport.authenticate('local')(req, res, function() {
                req.flash('success', 'Successfully registered. Welcome to the Cereal Catalog!');
                res.redirect('/cereals');
            });
        });
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/');
    }
});


module.exports = router;