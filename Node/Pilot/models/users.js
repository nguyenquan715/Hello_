module.exports=(sequelize,Sequelize)=>{
	const User=sequelize.define('user',{
		userId:{
			type:Sequelize.INTEGER,
			allowNull:false,
			autoIncrement:true,
			primaryKey:true
		},
		firstName:{
			type:Sequelize.STRING,
			allowNull:false,
		},
		lastName:{
			type:Sequelize.STRING,
			allowNull:false,
		},
		email:{
			type:Sequelize.STRING,
			allowNull:false,
		},
		password:{
			type:Sequelize.STRING,
			allowNull:false,
		},
		birthday:{
			type:Sequelize.DATEONLY,
			allowNull:false,
			defaultValue:Sequelize.NOW
		},
		gender:{
			type:Sequelize.BOOLEAN,
			defaultValue:true
		},
		blocked:{
			type:Sequelize.BOOLEAN,
			defaultValue:false
		},
		isAdmin:{
			type:Sequelize.BOOLEAN,
			defaultValue:false
		},
		createdAt:{
			type:Sequelize.DATE,
			defaultValue:sequelize.NOW
		},
		updatedAt:{
			type:Sequelize.DATE,
			defaultValue:sequelize.NOW
		}
	});
	// User.sync({force:true}).then(()=>{
	// 	console.log('success!');
	// }).catch((err)=>{
	// 	console.log(err);
	// });
	return User;
}