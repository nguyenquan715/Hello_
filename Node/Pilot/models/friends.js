module.exports=(sequelize,Sequelize)=>{
	const Friend=sequelize.define('friend',{
		userId1:{
			type:Sequelize.INTEGER,
			primaryKey:true,
			references: {
     			model:'users',
     			key: 'userId'
     		}
		},
		userId2:{
			type:Sequelize.INTEGER,
			primaryKey:true,
			references:{
				model:'users',
				key:'userId'
			}
		}
	});
	return Friend;
}