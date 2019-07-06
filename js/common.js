function reloadSlider () {
	 new Swiper('.swip-container', {
		pagination: {
			el: '.swip-pagination',
			type: 'fraction',
		},
		navigation: {
			nextEl: '.swip-button-next',
			prevEl: '.swip-button-prev',
		},
	});
}
$(function() {
	reloadSlider ();
	// слайдер
	var swiper = new Swiper('.swiper-container', {
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	// var swiper2 = new Swiper('.swip-container', {
	// 	pagination: {
	// 		el: '.swip-pagination',
	// 		type: 'fraction',
	// 	},
	// 	navigation: {
	// 		nextEl: '.swip-button-next',
	// 		prevEl: '.swip-button-prev',
	// 	},
	// });


	$( ".invest-box-input" ).slider({
	    animate: "slow",
	    range: "min",
			step: 100,
			max: 300000,
			value: 0,
			slide : function(event, ui) {
				$(".invest-box-value").text(ui.value);
			}
		});




	// яндекс карта
	ymaps.ready(init);
	function init() {
		var map = new ymaps.Map('map', {
			center: [55.717976527275965,37.48270854620885],
			zoom: 12,
			controls: ['zoomControl'],
			behaviors: ['drag']
		});

		var placemark = new ymaps.Placemark([55.69575253686475,37.470190500000015], {hintContent: '<div class="map__hint">Крылья</div>'}, {

			iconLayout: 'default#image',
			iconImageHref: '../img/@1x/map-wings.png',
			iconImageSize: [40, 40],
			iconImageOffset: [-20, -20]
		});

		var placemark1 = new ymaps.Placemark([55.75148201441697,37.53505800000001], {hintContent: '<div class="map__hint">Нева тауэрс</div>' }, {

			iconLayout: 'default#image',
			iconImageHref: '../img/@1x/map-newa.png',
			iconImageSize: [40, 40],
			iconImageOffset: [-20, -20]
		});

		var placemark2 = new ymaps.Placemark([55.751606507465105,37.5491835], {hintContent: '<div class="map__hint">Кэпитал тауэрс</div>'}, {

			iconLayout: 'default#image',
			iconImageHref: '../img/@1x/map-capital.png',
			iconImageSize: [40, 40],
			iconImageOffset: [-20, -20]
		});
		map.geoObjects.add(placemark);
		map.geoObjects.add(placemark1);
		map.geoObjects.add(placemark2);
	}

	// Custom JS

});

// фиксированый навбар + меню выбора
var numScroll = 200; // Устанавливаем высоту скоролла при котором он становиться фиксированным
var margRight = $('.container').css('margin-right'); // автоматический отступ справа для меню выбора

$(window).on('scroll', function () {
	if ($(window).scrollTop() > numScroll) {
		$('.navbar').addClass('active');
		$('.select-menu').show(300).css('right', margRight);
	} else {
		$('.navbar').removeClass('active');
		$('.select-menu').hide(0);
	}
});

// открытие/закрытие меню выбора
$('.select-menu-head').click(function() {
	$('.select-menu-items').toggle(300);
});

$(document).mouseup(function (e){
	var div = $(".select-menu");
	if (!div.is(e.target)
	&& div.has(e.target).length === 0) {
		$('.select-menu-items').hide();
	}
});

const hash = {
	'Capital Towers': {
		c1: 'addClass',
		c2: 'removeClass',
		c3: 'removeClass'
	},
	'Neva Towers': {
		c1: 'removeClass',
		c2: 'addClass',
		c3: 'removeClass'
	},
	'ЖК Крылья': {
		c1: 'removeClass',
		c2: 'removeClass',
		c3: 'addClass'
	}
}

// меняет текст в селекте
$('.select-menu-items a').click(function () {
	var text = $(this).text();
	$('.select-menu-selected').text(text);
	const activeClassName = 'active'
  $('#column1')[hash[text].c1](activeClassName)
  $('#column2')[hash[text].c2](activeClassName)
  $('#column3')[hash[text].c3](activeClassName)
});

// переключение слайдеров по названию
var com = $('.complex-item');
		capital = $('.eights-content-capital');
		neva = $('.eights-content-neva');
		wings = $('.eights-content-wings');

com.click(function () {
	var checkIdCom = $(this).attr('id');
	com.removeClass('active');
	$(this).addClass('active');

	if(checkIdCom == 'complex-1') {
		capital.addClass('active');
		neva.removeClass('active');
		wings.removeClass('active');
	}
	if(checkIdCom == 'complex-2') {
		neva.addClass('active');
		capital.removeClass('active');
		wings.removeClass('active');
	}
	if(checkIdCom == 'complex-3') {
		wings.addClass('active');
		neva.removeClass('active');
		capital.removeClass('active');
	}
});

// выбор квартиры
var room = $('.complex-slider');
		roomClick = $('.eights-head a');
		roomActive = $('.complex-slider.active');
		roomInfo = $('.eights-text')

		roomClick.each(function(i) {
			$(this).click(function() {
				checkActive = $(this).hasClass('active');
				if(checkActive == true) {
					return
				} else {
					roomClick.removeClass('active');
					$(this).addClass('active');
					room.removeClass('active');
					$('.complex-slider-'+i+'').addClass('active');
					roomInfo.removeClass('active');
					$('.eights-text-'+i+'').addClass('active');
				}
			});
		});
