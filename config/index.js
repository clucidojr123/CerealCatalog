const Cereal = require('../models/cereal');
const Comment = require('../models/comment');

module.exports = {
	isLoggedIn: (req, res, next) => {
		if (req.isAuthenticated()) { 
            return next(); 
        }
		req.flash('error', 'You must be logged in to update/add to the catalog.');
		res.redirect('/login');
	},
	isAdmin: (req, res, next) => {
		if (req.user.isAdmin) { 
            return next(); 
        }
		req.flash('error', 'You do not have permission to do that.');
		res.redirect('back');
	},
	checkUserCereal: async (req, res, next) => {
        try {
			const cereal = await Cereal.findById(req.params.id).exec();
            if (!cereal) {
				req.flash('error', 'That cereal does not exist.');
                res.redirect('/cereals');
            } else if (cereal.author.id.equals(req.user._id) || req.user.isAdmin) {
				req.cereal = cereal;
				next();
			} else {
				req.flash('error', 'You do not have permission to do that.');
				res.redirect('/cereals/' + req.params.id);
			}
        } catch (err) {
			console.error(err);
            res.send(err);
        }
	},
	checkUserComment: async (req, res, next) => {
        try {
            const comment = await Comment.findById(req.params.commentId).exec();
            if (!comment) {
				console.error(error);
				req.flash('error', 'That comment does not exist.');
                res.redirect('/cereals/' + req.params.id);
            } else if (comment.author.id.equals(req.user._id) || req.user.isAdmin) {
				req.comment = comment;
				next();
			} else {
				req.flash('error', 'You do not have permission to do that');
				res.redirect('/cereals/' + req.params.id);
			}
        } catch (err) {
			console.error(err);
            res.send(err);
        }
	},
};