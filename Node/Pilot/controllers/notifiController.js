const models=require('../models');

module.exports={
	/*Tìm kiếm User*/
	search:(req,res)=>{
		let keyWord=req.params["keyWord"];
		let id=req.session.userId;
		let query="select userId, concat(lastName,' ',firstName) fullName,blocked from users where userId !="+id+" and (lastName like '%"+keyWord+"%' or firstName like '%"+keyWord+"%')";
		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	/*Id của user*/
	id:(req,res)=>{
		var obj={};
		obj.id=req.session.userId
		res.send(obj);
		res.end();
	},
	/*Thêm bạn bè*/
	addFriend:(req,res)=>{
		let sender=req.body['sender'];
		let receiver=req.body['receiver'];
		let name=req.body['name'];
		let chatRoomName=`${name}-${req.session.nickname}`;
		console.log(sender+' '+receiver+' '+chatRoomName);
		let query1=`call insertFriend(${sender},${receiver});`;
		models.sequelize.query(query1).then((result)=>{
			console.log(result);
		}).catch((err)=>{
			console.log(err);
		});
		let query2=`insert into chatrooms (chatRoomName,createdAt,updatedAt) values ('${chatRoomName}',now(),now());`;
		models.sequelize.query(query2).then(([results,metadata])=>{
			console.log(results);
			let query3=`call insertChatmember(${results},${sender},${receiver});`;
			models.sequelize.query(query3).catch((err)=>{
				console.log(err);
			});
		}).catch((err)=>{
			console.log(err);
		});
		res.end();
	},
	info:(req,res)=>{
		let id=req.params["id"];
		let query="select concat(lastName,' ',firstName) fullName,birthday,gender from users where userId="+id+" limit 1;";
		models.sequelize.query(query).then(([results,metadata])=>{
			res.send(results[0]);
			res.end();
		}).catch((err)=>{
			console.log(err);
		})
	}
}