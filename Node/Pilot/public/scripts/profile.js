$(document).ready(function(){
	var socket=io();
	/*Lấy thông tin cá nhân*/
	$.ajax({
		method:"GET",
		url:"/api/profile/info"
	}).done(function(res){
		let info=res[0];
		socket.emit('private',info["userId"]);
		$('#firstName').val(info["firstName"]);
		$('#lastName').val(info["lastName"]);
		$('#email').val(info["email"]);
		$('#dayOfBirth').val(Number(info["birthday"].substring(8,10)));
		$('#monthOfBirth').val(Number(info["birthday"].substring(5,7)));
		$('#yearOfBirth').val(Number(info["birthday"].substring(0,4)));
		$('#gender').val(info["gender"]);
	});

},false);