module.exports=(sequelize,Sequelize)=>{
	const ChatRoomMember=sequelize.define('chatRoomMember',{
		chatRoomId:{
			type:Sequelize.INTEGER,
			primaryKey:true,
			references:{
				model:'chatrooms',
				key:'chatRoomId'
			}
		},
		userId:{
			type:Sequelize.INTEGER,
			primaryKey:true,
			references:{
				model:'users',
				key:'userId'
			}
		},
		createdAt:{
			type:Sequelize.DATE,
			defaultValue:Sequelize.NOW
		},
		updatedAt:{
			type:Sequelize.DATE,
			defaultValue:Sequelize.NOW
		}
	});
	// ChatRoomMember.sync({force:true}).then(()=>{
	// 	console.log('success!');
	// }).catch((err)=>{
	// 	console.log(err);
	// });
	return ChatRoomMember;
}