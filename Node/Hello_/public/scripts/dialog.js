$(document).ready(function(){
	/*Dialog thêm nhóm*/
	$(document).on('click','.AddGroup',function(){
		$('#DiaGroup').dialog('open');
		$('#DiaGroup input').val('');
		$('#DiaGroup .Members .MembersToAdd').html('');
		$('#DiaGroup .LeftBottom').html('');
	});
	/*Hủy tạo nhóm*/
	$(document).on('click','#DiaGroup .Cancel',function(){
		$('#DiaGroup').dialog('close');
		$('#DiaGroup input').val('');
		$('#DiaGroup .Members .MembersToAdd').html('');
		$('#DiaGroup .LeftBottom').html('');
	});

	/*Dialog thêm thành viên*/
	$(document).on('click','.GroupPlus',function(){
		$('#DiaAddToGroup').dialog('open');
		$('#DiaAddToGroup .Members .MembersToAdd').html('');
		$('#DiaAddToGroup .LeftBottom').html('');
	});
	/*Hủy thêm vào nhóm*/
	$(document).on('click','#DiaAddToGroup .Cancel',function(){
		$('#DiaAddToGroup').dialog('close');
		$('#DiaAddToGroup input').val('');
		$('#DiaAddToGroup .Members .MembersToAdd').html('');
		$('#DiaAddToGroup .Members .MembersInGroup').html('');
		$('#DiaAddToGroup .LeftBottom').html('');
	});

	/*Dialog rời nhóm*/
	$(document).on('click','.GroupMinus',function(){
		let roomId=$(this).parent().parent().data('roomId');
		$('#DiaOutGroup').data('roomId',roomId);
		$('#DiaOutGroup').dialog('open');
	});
	/*Không rời nhóm*/
	$(document).on('click','#DiaOutGroup #No_OutGroup',function(){
		$('#DiaOutGroup').dialog('close');
	});

	/*Dialog hủy kết bạn*/
	$(document).on('click','.Unfriend',function(){
		let userId=$(this).parent().parent().data('userId');
		let friendName=$(this).parent().parent().find('h3').text();
		$('#DiaUnfriend .QuestionContent').text("Bạn có chắc chắn muốn hủy kết bạn với "+friendName+" ?");
		$('#DiaUnfriend').data('userId',userId);
		$('#DiaUnfriend').dialog('open');
	});
	$(document).on('click','#DiaUnfriend #No_Unfriend',function(){
		$('#DiaUnfriend').dialog('close');
	});
},false);
/*Tạo nhóm mới */
$('#DiaGroup').dialog({
	autoOpen:false,
	modal:true,
	title:'Tạo nhóm',
	height:500,
	width:500
});
/*Thêm thành viên sau khi đã tạo nhóm*/
$('#DiaAddToGroup').dialog({
	autoOpen:false,
	modal:true,
	title:'Thêm thành viên',
	height:500,
	width:500
});
/*Rời khỏi nhóm*/
$('#DiaOutGroup').dialog({
	autoOpen:false,
	modal:true,
	title:'Rời khỏi nhóm',
	height:200,
	width:450
});
/*Hủy kết bạn*/
$('#DiaUnfriend').dialog({
	autoOpen:false,
	modal:true,
	title:'Hủy kết bạn',
	height:200,
	width:450
});
