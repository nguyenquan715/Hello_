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
		res.setHeader("Content-Type", "text/html");
		res.render('signup',{title:'Sign Up'});
		res.end();
	},
	postSignup:(req,res)=>{
		let firstName=req.body.firstName;
		let lastName=req.body.lastName;
		let email=req.body.email;
		let password=req.body.password;
		let birthday=new Date(Number(req.body.yearOfBirth),Number(req.body.monthOfBirth)-1,Number(req.body.dayOfBirth));
		let gender=req.body.gender;
		/*Validate input*/

		models.sequelize.query("select * from users where email='"+email+"'").then(([results,metadata])=>{
			if(!results[0]){
				password=bcrypt.hashSync(password,10);
				models.user.create({firstName:firstName,lastName:lastName,email:email,password:password,birthday:birthday,gender:gender}).then(()=>{
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
		models.sequelize.query("select * from users where email='"+email+"'").then(([results,metadata])=>{
			if(results[0]){
				if(bcrypt.compareSync(password,results[0]["password"])){
					if(results[0]["isAdmin"]){
						req.session.login=2;
						res.redirect('/admin');
					}else{
						req.session.userId=results[0]["userId"];
						req.session.nickname=results[0]["lastName"]+' '+results[0]["firstName"];
						req.session.login=1;
						res.redirect('/user');
					}
					res.end();
				}else{
					res.send('User or Password incorrect!');
					res.end();
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
	user:(req,res)=>{
		if(req.session.login==1){
			res.render('user',{title:'Profile',nickname:req.session.nickname});
			res.end();
		}
		else{
			res.redirect('/error');
			res.end();
		}
	},
	admin:(req,res)=>{
		if(req.session.login==2){
			res.render('admin',{title:'Admin',userProfile:{nickname:"Admin",country:"VietNam"}});
			res.end();
		}
		else{
			res.redirect('/error');
			res.end();
		}
	},

	/*Error*/
	notFound:(req,res)=>{
		res.render('notFound',{title:"Error"});
		res.end();
	},

	/*Trang hiển thị thông báo và tìm bạn bè*/
	/*Test*/
	notifi:(req,res)=>{
		/*Xác minh session trước*/
		res.render('notifi',{title:'Notification',nickname:req.session.nickname});
	},

	/*Log out*/
	logout:(req,res)=>{
		req.session.destroy((err)=>{
			if(err) console.log(err);
			else console.log("Session was destroyed!");
		});
		res.redirect('/');
	}
}