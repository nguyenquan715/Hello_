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
	// Friend.sync({alter:true}).then(()=>{
	// 	console.log('success!');
	// }).catch((err)=>{
	// 	console.log(err);
	// });
	return Friend;
}