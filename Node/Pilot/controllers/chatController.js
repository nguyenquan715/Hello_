const models=require('../models');

module.exports={
	/* Danh sách bạn bè*/
	friends:(req,res)=>{
		let id=req.session.userId;
		let query=`call listFriend(${id});`
		models.sequelize.query(query).then((results)=>{
			console.log(results);
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	/* Danh sách group chat*/
	groups:(req,res)=>{
		let userId=req.session.userId;
		let query=`call listGroup(${userId});`
		models.sequelize.query(query).then((results)=>{
			console.log(results);
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	/*Tìm thành viên cho group*/
	search:(req,res)=>{
		let key=req.params["keyWord"];
		let id=req.session.userId;
		let query="select f.userId2 userId,concat(u.lastName,' ',u.firstName) fullName "+
		"from users u "+
		"inner join friends f on f.userId2=u.userId "+
		"where f.userId1="+id+" and(lastName like '%"+key+"%' or firstName like '%"+key+"%');";
		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	}
}