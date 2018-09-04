$(document).ready(function() {


	$('.home-page__slider').slick({
		slidesToShow: 1,
		autoPlay: true,
		slidesToScroll: 1,
		swipeToSlide: true,
		dots: true,
		arrows: true,
		responsive: [
    {
      breakpoint: 480,
      settings: {
        arrows: false
      }
    }
    ]
  });

	$("#gallery-slider").slick({
		slidesToScroll: 1,
		slidesToShow: 4,
		vertical: true,
		infinite: false,
		responsive: [
		{
			breakpoint: 920,
			settings: {
				centerMode: false
			}
		},
		{
			breakpoint: 481,
			settings: {
				vertical: false
			}
		}
		]
	});

	$('.call-me').on('click', function() {
		$('.page-modal--callme').fadeIn();
		$('.page-modal__inp--name').focus();
	});

	$('.add-cart').on('click', function() {
		$('.page-modal--cart').fadeIn();
	});

	
	

	$('.page-modal__close').on('click', function() {
		$('.page-modal').fadeOut();
	});

	$('.page-modal__overlay').on('click', function() {
		$('.page-modal').fadeOut();
	});


	$('.search-form__select-product').selectric({
		inheritOriginalWidth:  false,
		disableOnMobile: false,
		nativeOnMobile: false
	});

	if( window.matchMedia("(min-width: 480px)").matches) {
		$(window).scroll(function() {
			if( $(this).scrollTop() > 50) {
  			$('.scroll-up').fadeIn();
  	}

  	else {
  		$('.scroll-up').fadeOut();
  	}
  })

  $('.scroll-up').on('click', function(event) {
  	
  	$('body, html').animate({
  		scrollTop: 0
  	}, 500);
  	return false;
  })
	}


	$('.product-gallery__pic').attr('src', $('.product-gallery__link:first-child').attr('href') );

	$('body').on('click', '.product-gallery__link', function(event) {
		event.preventDefault();
		var src = $(this).attr('href');
		$('.product-gallery__pic').attr('src', src);
	});

	$('#tel-buy').mask('+38(99) 99 99 99 99');
	$('.form-group__inp--mask').mask('+38(99) 99 99 99 99');

	$(this).find('.tabs-control__btn').each(function(i) {
		$(this).on('click', function(e) {
			$(this).addClass('active').siblings().removeClass('active')
			.closest('.product-info__tabs-wrap').find('.tab-content__item').removeClass('active').eq(i).addClass('active');
		})
	})

	$('#open-menu').on('click', function() {
		$(this).toggleClass('open-menu--active');
		$('.page-menu').toggleClass('page-menu--open');
	});

	$('#open-category').on('click', function() {
		$(this).toggleClass('open-menu--active');
		$('.categories__list').slideToggle();

		if( $('.categories__list').length === 0 ) {
			$('.submenu--categories').hide();
		}
	});

	var halfText = $('.about-sect__descr').innerHeight() / 2,
			textHeight = $('.about-sect__descr').innerHeight();

			$('.about-sect__descr').css('height', $('.about-sect__descr').innerHeight() /2);


	$('.about-sect__more').on('click', function(event) {
		event.preventDefault();
		$('.about-sect__descr').toggleClass('about-sect__descr--clip');
		if( $('.about-sect__descr').innerHeight() == halfText ) {
			$('.about-sect__descr').animate({
				height: textHeight
			}, 500);
			$(this).text('Скрыть');
		}

		else {
			$('.about-sect__descr').animate({
				height: halfText
			}, 500);
			$(this).text('Читать дальше');
		}

		
	});

	
	$('.date').datetimepicker({
		pickTime: false
	});

	if( window.matchMedia("(max-width: 991px)").matches) {
		$('.page-menu__item').on('click', function() {
			$(this).children('.submenu').slideToggle();
		});
		$('.search-form__btn-product').on('click', function() {
			$(this).children('.submenu').slideToggle();
		});

		$('.categories__link').on('click', function(e) {
			e.preventDefault();
			$('.submenu--categories').slideUp();
			$(this).parent().children('.submenu--categories').slideDown();

			if( $('.categories__list').length === 0 ) {
				$('.submenu--categories').hide();
			}
		});
	}


if( window.matchMedia("(max-width: 768px)").matches) { 
	$('.tel-list').removeClass('header-page__tel-list')
	.children('.tel-list__item').removeClass('header-page__tel-item')
	.children('.tel-list__phone').removeClass('header-page__tel');
	$('.page-footer__wrap-phones').append($('.tel-list').addClass('page-footer__tel-list'));
	$('.page-footer__phone--open').on('click', function(e) {
		e.preventDefault();
		console.log('хня');
		$('.page-footer__wrap-phones').slideToggle();
	});
}




	$('.quantity__btn--add').click(function() {
		var $input = $(this).parent().find('.quantity__inp');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
	});

	$('.quantity__btn--reduce').click(function() {
		var $input = $(this).parent().find('.quantity__inp');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
	 	$input.change();
	 	return false;
	 });

	
	if( $('#filter-range').length != 0 ) {

   var uiSlider = document.getElementById('filter-range');
  var snapValues = [
    document.getElementById('slider-snap-value-lower'),
    document.getElementById('slider-snap-value-upper')
  ];

  noUiSlider.create(uiSlider, {
    start: [582, 36400],
    connect: true,
    range: {
      'min': [582],
      'max': [36400]
    }
  });

  uiSlider.noUiSlider.on('update', function(values, handle) {
    snapValues[handle].innerHTML = values[handle];
  });
	}

	var $someImages = $('.ofi-img');
objectFitImages($someImages);



	
});