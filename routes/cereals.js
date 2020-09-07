const express = require('express');
const router = express.Router();
const Cereal = require("../models/cereal");
const Comment = require("../models/comment");
const { isLoggedIn, checkUserCereal } = require('../config/index');


// ALL CEREALS
router.get("/", async (req, res) => {
    try {
        const data = await Cereal.find().exec();
        res.render("cereals/cereals", {data, search: false});
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/');
    }
})

// NEW CEREAL
router.post("/", isLoggedIn, async (req, res) => {
    try {
        const newCereal = {
            author: {
                id: req.user._id,
                username: req.user.username
            },
            name: req.body.name,
            description: req.body.description,
            brand: req.body.brand,
            imageURL: req.body.imageURL
        };
        const cereal = await Cereal.create(newCereal);
        req.flash('success', 'Successfully added the cereal.')
        res.redirect("/cereals/" + cereal._id);
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/');
    }
});

router.get("/new", isLoggedIn, (req, res) => {
    res.render("cereals/new");
});

// SEARCH CEREAL
router.get("/search", async (req, res) => {
    try {
        const data = await Cereal.find({
            $text: {
                $search: req.query.s,
                $caseSensitive: false
            }}).exec()
        res.render("cereals/cereals", {data, search: true});
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/');
    }
});

// SHOW CEREAL
router.get("/:id", async (req, res) => {
    try {
        const cereal = await Cereal.findById(req.params.id).exec();
        const comments = await Comment.find({cerealId: req.params.id});
        res.render("cereals/show", {cereal, comments});
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/');
    }
});

// EDIT CEREAL
router.put("/:id", isLoggedIn, checkUserCereal, async (req, res) => {
    try {
        const cereal =  {
            author: {
                id: req.user._id,
                username: req.user.username
            },
            name: req.body.name,
            description: req.body.description,
            brand: req.body.brand,
            imageURL: req.body.imageURL,
            createdAt: req.cereal.createdAt ? req.cereal.createdAt : Date.now()
        };
        await Cereal.findByIdAndUpdate(req.params.id, cereal, {new: true}).exec();
        req.flash('success', 'Successfully updated the cereal.');
        res.redirect("/cereals/" + req.params.id);
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/');
    }
});

router.get("/:id/edit", isLoggedIn, checkUserCereal, (req, res) => {
    try {
        res.render("cereals/edit", {cereal: req.cereal});
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/');
    }
});

// DELETE CEREAL
router.delete("/:id", isLoggedIn, checkUserCereal, async (req, res) => {
    try {
        await Comment.deleteMany({
            cerealId: {
                $in: req.params.id
            }
        }).exec();
        await Cereal.findByIdAndDelete(req.params.id).exec();
        req.flash('success', 'Succesfully deleted the cereal from the catalog.');
        res.redirect("/cereals");
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/');
    }
});

module.exports = router;