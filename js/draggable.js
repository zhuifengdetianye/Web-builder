//新建一个toolbar类
var Toolbar = function() {
	this.menus = {
		remove: {
			name: '删除',
			html: '<a class="toolbar-close"><i class="fa fa-window-close"></i></a>'
		}
	};

	this.init = function(){
		//添加.toobar
		var toolbar = $('<div class="toolbar"></div>');
		for(var i in this.menus){
			toolbar.append(this.menus[i].html);
		}
		return toolbar;
	};
}

//参考jQuery的.pushStack来实现
var HandleStack = function(){
	
};

HandleStack.prototype = {
	//DOM树的栈，保存上几步的操作
	DOMStack: [],

	//保存下几步的操作
	DOMStackCache: [],

	//style栈
	styleStack: [],

	//保存下几步的操作
	styleStackCache: [],

	//栈顶
	topIndex: [0, 0],

	pushStack: function(stack, ele ,index){
		stack.push(ele);
		//index 0或1
		if(index){
			return this.topIndex[1]++;
		}else{
			return this.topIndex[0]++;
		}
		
	},
	popStack: function(stack, index){
		//判断是否已经到栈底
		if(stack.length > 0){
			if(stack.length == 1){
				layer.msg('已经到最上一步！');
			}
			if(index){
				this.topIndex[1]--;
			}else{
				this.topIndex[0]--;
			}
			return stack.pop();
		}
		
	}
};

//组件库
var modules = {
	articleList: [
		{
			name: '文章列表栏目1',
			html: '<ul class="article-list-column1 clearfix"><li class="fl"><a href="#">津门故里，万象更新——记留学生“感知中国—津门古今”活动</a></li><li class="fl"><a href="#">郭军副校长会见美国南佛罗里达大学陈光帧教授</a></li><li class="fl"><a href="#">理学院青年教师在新型超短脉冲光纤激光器中取得新进展</a></li></ul>',
			preview: 'icon-column1.png'
		},
		{
			name: '文章列表栏目2',
			html: '<ul class="article-list-column2 clearfix"><li class="fl"><a href="#">津门故里，万象更新——记留学生“感知中国—津门古今”活动</a></li><li class="fl"><a href="#">郭军副校长会见美国南佛罗里达大学陈光帧教授</a></li><li class="fl"><a href="#">理学院青年教师在新型超短脉冲光纤激光器中取得新进展</a></li></ul>',
			preview: 'icon-column1.png'
		}
	],
	link: [
		{
			name: '链接栏目1',
			html: '<ul class="link-column1 clearfix"><li class="fl"><a href="#">链接1</a></li><li class="fl"><a href="#">链接2</a></li><li class="fl"><a href="#">链接3</a></li></ul>',
			preview: 'icon-column1.png'
		},
		{
			name: '链接栏目2',
			html: '<ul class="link-column2 clearfix"><li class="fl"><a href="#">链接1</a></li><li class="fl"><a href="#">链接2</a></li><li class="fl"><a href="#">链接3</a></li></ul>',
			preview: 'icon-column1.png'
		}
	],
	login: [
		{
			name: '登录栏目1',
			html: '<form class="login-column1"><div><label>用户名：</label><input name="username" class="input-text"></div><div><label>密　码：</label><input name="password" class="input-text"></div><div><button class="btn btn-nor btn-success">登录</button><button class="btn btn-nor btn-warning">取消</button></div></form>',
			preview: 'icon-column1.png'
		}
	],
	topNav: [
		{
			name: '顶部导航组件1',
			html:'<nav class="top-nav1"><ul class="clearfix"><li><a href="#" hidefocus="false">首　页</a></li><li><a href="#" hidefocus="false">中心概况</a></li><li><a href="#" hidefocus="false">教学资源</a></li><li><a href="#" hidefocus="false">校企合作</a></li><li><a href="#" hidefocus="false">师资队伍</a></li><li><a href="#" hidefocus="false">管理体系</a></li><li><a href="#" hidefocus="false">资源共享</a></li><li><a href="#" hidefocus="false">规章制度</a></li><li><a href="#" hidefocus="false">虚拟仿真实验教学平台</a></li><li><a href="#" hidefocus="false">化学实验教学中心</a></li></ul></nav>',
			preview: 'icon-top-nav.png'
		}
	],
	basicElement: [
		{
			name: '容器',
			html: '<div>容器</div>',
			preview: 'icon-top-nav.png'
		},
		{
			name: '标题',
			html: '<h3>标题</h3>',
			preview: 'icon-top-nav.png'
		},
		{
			name: '分割线',
			html: '<hr>',
			preview: 'icon-top-nav.png'
		},
		{
			name: '文字',
			html: '<span>文字</span>',
			preview: 'icon-top-nav.png'
		},
		{
			name: '图片',
			html: '<img src="img/icon-top-nav.png">',
			preview: 'icon-top-nav.png'
		},
		{
			name: '按钮',
			html: '<button>按钮</button>',
			preview: 'icon-top-nav.png'
		},
		{
			name: '视频',
			html: '<vedio></vedio>',
			preview: 'icon-top-nav.png'
		},
		{
			name: '链接',
			html: '<a href="#">链接</a>',
			preview: 'icon-top-nav.png'
		}
	]
}

