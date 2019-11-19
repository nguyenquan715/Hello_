const models=require('../models');

module.exports={
	info:(req,res)=>{
		let id=req.session.userId;
		let query="select * from users where userId="+id;
		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		})
	},
	edit:(req,res)=>{
		let id=req.session.userId;
		let firstName=req.body.firstName;
		let lastName=req.body.lastName;
		let birthday=new Date(Number(req.body.yearOfBirth),Number(req.body.monthOfBirth)-1,Number(req.body.dayOfBirth));
		let gender=req.body.gender;
		models.user.update({firstName:firstName,lastName:lastName,birthday:birthday,gender:gender},{where:{userId:id}}).then(()=>{
			res.redirect('/profile');
			res.end();
		}).catch((err)=>{
			console.log(err);
		})
	}
}