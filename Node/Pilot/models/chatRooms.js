module.exports=(sequelize,Sequelize)=>{
	const ChatRoom=sequelize.define('chatRoom',{
		chatRoomId:{
			type:Sequelize.INTEGER,
			allowNull:false,
			autoIncrement:true,
			primaryKey:true
		},
		chatRoomName:{
			type:Sequelize.STRING,
			allowNull:false
		}
	});
	return ChatRoom;
}