//新建操作栈
var handleStack = new HandleStack();
var demoHtml = '';
var editor;
$(document).ready(function(){
	//循环组件，并把他们插入到相应的容器当中
	for(var i in modules){
		var className = reverseCamel(i);
		for(var j in modules[i]){
			$('.' + className + '-box').append('<li class="fl"><div class="box"><a class="preview-img" href="javascript:void(0);"><img src="img/'+ modules[i][j].preview +'" alt="'+ modules[i][j].name +'"><span>'+ modules[i][j].name +'</span></a><div class="view">'+ modules[i][j].html +'</div></div></li>');
		}	
	}

	//上一步的操作
	$('.last-step').on('click', function(){
		if(handleStack.DOMStack.length){
			//DOMStack出栈
			var ele = handleStack.popStack(handleStack.DOMStack, 0);

			//DOMStackCache入栈
			handleStack.pushStack(handleStack.DOMStackCache, ele, 1);
			
			//取当前topIndex
			window.demohtml = handleStack.DOMStack[handleStack.topIndex[0] - 1];			
			$('#operationPanelContainer').children().remove().end().append(window.demohtml);
		}else{
			layer.msg('已经到最上一步！');
		}

		//还原拖拽排序事件监听
		restoreSortable();

		//保存最新一次的修改版本到本地存储
		saveLatestOperation();
	});

	//下一步操作
	$('.next-step').on('click', function(){
		if(handleStack.DOMStackCache.length){
			//DOMStackCache出栈
			window.demohtml = handleStack.popStack(handleStack.DOMStackCache, 1);

			//DOMStack入栈
			handleStack.pushStack(handleStack.DOMStack, window.demohtml, 0);
			$('#operationPanelContainer').children().remove().end().append(window.demohtml);
		}else{
			layer.msg('已经到最上一步！');
		}

		//还原拖拽排序事件监听
		restoreSortable();

		//保存最新一次的修改版本到本地存储
		saveLatestOperation();
	});

	//添加容器和组件被点击时的监听，添加toolbar
	$(document).on('click', '.center .linear-layout-module, .center .sub-container-module, .center .column-container-module, .center .box', function(event){
		
		//阻止事件冒泡
		event.stopPropagation();

		//取出当前的toolbar
		$('.toolbar').parent().css({border:'none'}).removeClass('currentEle');
		$('.toolbar').remove();

		//在当前元素上添加工具
		var toolbar = new Toolbar();
		toolbarEntity = toolbar.init();
		$(this).append(toolbarEntity);
		$(this).addClass('currentEle');

	});

	//添加点击toolbar上的close事件监听
	$(document).on('click', '.toolbar-close', function(){
		//阻止事件冒泡
		event.stopPropagation();

		//删除toolbar
		$(this).parent().parent().remove();	
		
		//添加DOM到操作栈
		saveHtml();	

		//实例化DOM树
		instantiationTree();
	});

	//添加点击预览按钮时的事件
	$('.preview-page').on('click', function(){

		if($('.fa-eye').length){			
			//页面由编辑变为预览
			$('body').removeClass('edit').addClass('preview');

			//按钮由预览变为编辑
			$(this).html('<i class="fa fa-edit"></i>编辑');
		}else{
			//页面由预览变为编辑
			$('body').removeClass('preview').addClass('edit');

			//按钮由编辑变为预览
			$(this).html('<i class="fa fa-eye"></i>预览');
		}
		
	});

	//添加点击保存按钮时的事件
	$('.download').on('click', function(){
		//过滤html代码
		cleanAllHtml();
		
		//格式化html代码
		// var html = HTMLFormat(trimAll(jQuery.trim($('.clean-code').html())));
		var html = HTMLFormat($('.clean-code').html());

		//弹出html代码
		$('.show-code textarea').val(html);
		
		//清除CodeMirror
		$('.CodeMirror').remove();
		
		//初始化CodeMirror
		CodeMirror.fromTextArea($('.show-code textarea')[0], {
			theme: 'ambiance',
			lineNumbers: true,
			styleActiveLine: true,
			matchBrackets: true,
			smartIndent: true
		});
		
		//弹出层
		layer.open({
			title: 'code',
			type: 1,
			area: ['650px', '400px'], 
			content: $('.show-code')
		});		
	});

	//添加点击清空按钮时的事件
	$('.clear-page').on('click', function(){
		if(supportStorage()){
			if(localStorage.getItem('demohtml')){
				localStorage.clear();
				layer.msg('数据已清除！', {time:2000, icon:1});
			}else{
				layer.msg('无数据可清除！', {time:2000, icon:8});
			}			
		}
		$('#operationPanelContainer').children().remove();

		//实例化DOM树
		instantiationTree();
	});

	//从本地存储中取出上一次的版本
	getLatestOperation();

	//添加拖拽事件
	addDragEvent();

	//实例化DOM树
	instantiationTree();
	
});

