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

	$('.open-menu').on('click', function() {
		$(this).toggleClass('open-menu--active');
		$('.page-menu').toggleClass('page-menu--open');
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

  var quantity_val = $('#quantity').val();
  var quantity_numb = parseInt(quantity_val);

  $('#quantity-reduce').on('click', function() {
  		quantity_numb--;
  		
  		if ( quantity_numb < 0) {
  			$('#quantity').val(0);
  		}

  		else {
  			$('#quantity').val(quantity_numb);
  		}

  	})

  $('#quantity-add').on('click', function() {
  		quantity_numb++;
  		if ( quantity_numb > 0) {
  			$('#quantity').val(quantity_numb);
  		}


  })




	
});