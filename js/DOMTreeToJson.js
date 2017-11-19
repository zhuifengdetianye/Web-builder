var setting = {
    data: {
        key: {
            title:"t"
        },
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: onClick
    }
};

/**
 * instantiationTree() 实例化DOM树
 * @param void
 * @return null
 */	
function instantiationTree(){
    //初始化DOM树
	$.fn.zTree.init($("#treeDemo"), setting, updateDOMTree());
}

/**
 * onClick(event, treeId, treeNode, clickFlag) 点击触发的函数
 * @param <Obj> event 
 * @param <String> treeId
 * @param <Obj> treeNode
 * @param void
 * @return null
 */	
function onClick(event, treeId, treeNode, clickFlag) {
    
    //获取选中元素的id
    var id = treeNode.id;
    var pathArr = id.split('');
    var ele = positionedElements($('#operationPanelContainer .view'), pathArr);
    
    //把以前的toolbar所在的元素，恢复原来状态
    var lastToolbarParent = $('.toolbar').parent();
    lastToolbarParent.css({position:'static'}).removeClass('currentEle');
    lastToolbarParent.data('display') ? lastToolbarParent.css({display:lastToolbarParent.data('display')}):'';
    $('.toolbar').remove();

    //在当前元素上添加工具
    var toolbar = new Toolbar();
    var toolbarEntity = toolbar.init();
    ele.append(toolbarEntity).css({position:'relative'});
    
    //保存被选元素的边框样式，给被选元素添加边框并添加标记
    ele.addClass('currentEle');
    console.log(getStyle(ele))
    showStyle(getStyle(ele));

    //保存元素的display状态    
    if(ele.css('display') == 'inline'){
        ele.css({display:'inline-block'});
        ele.data('display', ele.css('display'));
    }      
}

/**
 * positionedElements(id) 定位DOM元素
 * @param <Obj> selector
 * @param <Array> pathArr 
 * @return <Obj> ele
 */	
function positionedElements(selector, pathArr) {
    //结束条件：路径数组的长度为0的时候
    if(pathArr.length == 1){  
        var ele = selector.eq(pathArr[0]-1);
        return ele;
    }else{
        var ele = selector.eq(pathArr[0]-1);
        //删除数组第一个元素
        pathArr.splice(0, 1);
        return positionedElements(ele.children(), pathArr);
    }
}	

/**
 * genNonDuplicateID() 生成一个不重复的ID
 * @param void 
 * @return null
 */	
function genNonDuplicateID(){
    return Number(Math.random().toString().substr(3,1) + Date.now()).toString(36);
}

/**
 * updateDOMTree() 更新DOM树
 * @param void 
 * @return <Obj>
 */	
function updateDOMTree() {
    //遍历所有的栏目
    var arr = [];
    
    //遍历所有节点
    traverseDOM(arr, $('#operationPanelContainer .view'), '');
    return arr;
}
/**
 * traverseDOM() 遍历节点
 * @param <Array> arr 存放节点信息的数组 
 * @param <Obj> selector jQuery对象，所有需要遍历的元素都属于该元素下 
 * @param <String> id 每个节点父元素的id，比如：11是112的父元素id
 * @return <Obj>
 */	
function traverseDOM(arr, selector, id){
    var a = id;

    //判断是否遍历完，递归调用的结束条件
    if(selector.length){
        selector.each(function(i, ele){
            if(i > 0){
                //如果不是子元素中的第一个，每次循环的时候要替换掉字符串的最后一个
                a = removeStringLastLetter(a);
            }

            //新建一个对象
            arr.push({id:a + (i+1), pId:a?a:0, name:initNodeName(ele), t:initNodeTitle(ele)});
            
            //缓存当前的id
            a += (i+1).toString();

            //递归调用
            traverseDOM(arr, $(this).children(), a);
        });
    }
    
}

/**
 * removeStringLastLetter(str) 删除字符串最后一个字母
 * @param <String> str
 * @return <String> str
 */	
function removeStringLastLetter(str){
    var arr = str.split('');
    arr.pop();
    return arr.join('');
}

/**
 * initNodeName() 初始化节点名
 * @param void 
 * @return <Obj>
 */	
function initNodeName(ele){ 
    //处理ele的class，过滤掉clearfix
    var arr = $(ele).attr('class') ? $(ele).attr('class').split(' ') : [];
    for(var i in arr){
        //过滤掉.clearfix和.fl
        if(arr[i] == 'clearfix' || arr[i] == 'fl'){
            arr.splice(i, 1);
        }
    }
    var className = arr.join(' ')?'　类名：' + arr.join(' '):'';
    var nodeName = $(ele).attr('id') ? '元素：' + ele.tagName.toLowerCase() + '　id名：' + $(ele).attr('id') : '元素：' + ele.tagName.toLowerCase() + className;
    return nodeName;
}

/**
 * initNodeTitle() 初始化节点title
 * @param void 
 * @return <Obj>
 */	
function initNodeTitle(ele){ 
    //处理ele的class，过滤掉clearfix
    var arr = $(ele).attr('class') ? $(ele).attr('class').split(' ') : [];
    for(var i in arr){
        if(arr[i] == 'clearfix'){
            arr.splice(i, 1);
        }
    }
    var className = arr.join(' ');
    var title = '元素名：' + ele.tagName.toLowerCase() + '\n' + '类　名：' + className
    return $(ele).attr('id') ? 'id　　：' + $(ele).attr('id') + '\n' + title : '' + title;
}
