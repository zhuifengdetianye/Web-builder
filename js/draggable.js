$(document).ready(function(){
    $(".linear-layout-module").draggable({
		connectToSortable: "#operationPanelContainer",
		helper: "clone",
		start: function(e,t) {
			
		},
		drag: function(e, t) {
			
		},
		stop: function(e, t) {
			$("#operationPanelContainer").sortable({
				opacity: .35,
				connectWith: "#operationPanelContainer",
				start: function(e,t) {
					
				},
				stop: function(e,t) {
					
				}
			});
		}
	});
})