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
                if(style[i] !== 'none'){
                    //识别颜色，并统一转为16进制
                    style[i] = rgbToHex(style[i]);
                    $('input[name="'+ attr +'"]').val(style[i]);
                    $('input[name="style-'+ attr +'"]').val(style[i]);    
                }
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
                        $('input[name="shadow-'+ sbattr +'"]').val(obj[j]);
                    }
                }               
                break;
            case 'borderRadius':
                $('input[name="'+ attr +'"]').val(style[i]);
                $('#'+i).slider('option', 'value', style[i].split('%')[0]);
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