/**
 * resizeContainer() 在添加容器或栏目的时候，监听容器尺寸是否改变，同步其父容器的尺寸
 * @param void
 * @return null
 */	
function resizeContainer(){
	//先检测.column-container和.column-container-module尺寸是否一致
	$('.center .column-container').each(function(){
		var height = $(this).height();
		if(height && height !== $(this).parent().height()){
			$(this).parent().css({height:height});
		}
	});

	//再检测.sub-container和.sub-container-module尺寸是否一致
	$('.center .sub-container').each(function(){
		var height = $(this).height();
		if(height && height !== $(this).parent().height()){
			$(this).parent().css({height:height+2});
		}
	});

	//先检测.linear-layout和.linear-layout-module尺寸是否一致
	$('.center .linear-layout').each(function(){
		var height = $(this).height();
		if(height && height !== $(this).parent().height()){
			$(this).parent().css({height:height+2});
		}
	})
}

/**
 * trimAll() 删除空格，空行
 * @param <String> str
 * @return <String> str
 */	
function trimAll(str){
	var arr = str.split('\n');
	var temp = [];
	for(var i in arr){
		if(arr[i]){
			temp.push(jQuery.trim(arr[i]));
		}	
	}
	str = temp.join('');
	return str;
}
/**
 * cleanAllHtml() 清除html代码中不需要的部分
 * @param void 
 * @return null
 */	
function cleanAllHtml() {
	//把当前的demo存放到.clean-code中
	$('.clean-code').html($('#operationPanel').children().html());
	var $code = $('.clean-code');

	//删除栏目组件中不需要的demo
	$code.find('.preview-img').remove();

	//取出当前元素的子元素，添加到文档中
	$code.find('.linear-layout-module .sub-container-module .column-container-module .box').each(function(){
		cleanHtml(this);
	});
	$code.find('.linear-layout-module .sub-container-module .column-container-module').each(function(){
		cleanHtml(this);
	});
	$code.find('.linear-layout-module .sub-container-module').each(function(){
		cleanHtml(this);
	});
	$code.find('.linear-layout-module').each(function(){
		cleanHtml(this);
	});

	//清除toolbar
	$code.find('.toolbar').remove();

	//清除元素中的.ui-sortable
	$code.find('.linear-layout, .sub-container, .column-container').removeClass('ui-sortable');

	//清除.currentEle
	$code.find('.currentEle').removeClass('currentEle');

	//过滤html标签中的属性
	var formatCode = $.htmlClean($code.html(), {
		format: true,
		allowedAttributes: [
			['id'],
			['class']
		]
	});
	$code.html(formatCode);
}

/**
 * cleanHtml(e) 取出当前元素的子元素，并放到文档中
 * @param <Object> e 
 * @return null
 */	
function cleanHtml(e) {
	$(e).parent().append($(e).html()).end().remove();
}

/**
 * reverseCamel(str) 把驼峰书写形式改成用“-”隔开的形式
 * @param <String> str 
 * @return <String>
 */	
function reverseCamel(str){
	var reg = /[A-Z]+/g;
	return str.replace(reg, function(a){
		return '-' + a.toLowerCase();
	});
	
}

/**
 * saveHtml() 每次操作完成之后保存
 * @param void 
 * @return null
 */	
