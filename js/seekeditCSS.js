$(document).ready(function(){
    //初始化右侧样式显示栏的input为jQuery UI spinner
    var nameArr = ['width', 'min-width', 'max-width', 'height', 'max-height', 'min-height', 'shadow-offsetx', 'shadow-offsety','shadow-blur-radius',
        'border-radius', 'border-width', 'font-size', 'line-height'];
    
    //为margin、padding、position做特殊处理
    var positionArr = ['margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'top', 'right', 'bottom', 'left'];
    for(var i in nameArr){
        $('input[name="'+ nameArr[i] +'"]').spinner({
            stop: function( event, ui ) {
                //监听数据的改变，修改样式
                updateEleStyle(event, false);
            }
        });
        $('input[name="style-'+ nameArr[i] +'"]').spinner({
            stop: function( event, ui ) {
                //监听数据的改变，修改样式
                updateEleStyle(event, true);
            }
        });
    }
    for(var j in positionArr){
        $('input[name="'+ positionArr[j] +'"]').spinner({
            create: function( event, ui ) {
                //匹配并添加相对应的类
                var reg = /(top)|(right)|(bottom)|(left)/i;
                var name = event.target.name;
                $(event.target).parent().addClass(name.match(reg)[0]);
            },
            stop: function( event, ui ) {
                //监听数据的改变，修改样式
                updateEleStyle(event, false);               
            }
        });
    }
    $('.ui-spinner a').remove();

    //给text-align和vertical-align注册事件
    $('.size-and-position-align-row input[type="button"], .size-and-position-align-column input[type="button"]').on('click', function(){
        //获取当前left、center或right
        var arr = $(this).attr('name').split('-');
        var val = arr[arr.length-1];

        //改变元素样式
        if(arr[0] == 'text'){
            $('.currentEle').css({'text-align': val});
        }else{
            $('.currentEle').css({'vertical-align': val});
        }

        //改变按钮状态
        $(this).siblings().attr('class', 'btn btn-sys btn-sml');
        $(this).removeClass('btn-sys').addClass('btn-original');
    });

    //样式操作栏的select注册事件
    $('.style-operation select').on('change', function(){
        //获取当前样式
        var arr = $(this).attr('name').split('-');
        var val = $(this).val();

        if(arr[arr.length-1] == 'x'){
            //获取background-position-y
            var bpy = $('select[name="background-position-y"]').val();
            $('.currentEle').css({'background-position':val+' '+bpy});
        }else{
            //获取background-position-x
            var bpx = $('select[name="background-position-x"]').val();
            $('.currentEle').css({'background-position':bpx+' '+val})
        }
    });

    //样式摘要栏的select注册事件
    $('.style-abstract select, select[name="font-weight"]').on('change', function(){
        //获取当前样式
        var arr = $(this).attr('name').split('-');
        arr.splice(0,1);
        var name = arr.join('-');
        var val = $(this).val();

        //设置样式
        $('.currentEle').css(name, val);
    });

    $('select[name="font-weight"], select[name="font-family"]').on('change', function(){
        //获取当前样式
        var name = $(this).attr('name');
        var val = $(this).val();

        //设置样式
        $('.currentEle').css(name, val);
    })

    //取色板组件
    $('#backgroundColor, #shadowColor, #borderColor, #color, #styleBorderColor, #styleBackgroundColor').colpick({
        layout:'hex',
        submit:0,
        colorScheme:'dark',
        onChange:function(hsb,hex,rgb,el,bySetColor) {
            $(el).css('border-color','#'+hex);
            // Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
            if(!bySetColor) $(el).val(hex);
            
            // 获取样式
            var arr = $(el).attr('name').split('-');
            var val = $(el).val();
            var name;

            //如果是style-abstract中的input
            if(arr[0] == 'style'){
                arr.splice(0, 1);
                name = arr.join('-');

                //同步修改样式
                $('input[name="'+ name +'"]').val(val).css('border-color','#'+hex);
            }else{
                name = $(el).attr('name');

                //同步修改样式
                    $('input[name="style-'+ name +'"]').val(val).css('border-color','#'+hex);
            }
            $('.currentEle').css(name, '#'+val);
        }
    }).keyup(function(){
        $(this).colpickSetColor(this.value);
    });

});

/**
 * updateEleStyle(event, isAbstract) 更新选中元素的样式
 * @param <Obj> event
 * @param <Boolean> isAbstract
 * @return null
 */	
function updateEleStyle(event, isAbstract) {
    //获取input
    var $this = $(event.target);

    //获取选中元素
    var $ele = $('.currentEle');

    //获取当前值
    var val = $this.val();
    console.log(val)

    //确定当前修改的样式
    var styleName;
    if(!isAbstract){
        styleName = $this.attr('name');

        //更新样式摘要
        $('input[name="style-'+ styleName +'"]').val(val);
    }else{
        var arr = $this.attr('name').split('-');
        arr.splice(0, 1);
        styleName = arr.join('-');

        //更新样式摘要
        $('input[name="'+ styleName +'"]').val(val);
    }

    //修改选中元素的样式
    $ele.css(styleName, val+'px');
}

/**
 * getStyle(ele) 获取选中元素的css样式
 * @param <Obj> ele
 * @return <Obj>
 */	
function getStyle(ele){
    var style = {
        display: ele.css('display'),

        float: ele.css('float'),
        clear: ele.css('clear'),

        width: ele.css('width'),
        maxWidth: ele.css('max-width'),
        minWidth: ele.css('min-width'),
        height: ele.css('height'),
        maxHeight: ele.css('max-height'),
        minHeight: ele.css('min-height'),

        textAlign: ele.css('text-align'),
        verticalAlign: ele.css('vertical-align'),

        marginTop: ele.css('margin-top'),
        marginRight: ele.css('margin-right'),
        marginBottom: ele.css('margin-bottom'),
        marginLeft: ele.css('margin-left'),

        paddingTop: ele.css('padding-top'),
        paddingRight: ele.css('padding-right'),
        paddingBottom: ele.css('padding-bottom'),
        paddingLeft: ele.css('padding-left'),

        position: ele.css('position'),
        top: ele.css('top'),
        right: ele.css('right'),
        bottom: ele.css('bottom'),
        left: ele.css('left'),
        zIndex: ele.css('z-index'),

        backgroundColor: ele.css('background-color'),
        backgroundImage: ele.css('background-image'),
        backgroundPosition: ele.css('background-position'),
        boxShadow: ele.css('box-shadow'),

        borderTop: ele.css('border-top'),
        borderLeft: ele.css('border-left'),
        borderBottom: ele.css('border-bottom'),
        borderRight: ele.css('border-right'),

        borderRadius: ele.css('border-radius'),
        borderWidth: ele.css('border-width'),
        borderColor: ele.css('border-color'),

        fontFamily: ele.css('font-family'),
        fontWeight: ele.css('font-weight'),
        fontSize: ele.css('font-size'),
        color: ele.css('color'),
        lineHeight: ele.css('line-height'),

        opacity: ele.css('opacity'),
        overflow: ele.css('overflow'),
        cursor: ele.css('cursor')
    }
    return style;
}

/**
 * showStyle(ele) 展示选中元素的css样式
 * @param <Obj> ele
 * @return null
 */
function showStyle(style){
    for(var i in style){
        //把marginLeft转成margin-left
        var attr = reverseCamel(i);
        switch(i){
            case 'backgroundPosition':
                var bp = style[i].split(' ');
                
                $('select[name="'+ attr +'-x"]').val(bp[0] == '0%' ? 'left' : bp[0]);
                $('select[name="'+ attr +'-y"]').val(bp[1] == '0%' ? 'top' : bp[1]);
                break;
            case 'backgroundColor':
            case 'borderColor':
            case 'color':
                if(style[i] !== 'none'){
                    //识别颜色，并统一转为16进制
                    style[i] = rgbToHex(style[i]);
                    $('input[name="'+ attr +'"]').val(style[i]);
                    $('input[name="style-'+ attr +'"]').val(style[i]);    
                }
                break;
            case 'textAlign':
                //重置状态
                $('.size-and-position-align-row input[type="button"]').attr('class', 'btn btn-sys btn-sml');
                $('input[name="text-align-'+ style[i] +'"]').removeClass('btn-sys').addClass('btn-original');
                break;
            case 'verticalAlign':
                //重置状态
                $('.size-and-position-align-column input[type="button"]').attr('class', 'btn btn-sys btn-sml');
                $('input[name="vertical-align-'+ style[i] +'"]').removeClass('btn-sys').addClass('btn-original');
                break;
            case 'fontFamily':
                var arr = style[i].split(',');
                style[i] = arr[0];
                $('select[name="'+ attr +'"]').val(style[i]);
            case 'fontWeight':
                if(style[i] == 400){
                    style[i] = 'normal';
                }else if(style[i] == 700){
                    style[i] = 'bold';
                }
                $('select[name="'+ attr +'"]').val(style[i]);
                break;
            case 'display':
            case 'position':
            case 'float':
            case 'clear':
            case 'overflow':
            case 'cursor':
                $('select[name="style-'+ attr +'"]').val(style[i]);
                break;
            case 'boxShadow':
                if(style[i] !== 'none'){
                    var obj = analysisShadowBox(style[i]);          
                    for(var j in obj){
                        var sbattr = reverseCamel(j);
                        $('input[name="shadow-'+ sbattr +'"]').val(obj[j].split('px')[0]);
                    }
                }               
                break;
            default:
                //过滤掉“px”
                $('input[name="'+ attr +'"]').val(style[i].split('px')[0]);
                $('input[name="style-'+ attr +'"]').val(style[i].split('px')[0]);
        }
        
        
    }
}

/**
 * analysisShadowBox(str) 解析shadowbox
 * @param <String> str
 * @return <Obj> obj
 */
function analysisShadowBox(str){
    var arr = str.split(') ');
    var obj = {};
    //颜色
    obj.color = rgbToHex(arr[0]+')');
    var arr1 = arr[1].split(' ');
    //横向
    obj.offsetx = arr1[0];
    //纵向
    obj.offsety = arr1[1];
    //模糊距离
    obj.blurRadius = arr1[2];
    //阴影尺寸
    obj.spread = arr1[3];

    return obj;
}

/**
 * rgbToHex(rgb) 把rgb转成hex
 * @param <Obj> rgb
 * @return <String> str
 */
function rgbToHex(rgb) {
    var rRgba = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/,
        r, g, b, a,
        rsa = rgb.replace(/\s+/g, "").match(rRgba);
    if (rsa) {
        r = (+rsa[1]).toString(16);
        r = r.length == 1 ? "0" + r : r;
        g = (+rsa[2]).toString(16);
        g = g.length == 1 ? "0" + g : g;
        b = (+rsa[3]).toString(16);
        b = b.length == 1 ? "0" + b : b;
        a = (+(rsa[5] ? rsa[5] : 1)) * 100
        return r + g + b;
    } else {
        return rgb;
    }
    
};