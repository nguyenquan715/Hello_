$(document).ready(function(){
	var socket=io();
	socket.emit('nickname',$('#Nickname').text());

	$.ajax({
		method:"GET",
		url:"/api/notifi/id"
	}).done(function(res){		
		socket.emit('private_room',res['id']);
	});

	$(document).on('click','.AddFriend',function(){
		let id=$(this).parent().parent().data('userId');
		socket.emit('make_friend',id);
	});
	socket.on('make_friend',(res)=>{
		let notifi=$('<p class="Notifi"></p>').data('senderId',res['senderId']);
		notifi.data('receiverId',res['receiverId']);
		notifi.data('senderName',res['name']);
		notifi.append('<strong>'+res['name']+'</strong><span> đã gửi lời mời kết bạn cho bạn.</span><button id="Accept">Đồng ý</button><button id="Deny">Từ chối</button>');
		$('.List').append(notifi);
	});

	/*Chấp nhận yêu cầu kết bạn*/
	$(document).on('click','#Accept',function(){
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
			dataType:'json',
			contentType:'application/json; charset=utf-8'
		}).fail((err)=>{
			console.log(err);
		});
	});
	/*Từ chối lời mời kết bạn*/
	$(document).on('click','#Accept',function(){
		$(this).parent().html('<span>Bạn đã từ chối lời mời kết bạn của</span><strong> '+senderName+'</strong>');
	});
	/*Tìm kiếm bạn bè*/
	$('button#search').on('click',function(){
		let keyWord=$('input#searchInput').val();
		$('.Results').html('');
		$.ajax({
			method:"GET",
			url:"/api/notifi/search/"+keyWord
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
},false);
