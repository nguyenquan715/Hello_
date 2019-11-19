const models=require('../models');

module.exports={
	/* Danh sách bạn bè*/
	friends:(req,res)=>{
		let id=req.session.userId;
		let query="select c.chatRoomId,concat(u.lastName,' ',u.firstName) fullName "+
				  		"from chatrooms c "+
						"inner join chatroommembers cm on cm.chatRoomId=c.chatRoomId "+
						"inner join users u on u.userId=cm.userId "+
						"where c.chatRoomId in (select chatRoomId from chatroommembers where userId="+id+") and u.userId!="+id+" and c.chatRoomType=true;"
		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	/* Danh sách group chat*/
	groups:(req,res)=>{
		let userId=req.session.userId;
		let query="select c.chatRoomId, c.chatRoomName "+
		"from chatrooms c "+
		"inner join chatroommembers cm on cm.chatRoomId=c.chatRoomId "+
		"inner join users u on u.userId=cm.userId "+
		"where c.chatRoomType=false and cm.userId="+userId;
		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	}
}