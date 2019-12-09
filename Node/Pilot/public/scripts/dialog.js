$(document).ready(function(){
	/*Dialog thêm nhóm*/
	$(document).on('click','.AddGroup',function(){
		$('#DiaGroup').dialog('open');
	});
	/*Hủy tạo nhóm*/
	$(document).on('click','#DiaGroup .Cancel',function(){
		$('#DiaGroup').dialog('close');
		$('#DiaGroup input').val('');
		$('#DiaGroup .Members').html('');
		$('#DiaGroup .LeftBottom').html('');
	});

	/*Dialog thêm thành viên*/
	$(document).on('click','.GroupPlus',function(){
		$('#DiaAddToGroup').dialog('open');
	});
	/*Hủy thêm vào nhóm*/
	$(document).on('click','#DiaAddToGroup .Cancel',function(){
		$('#DiaAddToGroup').dialog('close');
		$('#DiaAddToGroup input').val('');
		$('#DiaAddToGroup .Members').html('');
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
},false);
$('#DiaGroup').dialog({
	autoOpen:false,
	modal:true,
	title:'Tạo nhóm',
	height:500,
	width:500
});
$('#DiaAddToGroup').dialog({
	autoOpen:false,
	modal:true,
	title:'Thêm thành viên',
	height:500,
	width:500,
})
$('#DiaOutGroup').dialog({
	autoOpen:false,
	modal:true,
	title:'Rời khỏi nhóm',
	height:200,
	width:450
});
