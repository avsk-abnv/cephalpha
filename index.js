var express   	  =require("express"),
	back		  =require("express-back"),
	path	  	  =require("path"),
	app		  	  =express(),
	passport  	  =require("passport"),
	LocalStrategy =require("passport-local"),
    methodOverride=require("method-override"),
    flash		  =require("connect-flash"),
	bodyParser    =require("body-parser"),
	mongoose  	  =require("mongoose"),
	Insta    	  =require("./models/instapic"),
	User		  =require("./models/user"),
	Comment  	  =require("./models/comment");

var commentRoutes   = require("./routes/comments"),
	instapicRoutes  = require("./routes/instapics"),
	indexRoutes		= require("./routes/index");

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/instapics");
app.use(methodOverride("_method"));
app.listen(7007,function(){
	console.log("InstaClone Server is running");
});
//app.get("/",function(req,res){
	
//});
//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "There is a countdown.",
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(back());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error	   = req.flash("error");
	res.locals.success	   = req.flash("success");
	next();
});
app.use("/instapics",instapicRoutes);
app.use("/instapics/:id1/comments",commentRoutes);
app.use("/",indexRoutes);

app.get("/",function(req,res){
	res.redirect("/instapics");
});
app.get("*",function(req,res){
	res.send("<h3 style=\"color:red;\">We don't have what you're looking for :(</h3>")
});
