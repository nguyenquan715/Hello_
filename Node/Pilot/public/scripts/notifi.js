$(document).ready(function(){
	var socket=io();
	$(document).on('click','.AddFriend',function(){
		let id=$(this).parent().parent().data('userId');
		socket.emit('make_friend',id);
	});
	socket.on('make_friend',(content)=>{
		console.log(content);
		$('.List').append(content);
	});
},false);
/*Tìm kiếm bạn bè*/
$('button#search').on('click',function(){
	let keyWord=$('input#searchInput').val();
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