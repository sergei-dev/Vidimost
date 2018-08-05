$(document).ready(function() {


	$('.home-page__slider').slick({
		slidesToShow: 1,
		autoPlay: true,
		slidesToScroll: 1,
		swipeToSlide: true,
		dots: true,
		arrows: true
	});

	$('.open-menu').on('click', function() {
		$(this).toggleClass('open-menu--active');
	})


	
});