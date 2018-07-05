var express   =require("express"),
	mongoose  =require("mongoose"),
	Comment   =require("./models/comment");
	app		  =express();

mongoose.connect("mongodb://localhost/instapics");
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
var Insta= mongoose.model("Instapic",instaSchema);
var newInsta1={image:"http://whc.unesco.org/uploads/thumbs/site_0252_0008-750-0-20151104103424.jpg",
			  title:"Taj Mahal",
			  description:"The Taj Mahal complex is believed to have been completed in its entirety in 1653 at a cost estimated at the time to be around 32 million rupees, which in 2015 would be approximately 52.8 billion rupees (U.S. $827 million). The construction project employed some 20,000 artisans under the guidance of a board of architects led by the court architect to the emperor, Ustad Ahmad Lahauri. The Taj Mahal was designated as a UNESCO World Heritage Site in 1983 for being \"the jewel of Muslim art in India and one of the universally admired masterpieces of the world's heritage\". It is regarded by many as the best example of Mughal architecture and a symbol of India\'s rich history. The Taj Mahal attracts 7–8 million visitors a year. In 2007, it was declared a winner of the New7Wonders of the World (2000–2007) initiative."
			},
	newInsta2={image:"https://media.indiatimes.in/media/content/2016/Dec/aa_1481184864.jpg",
			   title:"Indian Army Sniper",
			   description:"Snipers play an important role in the SBCT infantry battalion. They give the commander accurate, discriminatory, long-range small-arms fire. The best use of sniper fire is against key targets that other available weapon systems may be unable to destroy due to their range, size, or location; visibility; security and stealth requirements; avoidance of collateral damage; intensity of conflict; or rules of engagement. The techniques snipers use enable them to gather detailed, critical information about the enemy as a secondary role. The effectiveness of a sniper is not measured simply by the number of casualties or destroyed targets; sniper effectiveness also includes the effect the presence of snipers has on enemy activities, morale, and decisions. The presence of snipers hinders the enemy's movement, creates confusion and personal fear, disrupts enemy operations and preparations, and compels the enemy to divert forces to deal with the snipers."
	},
	newInsta3={image:"http://www.military-today.com/missiles/adats.jpg",
			   title:"Missile Tank",
			   description:"A missile tank is an armoured fighting vehicle fulfilling the role of a main battle tank, but using only guided missiles for main armament. Several nations have experimented with prototypes, notably the Soviet Union during the tenure of Nikita Khrushchev (projects Obyekt 167, Obyekt 137Ml, Obyekt 155Ml), but only the West German Jaguar 2 saw service as a standard vehicle, although the Soviet IT-1 missile tank also saw limited service. The term is sometimes applied more loosely to conventional tanks which are able to launch anti-tank guided missiles, to supplement their main gun for very long-range fire. Examples are the U.S.-German prototype MBT-70, the defunct U.S. M551 Sheridan and French AMX-13, and several Soviet, Russian, and Ukrainian tanks: T-64, T-72, T-80, T-84, and T-90. Some of the T-55\'s currently in use with the Peruvian Army also seem to have racks with missiles fitted to their turrets."
			},
	newInsta4={image:"http://mythologian.net/wp-content/uploads/2017/02/real-floki-from-vikings-1024x657.jpg",
				title:"Floki- The boat builder",
				description:"In 868, Flóki left to search for the land found by Garðar Svavarsson way up in the north.[1] He was accompanied by his family on his journey; his wife was named Gró and his children included Oddleifur and Þjóðgerður. From Western Norway he set sail to the Shetland Islands where it is said his daughter drowned. He continued his journey and landed in the Faroe Islands where another of his daughters was wed. There he took three ravens to help him find his way to Iceland, and thus, he was nicknamed Raven-Flóki (Old Norse and Icelandic: Hrafna-Flóki) and he is commonly remembered by that name"
	},
	newInsta5={image:"http://i.dailymail.co.uk/i/pix/2015/06/05/11/29604C6200000578-3112204-image-a-10_1433501036221.jpg",
				title:"Night King- Looking for you",
				description:"Night King's wall-tumbling new pet was actually spitting.  He said: “The way I looked at it was, when the sept burned down, that was green fire, and so then the dragon is going to have some kind of blueish fire.”  When you think about it, it does make sense because the beast does manage to bring down a vast frozen wall, and if he'd been breathing ice, he'd have just added another layer to it."
	},
	newInsta6={image:"http://static3.gamespot.com/uploads/screen_kubrick/1179/11799911/3164515-ds.jpg",
				title:"Death Stranding",
				description:"Death Stranding is an upcoming action video game developed by Kojima Productions and published by Sony Interactive Entertainment for PlayStation 4. It is the first game by game director Hideo Kojima and his company following the 2015 disbandment of Kojima Productions as a subsidiary of Konami and subsequent reformation as an independent studio. It was announced at Sony's E3 2016 conference, and has no set release date.  Actors Norman Reedus and Mads Mikkelsen will portray leading characters in the game through motion capture, facial scanning, and vocal performance; director Guillermo del Toro will also contribute his likeness to another character through facial and body scanning. The game's title is a reference to the cetacean stranding phenomenon."
	};

Insta.find({},function(err,allInsta){
	if(err)
		console.log("Sorry There has been some issue !");
	else if(allInsta.length<5)		
	{
		Insta.remove({},function(err,obj){
			if(err){
				console.log("There has been some issue !");
			}
		});
		Insta.create(newInsta1,function(err,insta){
			if(err){
				console.log(err);
			}
			else{
				console.log("A new insta has been created");
				console.log(insta);
			}
		});
		Insta.create(newInsta2,function(err,insta){
			if(err){
				console.log(err);
			}
			else{
				console.log("A new insta has been created");
				console.log(insta);
			}
		});
		Insta.create(newInsta3,function(err,insta){
			if(err){
				console.log(err);
			}
			else{
				console.log("A new insta has been created");
				console.log(insta);
			}
		});
		Insta.create(newInsta4,function(err,insta){
			if(err){
				console.log(err);
			}
			else{
				console.log("A new insta has been created");
				console.log(insta);
			}
		});
		Insta.create(newInsta5,function(err,insta){
			if(err){
				console.log(err);
			}
			else{
				console.log("A new insta has been created");
				console.log(insta);
			}
		});
		Insta.create(newInsta6,function(err,insta){
			if(err){
				console.log(err);
			}
			else{
				console.log("A new insta has been created");
				console.log(insta);
			}
		});
	}
	else if(allInsta.length==3)
	{
		console.log("Data is already seeded..");	
	}
});
/*Insta.create(newInsta1,function(err,insta){
		if(err){
			console.log(err);
		}
		else{
			console.log("A new insta has been created");
			console.log(insta);
		}
});
Insta.create(newInsta2,function(err,insta){
		if(err){
			console.log(err);
		}
		else{
			console.log("A new insta has been created");
			console.log(insta);
		}
});
Insta.create(newInsta3,function(err,insta){
		if(err){
			console.log(err);
		}
		else{
			console.log("A new insta has been created");
			console.log(insta);
		}
});*/