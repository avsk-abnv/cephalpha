//=================
//Instapics Routes
//=================
var express = require("express");
var router	= express.Router();
var Insta   =require("../models/instapic");

router.get("/",function(req,res){
	Insta.find({},function(err,allInsta){
		if(err){
			console.log(err);
		}else{
			console.log(allInsta.length);
			res.render("instapics/instahome",{allInsta:allInsta});
		}
	});
});

router.get("/new",isLoggedIn,function(req,res){
	res.render("instapics/addnew");
});
router.post("/new",isLoggedIn,function(req,res){
	Insta.create(req.body.insta,function(err,instapic){
		if(err){
			console.log(err);
			req.flash("error","Sorry ! Something went wrong..");
			res.redirect("/instapics");
		}else{
			req.flash("success","Post has been added successfully !");
			res.redirect("/instapics");
		}
	});
});
router.get("/:id",function(req,res){
	Insta.findById(req.params.id).populate("comments").exec(function(err,foundinsta){
		if(err){
			console.log(err);
		}else{
			res.render("instapics/instaDetail",{insta:foundinsta});
		}
	});
});
router.get("/:id/delete",isLoggedIn,function(req,res){
	Insta.findById(req.params.id,function(err,foundinsta){
		if(err){
			console.log(err);
		}else{
			res.render("instapics/confirmDelete",{insta:foundinsta});
		}
	});
});
router.delete("/:id",isLoggedIn,function(req,res){
	Insta.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log("there has been some issue !");
			console.log(err);
			req.flash("error","Sorry ! Something went wrong..");
			res.redirect("/instapics");
		}
		else{
			req.flash("success","Post has been successfully deleted");
			res.redirect("/instapics");
		}
	});
//	res.send("Of course I'm gonna delete this, not now though !")
});
router.get("/:id/edit",isLoggedIn,function(req,res){
	Insta.findById(req.params.id,function(err,foundinsta){
		if(err){
			console.log(err);
		}
		else{
			res.render("instapics/editform",{insta:foundinsta});
		}
	});
});
router.put("/:id",isLoggedIn,function(req,res){
	Insta.findByIdAndUpdate(req.params.id,req.body.insta,function(err,upadtedOne){
		if(err){
			console.log(err);
			req.flash("error","Sorry ! Something went wrong..");
			res.redirect("/instapics");
		}
		else{
			req.flash("success","Post has been successfully updated");
			res.redirect("/instapics");
		}
	});
});
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be Logged in to do that !");
	res.redirect("/login");
}
module.exports = router;