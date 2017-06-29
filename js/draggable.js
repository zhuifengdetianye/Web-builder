$(document).ready(function(){
    $('.linear-layout-module').draggable({
        helper: 'clone'
    });
    $("#operationPanelContainer").droppable({
        accept: '.linear-layout-module',
        drop: function(event, ui){
            $(this).append($("<div class='linear-layout clearfix'></div>"));

            //添加sortable
            $(this).sortable({
                cursor:'pointer',
                placeholder: 'ui-sortable-placeholder'
            });

            //注册子容器组件的的拖拽事件
            $('.sub-container-module').draggable({
                helper: 'clone'
            });
            $(".linear-layout").droppable({
                accept: '.sub-container-module',
                drop: function(event, ui){
                    $(this).append($("<div class='sub-container fl clearfix'></div>"));

                    //添加sortable
                    $(this).sortable({
                         connectWith: '.linear-layout',
                         placeholder: 'ui-sortable-placeholder'
                    });

                    //注册栏目容器组件的的拖拽事件
                    $('.column-container-module').draggable({
                        helper: 'clone'
                    });
                    $(".sub-container").droppable({
                        accept: '.column-container-module',
                        drop: function(event, ui){
                            $(this).append($("<div class='column-container fl'></div>"));

                            //添加sortable
                            $(this).sortable({
                                connectWith: '.sub-container'
                            });
                        }
                    });
                }
            });
        }
    });
})