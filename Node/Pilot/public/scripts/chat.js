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
	/*Hiển thị danh sách Friend*/
	$.ajax({
		method:"GET",
		url:"/api/chat/friends",
		dataType:'json'
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
		url:"/api/chat/groups",
		dataType:'json'
	}).done(function(res){
		for(let i=0;i<res.length;i++){
			let room=$('<div class="Room"></div>').data('roomId',res[i]["chatRoomId"]);
			room.append('<div class="Avatar"></div><p>'+res[i]["chatRoomName"]+'</p>');
			$('#GroupList .Rooms').append(room);
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
	/*Tạo nhóm*/
	$(document).on('click','#CreateGroup',function(){
		let name=$('#GroupName').val();
		let ids=[];
		$('.Members .Member').each(function(index,item){
			ids.push($(this).data('userId'));			
		});
		let group={
			name:name,
			ids:ids
		}
		$.ajax({
			method:"POST",
			url:"/api/chat/creategroup",
			contentType:"application/json;charset=utf-8",
			data:JSON.stringify(group)
		}).done(()=>{
			console.log('Create group success!');
			/*Reset dialog*/
			$('#DiaGroup').dialog('close');
			$('#DiaGroup input').val('');
			$('.Members').html('');
			$('.LeftBottom').html('');
			/*Phát ra sự kiện load lại group đối với các thành viên trong group*/
			socket.emit("reload_group",JSON.stringify(ids));
		}).fail((err)=>{
			console.log(err);
		});
	});
	/*Reload lại các group đã tham gia*/
	socket.on('reload_group',function(data){
		console.log('Reload');
		$.ajax({
			method:"GET",
			url:"/api/chat/groups",
			dataType:'json'
		}).done(function(res){
			$('#GroupList .Rooms').empty();
			for(let i=0;i<res.length;i++){
				let room=$('<div class="Room"></div>').data('roomId',res[i]["chatRoomId"]);
				room.append('<div class="Avatar"></div><p>'+res[i]["chatRoomName"]+'</p>');
				$('#GroupList').append(room);
			}
		});
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
