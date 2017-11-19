$(document).ready(function(){
	
	context.init({preventDoubleContext: false});
	
	context.attach('.view', [
		{header: '基本操作'},
		{text: '编辑栏目', icon:'edit', action: function(e){
			//如果是文章列表的话（在这里讲包含ul和li标签视为有文章列表）
			//如果是头部（这里指包含header标签的栏目）
			var view = $(context.toElement).parents('.view');
			if(view.find('ul').length){
				var h2 = view.find('.title > h2');
				if(h2 && h2.text()){
					$('input[name="cName"]').val(h2.text());
					$('input[name="eName"]').val($('input[name="cName"]').toPinyin());
				}

				//获取文章列表
				var articalList = view.find('ul');
				var articalNum = articalList.children().length;
				$('input[name="listNum"]').val(articalNum);

				//使用layer弹出层，编辑生成freemarker的信息
				layer.open({
					title: '编辑栏目',
					type: 1,
					area: ['520px', '240px'],
					btn: ['确认', '取消'],
					yes: function(){
						h2.text($('input[name="cName"]').val());
						view.attr('data-name',$('input[name="eName"]').val());

						//设置文章列表个数(少的话添加，多的话移除)
						var articalShouldNum = $('input[name="listNum"]').val();
						if(articalShouldNum > articalNum){
							for(var i=0; i<articalShouldNum-articalNum; i++){
								articalList.append(articalList.children().eq(i).clone());
							}
						}else if(articalShouldNum < articalNum){
							articalList.children().each(function(i){
								if(i >= articalShouldNum){
									$(this).remove();
								}
							})
						}

						view.attr('data-num', articalShouldNum);
						layer.closeAll();
					},
					btn2: function(){

					},
					content: $('.editColumn')
				});
			}else if(view.find('header').length){
				
			}
		}},
		{text: 'Open in new Window', href: '#'},
		{divider: true},
		{text: 'Copy', href: '#'},
		{text: 'Dafuq!?', href: '#'}
	]);
	$('input[name="cName"]').on('input propertychange', function(){
		$('input[name="eName"]').val($('input[name="cName"]').toPinyin())
	})
});