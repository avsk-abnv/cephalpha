var mongoose= require("mongoose");
var instaSchema= new mongoose.Schema({
	image: String,
	title: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports =mongoose.model("Instapic",instaSchema);