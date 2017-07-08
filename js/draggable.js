$(document).ready(function(){
	//注册行容器的拖拽事件
    $(".linear-layout-module").draggable({
		connectToSortable: "#operationPanelContainer",
		helper: "clone",
		start: function(e, t) {
			
		},
		drag: function(e, t) {
			
		},
		stop: function(e, t) {
			//注册行容器之间的拖拽排序事件
			$(".linear-layout").sortable({
				opacity: .35,
				connectWith: ".linear-layout",
				start: function(e,t) {
					
				},
				stop: function(e,t) {
					//注册子容器之间的拖拽排序事件
					$(".sub-container").sortable({
						opacity: .35,
						connectWith: ".sub-container",
						start: function(e,t) {
							
						},
						stop: function(e,t) {
							
						}
					});
				}
			});

		}
	});

	//操作面板的sortable事件
	$("#operationPanelContainer").sortable({
		opacity: .35,
		connectWith: "#operationPanelContainer",
		start: function(e,t) {
			
		},
		stop: function(e,t) {
			
		}
	});

	//注册子容器的拖拽事件
	$(".sub-container-module").draggable({
		connectToSortable: ".linear-layout",
		helper: "clone",
		start: function(e, t) {

		},
		drag: function(e, t) {
			
		},
		stop: function(e, t) {
			
		}
	});

	//注册栏目容器的拖拽事件
	$(".column-container-module").draggable({
		//这里注册可以在行容器和子容器之间拖拽排序
		connectToSortable: ".linear-layout, .sub-container",
		helper: "clone",
		start: function(e, t) {

		},
		drag: function(e, t) {
			
		},
		stop: function(e, t) {
			
		}
	});
	

})