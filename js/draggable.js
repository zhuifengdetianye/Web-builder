$(document).ready(function(){
    //创建页面结构组件对象
    var  PageStructureModule = function() {
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
            for(var i in conf) { 
                //获取选择器字符串
                var selector = conf[i].selector === '' ? ele : $(conf[i].selector);

                //获取connectWith
                var connectWith = conf[i].connectWith;

                selector.sortable({
                    connectWith: connectWith,
                    cursor:'pointer',
                    placeholder: 'ui-sortable-placeholder'
                });
                
            }
        }
    };
    
    var pageStructureModule = new PageStructureModule();    
    pageStructureModule.init();

});





