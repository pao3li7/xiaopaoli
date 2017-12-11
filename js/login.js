$(function() {
	$('.header>div').click(function() {
		var oIndex = $(this).index();
		$(this).addClass('active').siblings('div').removeClass('active');
		if(oIndex == 0) {
			$('#quick-login-page').addClass('active');
			$('#login-page').removeClass('active');
		} else {
			$('#quick-login-page').removeClass('active');
			$('#login-page').addClass('active');
		}
	})

	$('.login-icon').click(function() {
		$(this).toggleClass('login-unchecked login-checked');
	})
});
