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
	/*ID friend của user*/
	friendId:(req,res)=>{
		let query=`call listIdFriend(${req.session.userId});`;
		models.sequelize.query(query).then((results)=>{
			console.log(results);
			res.send(results);
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	/*Thêm bạn bè*/
	addFriend:(req,res)=>{
		let sender=req.body['sender'];
		let receiver=req.body['receiver'];
		let name=req.body['name'];
		let chatRoomName=`${name}-${req.session.nickname}`;
		console.log(sender+' '+receiver+' '+chatRoomName);
		/*insert vào bảng friend*/
		let query1=`call insertFriend(${sender},${receiver});`;
		models.sequelize.query(query1).then((results)=>{
			/*kiểm tra xem chatroom đó đã tồn tại hay chưa*/
			let query=`call roomExisted(${sender},${receiver});`;
			models.sequelize.query(query).then((results)=>{
				console.log(results);
				if(results.length){
					//Đã tồn tại
					res.send({response:'Add friend success!'});
					res.end();
				}
				else{
					let query2=`insert into chatrooms (chatRoomName,createdAt,updatedAt) values ('${chatRoomName}',now(),now());`;
					models.sequelize.query(query2).then(([results,metadata])=>{
						console.log(results);
						let query3=`call insertChatmember(${results},${sender},${receiver});`;
						models.sequelize.query(query3).then(()=>{
							res.send({response:'Add friend success!'});
							res.end();
						}).catch((err)=>{
							console.log(err);
						});
					}).catch((err)=>{
						console.log(err);
					});
				}
			}).catch((err)=>{
				console.log(err);
			});
		}).catch((err)=>{
			console.log(err);
		});
	},
	/*Hủy kết bạn*/
	unfriend:(req,res)=>{
		let friendId=req.params['userId'];
		let userId=req.session.userId;
		/*Xóa bản ghi trong bảng friends còn trong chatrooms và chatroommebers thì không
		vì cần lưu tin nhắn để lỡ sau này kết bạn lại*/
		let query=`call unfriend(${userId},${friendId});`
		models.sequelize.query(query).then(()=>{
			res.send({res:'Unfriend success!'});
			res.end();
		}).catch((err)=>{
			console.log(err);
		});
	},
	/*Info user*/
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