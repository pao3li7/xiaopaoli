$(function() {
	$('.index-label>span').click(function() {
		var oIndex = $(this).index();
		$(this).addClass('active').siblings('span').removeClass('active');
		if(oIndex == 1) {
			$('.main').eq(0).addClass('hidden');
			$('.main').eq(1).removeClass('hidden');
		} else if(oIndex == 0) {
			$('.main').eq(1).addClass('hidden');
			$('.main').eq(0).removeClass('hidden');
		}
	})
});
