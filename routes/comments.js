//================
//COMMENTS ROUTES
//================
var express = require("express");
var router	= express.Router({mergeParams:true});
var Insta 	= require("../models/instapic");
var Comment = require("../models/comment");
router.post("/",isLoggedIn,function(req,res){
	Insta.findById(req.params.id,function(err,foundinsta){
		if(err){
			console.log(err);
			req.flash("error","Sorry ! Something Went Wrong..");
			res.redirect("/instapics/"+req.params.id);
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
					res.redirect("/instapics/"+req.params.id);
				}else{
					comment.author.id= req.user._id;
					comment.author.username= req.user.username;
					comment.save();
					foundinsta.comments.push(comment);
					foundinsta.save();
					console.log(comment);
					req.flash("success","Your comment has been added..");
					res.redirect("/instapics/"+foundinsta._id);
				}
			});
		}
	});
});
router.get("/:id2",checkCommentOwnership,function(req,res){
	Insta.findById(req.params.id1).populate("comments").exec(function(err,foundinsta){
		foundinsta.comments.forEach(function(comment){
			if(comment._id.toString()==req.params.id2.toString()){
				res.render("comments/commentEdit",{insta:foundinsta,cid:comment._id.toString()});
			}
		});
	});
});
router.put("/:id2",checkCommentOwnership,function(req,res){
		Insta.findById(req.params.id1).populate("comments").exec(function(err,foundinsta){
			Comment.findByIdAndUpdate(req.params.id2,req.body.comment,function(err,foundComment){
				if(err){
					console.log(err);
					req.flash("error","Sorry ! Something Went Wrong..");
					res.redirect("/instapics/"+req.params.id1);
				}else{
					req.flash("success","Comment has been updated successfully..");
					res.redirect("/instapics/"+req.params.id1);
				}
			});	
		});
});
router.get("/:id2/wannadelete",checkCommentOwnership,function(req,res){
	Insta.findById(req.params.id1).populate("comments").exec(function(err,foundinsta){
		foundinsta.comments.forEach(function(comment){
			if(comment._id.toString()==req.params.id2.toString()){
				res.render("comments/confirmCommentDelete",{insta:foundinsta,cid:comment._id.toString()});
			}
		});
	});
});
router.delete("/:id2",checkCommentOwnership,function(req,res){
	Insta.findById(req.params.id1).populate("comments").exec(function(err,foundinsta){
			Comment.findByIdAndRemove(req.params.id2,function(err){
				if(err){
					req.flash("error","Sorry ! Something Went Wrong..");
					console.log(err);
					res.redirect("/instapics/"+req.params.id1);
				}else{
					req.flash("success","Your comment has been successfully deleted..");
					res.redirect("/instapics/"+req.params.id1);
				}
			});	
		});
});
//router.get("/getback",function(req,res){
//	return res.back();
//});
function checkCommentOwnership(req,res,next){
	back=req.header('Referer') || '/';
	if(req.isAuthenticated()){
		Comment.findById(req.params.id2,function(err,foundComment){
			if(err){
				req.flash("error","Sorry ! Something Went Wrong..");
				return res.back();
			}else{
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","Sorry ! You're not authorized to perform this action..");
					return res.back();
				}
			}
		});
	}else{
		req.flash("error","You need to be Logged in to do that !");
		res.redirect("/login");
	}
}
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be Logged in to do that !");
	res.redirect("/login");
}
module.exports = router;