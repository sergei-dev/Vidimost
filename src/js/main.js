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

	$('.product-gallery__pic').attr('src', $('.product-gallery__link:first-child').attr('href') );

	$('body').on('click', '.product-gallery__link', function(event) {
		event.preventDefault();
		var src = $(this).attr('href');
		$('.product-gallery__pic').attr('src', src);
	});

	$('#tel-buy').mask('+38(99) 99 99 99 99');

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
	});

	var halfText = $('.about-sect__text').innerHeight() / 2,
			textHeight = $('.about-sect__text').innerHeight();

			$('.about-sect__text').css('height', $('.about-sect__text').innerHeight() /2);


	$('.about-sect__more').on('click', function(event) {
		event.preventDefault();
		$('.about-sect__text').toggleClass('about-sect__text--clip');
		if( $('.about-sect__text').innerHeight() == halfText ) {
			$('.about-sect__text').animate({
				height: textHeight
			}, 500);
			$(this).text('Скрыть');
		}

		else {
			$('.about-sect__text').animate({
				height: halfText
			}, 500);
			$(this).text('Читать дальше');
		}

		
	});

	if( window.matchMedia("(max-width: 991px)").matches) {
		$('.submenu').hide();
		$('.page-menu__item').on('click', function() {
			$(this).children('.submenu').slideToggle();
		});
		$('.search-form__btn-product').on('click', function() {
			$(this).children('.submenu').slideToggle();
		});
	}

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

  var quantity_val = $('.quantity__inp').val();
  var quantity_numb = parseInt(quantity_val);

  $('.quantity-reduce').on('click', function() {
  		quantity_numb--;
  		
  		if ( quantity_numb < 0) {
  			$('.quantity__inp').val(0);
  		}

  		else {
  			$('.quantity__inp').val(quantity_numb);
  		}

  	})

  $('.quantity-add').on('click', function() {
  		quantity_numb++;
  		if ( quantity_numb > 0) {
  			$('.quantity__inp').val(quantity_numb);
  		}
  });




	
});