const express = require('express');
const router = express.Router({mergeParams: true});
const Cereal = require("../models/cereal");
const Comment = require("../models/comment");
const { isLoggedIn, checkUserComment } = require('../config/index');

// NEW COMMENT
router.get("/new", isLoggedIn, async (req, res) => {
    try {
        const cereal = await Cereal.findById(req.params.id).exec();
        res.render("comments/new", {cereal});
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/');
    }
});

router.post("/", isLoggedIn, async (req, res) => {
    try {
        const newComment = {
            cerealId: req.params.id,
            author: {
                id: req.user._id,
                username: req.user.username
            },
            text: req.body.text
        };
        await Comment.create(newComment);
        req.flash('success', 'Successfully created the comment.');
        res.redirect("/cereals/" + req.params.id);
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/');
    }
});

// EDIT COMMENT
router.get("/:commentId/edit", isLoggedIn, checkUserComment, (req, res) => {
    try {
        res.render("comments/edit", {comment: req.comment});
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/');
    }
});

router.put("/:commentId", isLoggedIn, checkUserComment, async (req, res) => {
    try {
        const newComment = {
            cerealId: req.params.id,
            author: {
                id: req.user._id,
                username: req.user.username
            },
            text: req.body.text,
            createdAt: req.comment.createdAt
        };
        await Comment.findByIdAndUpdate(req.params.commentId, newComment, {new: true}).exec();
        req.flash('success', 'Successfully edited the comment.');
        res.redirect("/cereals/" + req.params.id);
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/');
    }
});

// DELETE COMMENT
router.delete("/:commentId", isLoggedIn, checkUserComment, async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.commentId).exec();
        req.flash('success', 'Succesfully deleted the comment.');
        res.redirect("/cereals/" + req.params.id);
    } catch (err) {
        console.error(err);
        req.flash('error', err.message);
        res.redirect('/');
    }
});

module.exports = router;