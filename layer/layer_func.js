/*
    layer插件参数：
        time: 3000; 自动关闭时间,毫秒
        area: ['240px', '120px']; 宽/高
        shade: [0.5, '#393D49']; 遮罩的透明度/颜色
        icon: 0; 图标样式, 0警告/1成功/2失败
        
 */
//配置skin
layer.config({
	//skin:'layer-ext-espresso',
	//extend:'skin/espresso/style.css'
});
// 提示信息 content: 内容
function alertMsg(content, icon) {
    layer.msg(content, {
        icon : icon,
        closeBtn : '2',
        time : 1500,
        area : [ '240px', '135px' ],
        shade : [ 0.5, '#393D49' ]
    });
}