//============
//AUTH ROUTES
//============
var express = require("express");
var router	= express.Router();
var passport= require("passport");
var User    = require("../models/user");

router.get("/register",function(req,res){
	res.render("auths/register",{flag:false});
});
router.post("/register",function(req,res){
	if(req.body.password==req.body.cnfpassword)
	{
		var newUser= new User({username: req.body.username});
		User.register(newUser,req.body.password,function(err,user){
			if(err){
				console.log(err);
				req.flash("error",err);
				return res.render("auths/register",{flag:false});
			}
			passport.authenticate("local")(req,res,function(){
				req.flash("success","Welcome "+req.user.username +" ! Hope you'll love InstaClone");
				res.redirect("/instapics");
			});
		});
	}
	else{
		return res.render("register",{flag:true});
	}
});
router.get("/login/wrongcredentials",function(req,res){
	req.flash("error","Wrong username or password ! Please enter the correct one..");
	res.redirect("/login");
});
router.get("/login/successfull",function(req,res){
	req.flash("success","Welcome back !");
	res.redirect("/instapics");
});
router.get("/login",function(req,res){
	res.render("auths/login");
});
router.post("/login",passport.authenticate("local",
	{	successRedirect: "/login/successfull",
		failureRedirect: "/login/wrongcredentials"
	
	}),function(req,res){
});
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","You've been logged out successfully..");
	res.redirect("/instapics");
});

//============
//Middlewares
//============
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