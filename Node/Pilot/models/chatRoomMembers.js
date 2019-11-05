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
		}
	});
	return ChatRoomMember;
}