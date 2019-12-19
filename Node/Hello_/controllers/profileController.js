const models=require('../models');

module.exports={
	/*Thông tin user*/
	info:(req,res)=>{
		let id=req.session.userId;
		let query="select * from users where userId="+id+" limit 1;";
		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		})
	},
	/*Sửa thông tin user*/
	edit:(req,res)=>{
		let id=req.session.userId;
		let firstName=req.body.firstName;
		let lastName=req.body.lastName;
		req.session.nickname=lastName+' '+firstName;
		let year=Number(req.body.yearOfBirth);
		let month=Number(req.body.monthOfBirth);
		let day=Number(req.body.dayOfBirth);
		let birthday=`${year}-${month}-${day}`;
		let gender=Number(req.body.gender);
		let query=`call updateUser(${id},'${firstName}','${lastName}','${birthday}',${gender});`
		models.sequelize.query(query).then(()=>{
			res.redirect('/profile');
			res.end();
		}).catch((err)=>{
			console.log(err);
		})
	}
}