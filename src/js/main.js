$(document).ready(function() {

	$('.action-buttons__btn').click(function(e) {
		e.preventDefault();
	})


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
		arrows: true,
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
	


	// $('.product-gallery__pic').attr('src', $('.product-gallery__link:first-child').attr('href') );

	$('body').on('click', '.product-gallery__link', function(event) {
		event.preventDefault();
		var src = $(this).attr('href');
		$('.product-gallery__pic').attr('src', src);
	});

	 //  $('#tel-buy').mask('+38(99) 99 99 99 99');
	 // $('.form-group__inp--mask').mask('+38(99) 99 99 99 99');

	$(this).find('.tabs-control__btn').each(function(i) {
		$(this).on('click', function(e) {
			$(this).addClass('active').siblings().removeClass('active')
			.closest('.product-info__tabs-wrap').find('.tab-content__item').removeClass('active').eq(i).addClass('active');
		})
	})

	var topMenu_show = false;

	$('.open-menu--nav').on('click', function() {
		$(this).toggleClass('open-menu--active');
		$('.categories__list').slideUp();
		$('.open-menu--categories').removeClass('open-menu--active');

		if(topMenu_show == false) {
				topMenu_show = true;
			}

			else {
				topMenu_show = false;
				$('.page-menu__submenu').slideUp();
			}

		$('.page-menu').toggleClass('page-menu--open');
	});

	var menu_visible = false;

	$('#open-category').on('click', function() {
		$(this).toggleClass('open-menu--active');

		if(menu_visible == false) {
			menu_visible = true;
		}

		else {
			menu_visible = false;
			$('.submenu--categories').slideUp();
		}
		$('.categories__list').slideToggle();

		
	});

	// var halfText = $('.about-sect__descr').height() / 2,
	// 		textHeight = $('.about-sect__descr').height();

	// 		$('.about-sect__descr').height(halfText);


	// $('.about-sect__more').on('click', function() {
	// 	$('.about-sect__descr').toggleClass('about-sect__descr--clip');
	// 	if( $('.about-sect__descr').height() == halfText ) {
	// 		$('.about-sect__descr').height(textHeight);
	// 		$(this).text(textSkip);
	// 	}

	// 	else {
	// 		$('.about-sect__descr').height(halfText);
	// 		$(this).text(textReadMore);
	// 	}

		
	// });

	var height = $('.about-sect__descr').height();
	var descr = $('.about-sect__descr').height() - 140;
	$('.about-sect__descr').css('height', descr + 'px');

$('.about-sect__more').click(function() {
  var $this = $(this);
  $this.toggleClass('active');
  $('.about-sect__descr').toggleClass('about-sect__descr--clip');


  if($this.hasClass('active') == true) {
  	$this.text(textSkip);
    $this.closest('.about-sect__content').find('.about-sect__descr').css('height', height + 'px');
  } 
  else {
  	$this.text(textReadMore);
    $this.closest('.about-sect__content').find('.about-sect__descr').css('height', descr + 'px');
  }
});

	
	$('.date').datetimepicker({
		pickTime: false
	});


	if( window.matchMedia("(max-width: 768px)").matches) {
		$('.page-menu__link--submenu-open').on('click', function(e) {
			e.preventDefault();

			$(this).next('.page-menu__submenu').slideToggle();
		}); 
	}

	if( window.matchMedia("(max-width: 991px)").matches) {

		$('.categories__link--open').on('click', function(e) {
			e.preventDefault();
			$('.submenu--categories').not($(this).next()).slideUp();
			$(this).parent().children('.submenu--categories').slideToggle();

		
		});
	}


if( window.matchMedia("(max-width: 768px)").matches) { 
	$('.tel-list').removeClass('header-page__tel-list')
	.children('.tel-list__item').removeClass('header-page__tel-item')
	.children('.tel-list__phone').removeClass('header-page__tel');
	$('.page-footer__wrap-phones').append($('.tel-list').addClass('page-footer__tel-list'));

	$('.page-footer__phone--open').on('click', function(e) {
		e.preventDefault();
		
		$('.page-footer__wrap-phones').slideToggle();
	});

	$('.product-list__item--full').each(function(i,elem) {
		$(elem).find('.product-list__content--list').prepend($(elem).find('.product-list__title-wrap--list'));

		$(elem).find('.product-list__middle').append($(elem).find('.product-list__left-wrap'));
		$(elem).find('.product-list__bottom-wrap-mob').append($(elem).find('.action-buttons__btn'));
		$(elem).find('.product-list__bottom-wrap-mob').append($(elem).find('.quantity'));
		$(elem).find('.product-list__bottom-wrap-mob').append($(elem).find('.product-list__btn-list'));
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