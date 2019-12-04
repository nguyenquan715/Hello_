$(document).ready(function(){
	/*Lấy thông tin cá nhân*/
	$.ajax({
		method:"GET",
		url:"/api/profile/info",
		dataType:'json'
	}).done(function(res){
		let info=res[0];
		$('#firstName').val(info["firstName"]);
		$('#lastName').val(info["lastName"]);
		$('#email').val(info["email"]);
		$('#dayOfBirth').val(Number(info["birthday"].substring(8,10)));
		$('#monthOfBirth').val(Number(info["birthday"].substring(5,7)));
		$('#yearOfBirth').val(Number(info["birthday"].substring(0,4)));
		$('#gender').val(info["gender"]);
	});

},false);