/*List id friend*/
listIdFriend=[];
$(document).ready(function(){
	var socket=io();
	socket.emit('nickname',$('#Nickname').text());
	/*Join vào một room riêng*/
	$.ajax({
		method:"GET",
		url:"/api/notifi/id",
		dataType:'json'
	}).done(function(res){		
		socket.emit('privateRoom',res['id']);
	});
	/*List id friend*/
	$.ajax({
		method:'GET',
		url:'/api/notifi/friendid',
		dataType:'json'
	}).done((res)=>{
		for(let i=0;i<res.length;i++){
			listIdFriend.push(res[i]['userId2']);
		}
	});
	/*Click nút thêm bạn bè*/
	$(document).on('click','.AddFriend',function(){
		let id=$(this).parent().parent().data('userId');
		socket.emit('make_friend',id);
		$(this).attr('disabled','disabled');
		$(this).addClass('Disabled');
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
			contentType:'application/json; charset=utf-8',
			data:JSON.stringify(obj)
		}).done((res)=>{
			if(res.response){
				/*Load lại list id friend*/
				listIdFriend=[];
				$.ajax({
					method:'GET',
					url:'/api/notifi/friendid',
					dataType:'json'
				}).done((res)=>{
					for(let i=0;i<res.length;i++){
						listIdFriend.push(res[i]['userId2']);
					}
				});
				socket.emit('reload_friend',senderId);
			}
		}).fail((err)=>{
			console.log(err);
		});
	});
	/*Đã được đồng ý lời mời kết bạn*/
	socket.on('reload_friend',(name)=>{
		let notifi=$('<p class="Notifi"></p>');
		notifi.append('<strong>'+name+'</strong><span> đã chấp nhận lời mời kết bạn của bạn.</span>');
		$('.List').append(notifi);
		reloadFriend();
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
		if(keyWord==""){
			listUser();
		}else{
			searchUser(keyWord);
		}
	});
	$('#searchInput').on('keypress',function(event){
		if(event.keyCode=='13'){
			let keyWord=$(this).val();
			$('.Results').html('');
			if(keyWord==""){
				listUser();
			}else{
				searchUser(keyWord);
			}
		}
	});
	/*Hủy kết bạn*/
	$(document).on('click','#DiaUnfriend #Yes_Unfriend',function(){
		let userId=$('#DiaUnfriend').data('userId');
		$.ajax({
			method:'DELETE',
			url:'/api/notifi/unfriend/'+userId,
		}).done(()=>{
			$('#DiaUnfriend').dialog('close');
			/*Load lại list id friend*/
			reloadFriend();
		}).fail((err)=>{
			console.log(err);
		});
	});

	/*Xem info user*/
	$(document).on('click','button.Info',function(){
		let id=$(this).parent().parent().data('userId');
		$.ajax({
			method:"GET",
			url:"/api/notifi/info/"+id,
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
/*Trả về kết quả sau khi tìm kiếm*/
function userResult(res){
	for(let i=0;i<res.length;i++){
		let result=$('<div class="Result"></div>').data('userId',res[i]["userId"]);
		result.append('<div class="Account"><div class="Avatar"></div><h3>'+res[i]["fullName"]+'</h3></div>');
		if(listIdFriend.includes(res[i]['userId'])){
			result.append('<div class="Action"><button class="Buttons Unfriend">Unfriend</button><button class="Buttons Info">Info</button></div>');
		}
		else result.append('<div class="Action"><button class="Buttons AddFriend">Add friend</button><button class="Buttons Info">Info</button></div>');
		$('.Results').append(result);
	}
}
/*Danh sách user*/
function listUser(){
	$.ajax({
		method:"GET",
		url:"/api/admin/list",
		dataType:'json'
	}).done(function(res){
		userResult(res);
	}).fail(function(err){
		console.log(err);
	});
}
/*Tìm kiếm user*/
function searchUser(keyWord){
	$.ajax({
		method:"GET",
		url:"/api/notifi/search/"+keyWord,
		dataType:'json'
	}).done(function(res){
		userResult(res);
	}).fail(function(err){
		console.log(err);
	});
}
/*Load lại listIdFriend sau khi unfriend và add friend*/
function reloadFriend(){
	/*Load lại list id friend*/
	listIdFriend=[];
	$.ajax({
		method:'GET',
		url:'/api/notifi/friendid',
		dataType:'json'
	}).done((res)=>{
		for(let i=0;i<res.length;i++){
			listIdFriend.push(res[i]['userId2']);
		}
		/*Load lại kết quả tìm kiếm */
		let keyWord=$('input#searchInput').val();
		$('.Results').html('');
		if(keyWord==""){
			listUser();
		}else{
			searchUser(keyWord);
		}
	});
}