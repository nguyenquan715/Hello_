const models=require('../models');
const validator=require('validator');
const bcrypt=require('bcrypt');
module.exports={
	//Hiển thị home page
	home:(req,res)=>{
		res.render('index',{title:'Home'});
		res.end();
	},

	/*Sign up*/
	getSignup:(req,res)=>{
		res.render('signup',{title:'Sign Up'});
		res.end();
	},
	postSignup:(req,res)=>{
		let firstName=req.body.firstName;
		let lastName=req.body.lastName;
		let email=req.body.email;
		let password=req.body.password;
		let year=Number(req.body.yearOfBirth);
		let month=Number(req.body.monthOfBirth);
		let day=Number(req.body.dayOfBirth);
		let birthday=`${year}-${month}-${day}`;
		let gender=Number(req.body.gender);
		/*Validate input*/

		models.sequelize.query("select * from users where email='"+email+"' limit 1").then(([results,metadata])=>{
			if(!results[0]){
				password=bcrypt.hashSync(password,10);
				let query=`call insertUser('${firstName}','${lastName}','${email}','${password}','${birthday}',${gender});`
				models.sequelize.query(query).then(()=>{
					res.redirect('/signin');
					res.end();
				}).catch((err)=>{
					console.log(err);
					res.redirect('/error');
					res.end();
				});
			}else{
				res.send('Email was existed!');
				res.end();
			}
		}).catch((err)=>{
			console.log(err);
			res.redirect('/error');
			res.end();
		});
	},

	/*Sign in*/
	getSignin:(req,res)=>{
		res.render('signin',{title:'Sign In'});
		res.end();
	},
	postSignin:(req,res)=>{
		let email=req.body.email;
		let password=req.body.password;
		models.sequelize.query("select * from users where email='"+email+"' limit 1").then(([results,metadata])=>{
			if(results[0]){
				if(results[0]["blocked"]){
					res.redirect('/blocked');
					res.end();
				}
				else{
					if(bcrypt.compareSync(password,results[0]["password"])){
						if(results[0]["isAdmin"]){
							req.session.userId=results[0]["userId"];
							req.session.nickname=results[0]["lastName"]+' '+results[0]["firstName"];
							req.session.login=2;
							res.redirect('/admin');
						}else{
							req.session.userId=results[0]["userId"];
							req.session.nickname=results[0]["lastName"]+' '+results[0]["firstName"];
							req.session.login=1;
							res.redirect('/profile');
						}
						res.end();
					}else{
						res.send('User or Password incorrect!');
						res.end();
					}
				}				
			}else{
				res.send('User or Password incorrect!');
				res.end();
			}
		}).catch((err)=>{
			console.log(err);
			res.redirect('/error');
			res.end();
		});
	},
	/*Private Page*/
	profile:(req,res)=>{
		if(req.session.login){
			res.render('profile',{title:'Profile',nickname:req.session.nickname});
			res.end();
		}
		else{
			res.redirect('/error');
			res.end();
		}
	},
	chat:(req,res)=>{
		if(req.session.login){
			res.render('chat',{title:'Message',nickname:req.session.nickname});
			res.end();
		}
		else{
			res.redirect('/error');
			res.end();
		}
	},
	notifi:(req,res)=>{
		if(req.session.login){
			res.render('notifi',{title:'Notification',nickname:req.session.nickname});
			res.end();
		}
		else{
			res.redirect('/error');
			res.end();
		}
	},
	admin:(req,res)=>{
		if(req.session.login==2){
			res.render('admin',{title:'Admin',nickname:req.session.nickname});
			res.end();
		}
		else{
			res.redirect('/error');
			res.end();
		}
	},
	/*Error*/
	notFound:(req,res)=>{
		res.render('error',{title:"Error"});
		res.end();
	},
	blocked:(req,res)=>{
		res.render('block',{title:"Blocked"});
		res.end();
	},
	back:(req,res)=>{
		res.redirect('/notifi');
		res.end();
	},
	/*Log out*/
	signout:(req,res)=>{
		// models.sequelize.close((err)=>{
		// 	if(err) console.log(err);
		// 	else console.log("Closed connection!");
		// });
		req.session.destroy((err)=>{
			if(err) console.log(err);
			else console.log("Session was destroyed!");
		});
		res.redirect('/');
	}
}