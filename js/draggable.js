$(document).ready(function(){
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
    
    var Menu = function(){
        //新建操作栈
        this.handleStack = new HandleStack();
        //注册上一步的监听事件
        this.prev = function(){
            $this = this;
            $('.last-step').on('click', function(){
                if($this.handleStack.DOMStack.length){
                    //DOMStack出栈
                    var ele = $this.handleStack.popStack($this.handleStack.DOMStack, 0);

                    //DOMStackCache入栈
                    $this.handleStack.pushStack($this.handleStack.DOMStackCache, ele, 1);
                    
                    //取当前topIndex
                    var html = $this.handleStack.DOMStack[$this.handleStack.topIndex[0] - 1];
                    
                    $('#operationPanelContainer').children().remove().end().append(html);
                }else{
                    layer.msg('已经到最上一步！');
                }
                
            });
        };

        //注册上一步的监听事件
        this.next = function(){
            $this = this;
            $('.next-step').on('click', function(){
                if($this.handleStack.DOMStackCache.length){
                    //DOMStackCache出栈
                    var ele = $this.handleStack.popStack($this.handleStack.DOMStackCache, 1);

                    //DOMStack入栈
                    $this.handleStack.pushStack($this.handleStack.DOMStack, ele, 0);

                    $('#operationPanelContainer').children().remove().end().append(ele);
                }else{
                    layer.msg('已经到最上一步！');
                }   
            })
        }

    }
    
    //创建页面结构组件对象
    var  PageStructureModule = function() {
        //新建操作栈
        this.handleStack = new HandleStack();
        //关闭按钮代码
        this.closeHTML = '<a class="toolbar-close"><i class="fa fa-window-close"></i></a>';
        //配置容器的信息
        this.containers = [
            {
                name: '父容器',
                source: '.linear-layout-module',
                target: '#operationPanelContainer',
                html: '<div class="linear-layout clearfix"></div>'
            },
            {
                name: '子容器',
                source: '.sub-container-module',
                target: '.linear-layout',
                html: '<div class="sub-container fl clearfix"></div>'
            },
            {
                name: '栏目容器',
                source: '.column-container-module',
                target: '.sub-container',
                html: '<div class="column-container fl"></div>'
            }
        ];

        //配置栏目组件的信息
        this.columnModule = {
            articleList: [
                {
                    name: '文章列表栏目1',
                    source: '.article-list-module1',
                    target: '.column-container-module',
                    html: '<ul><li><a href="#">津门故里，万象更新——记留学生“感知中国—津门古今”活动</a></li><li><a href="#">郭军副校长会见美国南佛罗里达大学陈光帧教授</a></li><li><a href="#">理学院青年教师在新型超短脉冲光纤激光器中取得新进展</a></li></ul>'
                }
            ]
        };

        //每个容器的sortable配置信息
        this.sortConfs = [
            [
                {selector: '', connectWith: ''},
                {selector: this.containers[1].target, connectWith: this.containers[1].target},
                {selector: this.containers[2].target, connectWith: this.containers[2].target}
            ],
            [
                {selector: this.containers[0].target, connectWith: ''},
                {selector: '', connectWith: this.containers[1].target},
                {selector: this.containers[2].target, connectWith: this.containers[2].target}
            ],
            [
                {selector: this.containers[0].target, connectWith: ''},
                {selector: this.containers[1].target, connectWith: this.containers[1].target},
                {selector: '', connectWith: this.containers[2].target}
            ]
        ];
        
        //页面容器的初始化，主要是拖拽、放置、排序的初始化
        this.init = function() {

            $this = this;
            this.addClickEvent();
            //为父容器注册拖拽事件
            $($this.containers[0].source).draggable({
                helper: 'clone',
                snap: $this.containers[0].target
            });
            //为父容器添加放置事件
            $($this.containers[0].target).droppable({
                //指定目标droppable接受哪一个元素
                accept: $this.containers[0].source,
                drop: function(event, ui){
                    $(this).append($($this.containers[0].html));
                    
                    //添加DOM到操作栈
                    var html = jQuery.trim($($this.containers[0].target).html());
                    $this.handleStack.pushStack($this.handleStack.DOMStack, html, 0);

                    //添加sortable            
                    $this.addSortable($(this), $this.sortConfs[0]);
                    
                    //为子容器组件添加拖拽事件
                    $($this.containers[1].source).draggable({
                        helper: 'clone',
                        snap: $this.containers[1].target
                    });

                    //为子容器组件添加放置事件
                    $($this.containers[1].target).droppable({
                        accept: $this.containers[1].source,
                        drop: function(event, ui){
                            $(this).append($($this.containers[1].html));

                            //添加DOM到操作栈
                            html = jQuery.trim($($this.containers[0].target).html());
                            $this.handleStack.pushStack($this.handleStack.DOMStack, html, 0);

                            //添加sortable                   
                            $this.addSortable($(this), $this.sortConfs[1]);

                            //为栏目容器组件添加拖拽事件
                            $($this.containers[2].source).draggable({
                                helper: 'clone',
                                snap: $this.containers[2].target
                            });

                            //为栏目容器组件添加放置事件
                            $($this.containers[2].target).droppable({
                                accept: $this.containers[2].source,
                                drop: function(event, ui){
                                    $(this).append($($this.containers[2].html));
                                    //添加DOM到操作栈
                                    html = jQuery.trim($($this.containers[0].target).html());
                                    $this.handleStack.pushStack($this.handleStack.DOMStack, html, 0);
                                    
                                    //添加sortable                            
                                    $this.addSortable($(this), $this.sortConfs[2]);                            
                                }
                            });
                        }
                    });
                }
            });
        };

        /**
         * addSortable() 抽象容器的sortable方法
         * conf = [
         *    {selector: '#operationPanelContainer', connectWith: ''},
         *    {selector: '.linear-layout', connectWith: '.linear-layout'},
         *    {selector: '', connectWith: '.sub-container'}
         * ];
         * @param <Array> conf 
         * @param <Object> ele 
         * @return null
         */
        this.addSortable = function(ele, conf) {
            var $this = this;
            for(var i in conf) { 
                //获取选择器字符串
                var selector = conf[i].selector === '' ? ele : $(conf[i].selector);

                //获取connectWith
                var connectWith = conf[i].connectWith;

                selector.sortable({
                    connectWith: connectWith,
                    cursor:'pointer',
                    placeholder: 'ui-sortable-placeholder',
                    stop: function(event, ui){
                        //添加DOM到操作栈
                        html = jQuery.trim($($this.containers[0].target).html());
                        $this.handleStack.pushStack($this.handleStack.DOMStack, html, 0);
                    }
                });
                
            }
        };

        //添加工具条
        this.addToolbar = function(ele) {
            $this = this;
            //给该元素添加删除按钮，同时删除其他toolbar
            this.delToolbar();
            ele.append(this.closeHTML);
            ele.css({border:'1px solid #660066'});
            //注册关闭按钮点击时候的事件
            $(document).on('click', '.toolbar-close', function(event){
                //添加DOM到操作栈
                $(this).parent().remove();
                var html = jQuery.trim($('#operationPanelContainer').html());
                $this.handleStack.pushStack($this.handleStack.DOMStack, html, 0);
            });
        };

        //删除工具条
        this.delToolbar = function() {
            $('.toolbar-close').remove();
        }
        //添加点击事件监听
        this.addClickEvent = function() {
            //缓存this上下文
            var $this = this;
            $(document).on('click', '.linear-layout, .sub-container, .column-container', function(event){
                //阻止事件冒泡
                event.stopPropagation();
                //在当前元素上添加工具
                $this.addToolbar($(this));
            });
            //容器失去焦点的时候，删除toolbar
            $(document).on('click', function(){
                $this.delToolbar();
            });
        };
    };

    //新建菜单栏
    var menu = new Menu();
    menu.prev();
    menu.next();

    //新建页面结构组件
    var pageStructureModule = new PageStructureModule();    
    pageStructureModule.init();

});





