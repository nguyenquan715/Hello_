$(document).ready(function(){
	$(document).on('click','.AddGroup',function(){
		$('#DiaGroup').dialog('open');
	});
	/*Hủy tạo nhóm*/
	$(document).on('click','#Cancel',function(){
		$('#DiaGroup').dialog('close');
		$('#DiaGroup input').val('');
		$('.Members').html('');
		$('.LeftBottom').html('');
	});
},false);
$('#DiaGroup').dialog({
	autoOpen:false,
	modal:true,
	title:'Tạo nhóm',
	height:500,
	width:500
});