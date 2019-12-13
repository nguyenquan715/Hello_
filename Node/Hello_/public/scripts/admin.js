$(document).ready(function(){
	/*Danh sách user*/
	listUser();

	/*Tìm kiếm user*/
	$('button#search').on('click',function(){
		let keyWord=$('input#searchInput').val();
		$('.Results').html('');
		if(keyWord==""){
			listUser();
		}
		else{
			searchUser(keyWord);
		}
	});
	$('#searchInput').on('keypress',function(event){
		if(event.keyCode=='13'){
			let keyWord=$(this).val();
			$('.Results').html('');
			if(keyWord==""){
				listUser();
			}
			else{
				searchUser(keyWord);
			}
		}
	});
	/*Info một user*/
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

	/*Block, Unlock user*/
	$(document).on('click','.Block',function(){
		let id=$(this).parent().parent().data('userId');
		$(this).text('Unlock');
		$(this).removeClass('Block');
		$(this).addClass('Unlock');
		$.ajax({
			method:"PUT",
			url:"/api/admin/block/"+id
		}).fail((err)=>{
			console.log(err);
		});
	});
	$(document).on('click','.Unlock',function(){
		let id=$(this).parent().parent().data('userId');
		$(this).text('Block');
		$(this).removeClass('Unlock');
		$(this).addClass('Block');
		$.ajax({
			method:"PUT",
			url:"/api/admin/unlock/"+id
		}).fail((err)=>{
			console.log(err);
		});
	});
},false);
/*Trả về kết quả*/
function userResult(res){
	for(let i=0;i<res.length;i++){
		let result=$('<div class="Result"></div>').data('userId',res[i]["userId"]);
		result.append('<div class="Account"><div class="Avatar"></div><h3>'+res[i]["fullName"]+'</h3></div>');
		if(res[i]["blocked"]){
			result.append('<div class="Action"><button class="Buttons Unlock">Unlock</button><button class="Buttons Info">Info</button></div>');
		}
		else result.append('<div class="Action"><button class="Buttons Block">Block</button><button class="Buttons Info">Info</button></div>');
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
