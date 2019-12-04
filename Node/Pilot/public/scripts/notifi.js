$(document).ready(function(){
	var socket=io();
	socket.emit('nickname',$('#Nickname').text());
	/*Join vào một room riêng*/
	$.ajax({
		method:"GET",
		url:"/api/notifi/id",
		dataType:'json'
	}).done(function(res){		
		socket.emit('private_room',res['id']);
	});
	/*Click nút thêm bạn bè*/
	$(document).on('click','.AddFriend',function(){
		let id=$(this).parent().parent().data('userId');
		socket.emit('make_friend',id);
	});
	socket.on('make_friend',(res)=>{
		let notifi=$('<p class="Notifi"></p>').data('senderId',res['senderId']);
		notifi.data('receiverId',res['receiverId']);
		notifi.data('senderName',res['name']);
		notifi.append('<strong>'+res['name']+'</strong><span> đã gửi lời mời kết bạn cho bạn.</span><button class="Accept">Đồng ý</button><button class="Deny">Từ chối</button>');
		$('.List').append(notifi);
	});

	/*Chấp nhận yêu cầu kết bạn*/
	$(document).on('click','.Accept',function(){
		let senderId=$(this).parent().data('senderId');
		let receiverId=$(this).parent().data('receiverId');
		let senderName=$(this).parent().data('senderName');
		let obj={
			sender:senderId,
			receiver:receiverId,
			name:senderName
		}
		$(this).parent().html('<span>Bạn đã chấp nhận lời mời kết bạn của</span><strong> '+senderName+'</strong>');
		$.ajax({
			method:"POST",
			url:"/api/notifi/addfriend",
			data:JSON.stringify(obj),
			contentType:'application/json; charset=utf-8'
		}).fail((err)=>{
			console.log(err);
		});
	});
	/*Từ chối lời mời kết bạn*/
	$(document).on('click','.Deny',function(){
		let senderName=$(this).parent().data('senderName');
		$(this).parent().html('<span>Bạn đã từ chối lời mời kết bạn của</span><strong> '+senderName+'</strong>');
	});
	/*Tìm kiếm bạn bè*/
	$('button#search').on('click',function(){
		let keyWord=$('input#searchInput').val();
		$('.Results').html('');
		$.ajax({
			method:"GET",
			url:"/api/notifi/search/"+keyWord,
			dataType:'json'
		}).done(function(res){
			for(let i=0;i<res.length;i++){
				let result=$('<div class="Result"></div>').data('userId',res[i]["userId"]);
				result.append('<div class="Account"><div class="Avatar"></div><h3>'+res[i]["fullName"]+'</h3></div>');
				result.append('<div class="Action"><button class="Buttons AddFriend">Add friend</button><button class="Buttons Info">Info</button></div>');
				$('.Results').append(result);
			}
		}).fail(function(err){
			console.log(err);
		});
	});
	/*Xem info user*/
	$(document).on('click','button.Info',function(){
		let id=$(this).parent().parent().data('userId');
		$.ajax({
			method:"GET",
			url:"api/notifi/info/"+id,
			dataType:'json'
		}).done(function(res){
			$('#nameInfo').text(res["fullName"]);
			$('#birthInfo').text(res["birthday"]);
			if(res["gender"]){
				$('#genderInfo').text('Nữ');
			}else{
				$('#genderInfo').text('Nam');
			}
		}).fail((err)=>{
			console.log(err);
		});
	});
},false);
