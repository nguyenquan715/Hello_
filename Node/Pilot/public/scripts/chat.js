$(document).ready(function(){
	var socket=io();
	socket.emit('nickname',$('#Nickname').text());
	/*Hiển thị danh sách Friend*/
	$.ajax({
		method:"GET",
		url:"/api/chat/friends"
	}).done(function(res){
		for(let i=0;i<res.length;i++){
			let room=$('<div class="Room"></div>').data('roomId',res[i]["chatRoomId"]);
			room.append('<div class="Avatar"></div><p>'+res[i]["fullName"]+'</p>');
			$('#FriendList').append(room);
		}
	});
	/*Hiển thị danh sách Group*/
	$.ajax({
		method:"GET",
		url:"/api/chat/groups"
	}).done(function(res){
		for(let i=0;i<res.length;i++){
			let room=$('<div class="Room"></div>').data('roomId',res[i]["chatRoomId"]);
			room.append('<div class="Avatar"></div><p>'+res[i]["chatRoomName"]+'</p>');
			$('#GroupList').append(room);
		}
	});
	$('#ListFriend').on('click',function(){
		$('#FriendList').toggleClass('Hide');
		$('#GroupList').toggleClass('Hide');
	});
	$('#ListGroup').on('click',function(){
		$('#FriendList').toggleClass('Hide');
		$('#GroupList').toggleClass('Hide');
	});

	/**
	 * Thêm group mới
	 */
	/*Tìm thành viên cho group*/
	$(document).on('blur','#FindMember',function(){
		let keyWord=$('#FindMember').val();
		$.ajax({
			method:"GET",
			url:"/api/chat/search/"+keyWord,
			dataType:"json"
		}).done(function(res){
			$('.LeftBottom').html('');
			for(let i=0;i<res.length;i++){
				let result=$('<div class="Member"></div>').data('userId',res[i]["userId"]);
				result.append('<div class="MemAvatar"></div><h3>'+res[i]["fullName"]+'</h3></div>');
				$('.LeftBottom').append(result);
			}
		}).fail((err)=>{
			console.log(err);
		});
	});
	/*Thêm thành viên cho Group*/
	$(document).on('click','.LeftBottom .Member',function(){
		let result=$('<div class="Member"></div>').data('userId',$(this).data('userId'));
		result.append($(this).html());
		$('.DiaMidRight .Members').append(result);
		$(this).empty();
	});
	/*Xóa thành viên khỏi group*/
	$(document).on('click','.Members .Member',function(){
		$(this).empty();
	});

	/*Sự kiện khi nhấn vào một Room*/
	$(document).on('click','.Room',function(){
		$('.ChatRoomName').text($(this).find('p').text());
		socket.emit('join_room',$(this).data('roomId'));
	});

	/*Nhắn tin*/
	$('#SendMess').on('click',function(){
		let content=$('#EnterMess').val();
		socket.emit('send_mess',content);
		$('#EnterMess').val('');
	});
	socket.on('res_mess',(content)=>{
		$('.Messages').append(content);
	});
},false);