function saveHtml() {
	//在页面上有新的操作的时候，检测当前页面中各个容器的尺寸
	resizeContainer();

	window.demohtml = jQuery.trim($('#operationPanelContainer').remove('.toolbar').html());
	handleStack.pushStack(handleStack.DOMStack, window.demohtml, 0);

	//保存最新操作到本地
	saveLatestOperation();
}

/**
 * restoreSortable() 还原拖拽排序监听
 * @param void 
 * @return null
 */	
function restoreSortable() {
	//注册行容器之间的拖拽排序事件
	$(".linear-layout").sortable({
		connectWith: ".linear-layout",
		stop: function(e,t) {

			//添加DOM到操作栈
			saveHtml();
			
			//注册子容器之间的拖拽排序事件
			$(".sub-container").sortable({
				connectWith: ".sub-container",
				stop: function(e, t) {

					//添加DOM到操作栈
					saveHtml();

					$('.column-container').sortable({
						connectWith: '.column-container',
						stop: function(e, t) {
							//给栏目添加随机ID
							setColumnId(t.item, genNonDuplicateID());

							//添加DOM到操作栈
							saveHtml();

							//实例化DOM树
							instantiationTree();
						}
					})
				}
			});
		}
	});

	//注册子容器之间的拖拽排序事件
	$(".sub-container").sortable({
		connectWith: ".sub-container",
		stop: function(e, t) {

			//添加DOM到操作栈
			saveHtml();

			$('.column-container').sortable({
				connectWith: '.column-container',
				stop: function(e, t) {
					//给栏目添加随机ID
					setColumnId(t.item, genNonDuplicateID());

					//添加DOM到操作栈
					saveHtml();

					//实例化DOM树
					instantiationTree();
				}
			})
		}
	});

	$('.column-container').sortable({
		connectWith: '.column-container',
		stop: function(e, t) {
			//给栏目添加随机ID
			setColumnId(t.item, genNonDuplicateID());

			//添加DOM到操作栈
			saveHtml();

			//实例化DOM树
			instantiationTree();
		}
	})
}

/**
 * setColumnId(obj, id) 设置栏目id
 * @param <Obj> obj 
 * @param <String> id
 * @return null
 */
function setColumnId(obj, id){
	!obj.find('.view').attr('id') && obj.find('.view').attr('id', id);
}

/**
 * addDragEvent() 添加拖拽和排序事件
 * @param void 
 * @return <String>
 */	
function addDragEvent(){
	//注册行容器的拖拽事件
	$(".left .linear-layout-module").draggable({
		connectToSortable: "#operationPanelContainer",
		helper: "clone",
		stop: function(e, t) {
			restoreSortable();
		}
	});

	//操作面板的sortable事件
	$("#operationPanelContainer").sortable({
		connectWith: "#operationPanelContainer",
		stop: function(e, t) {
			//添加DOM到操作栈
			saveHtml();
		}
	});

	//注册子容器的拖拽事件
	$(".left .sub-container-module").draggable({
		connectToSortable: ".linear-layout",
		helper: "clone"
	});

	//注册栏目容器的拖拽事件
	$(".left .column-container-module").draggable({
		//这里注册可以在行容器和子容器之间拖拽排序
		connectToSortable: ".sub-container",
		helper: "clone"
	});
	
	//注册栏目的拖拽事件
	$(".left .box").draggable({
		//这里注册可以在子容器和栏目容器之间拖拽排序
		connectToSortable: ".column-container",
		helper: "clone"
	});
}

/**
 * saveLatestOperation() 保存最新操作到本地
 * @param void 
 * @return null
 */	
function saveLatestOperation() {
	var data = window.demohtml;
	if(supportStorage()){
		localStorage.setItem('demohtml', JSON.stringify(data));
	}
}

/**
 * getLatestOperation() 获取本地的最新操作
 * @param void 
 * @return null
 */	
function getLatestOperation(){
	
	if(supportStorage() && localStorage.getItem('demohtml') != 'undefined'){
		window.demohtml = JSON.parse(localStorage.getItem('demohtml'));
		if(window.demohtml){
			$('#operationPanelContainer').append(window.demohtml);
			addDragEvent();
			restoreSortable();
		}
	}
}


/**
 * supportStorage() 验证是否支持本地存储
 * @param void 
 * @return boolean
 */	
function supportStorage() {
	if (typeof window.localStorage=='object') 
		return true;
	else
		return false;		
}