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
		$('.page-menu').toggleClass('page-menu--open');
	});

	$('.about-sect__more').on('click', function(event) {
		event.preventDefault();
		$('.about-sect__text').toggleClass('about-sect__text--clip');

		if( $('.about-sect__text').hasClass('about-sect__text--clip') ) {
			$(this).html('Читать дальше');
		}

		else {
			$(this).html('Свернуть');
		}
	})


	
});