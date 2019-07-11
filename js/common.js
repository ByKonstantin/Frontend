var swiper2 = new Swiper('.swip-container', {
	observer: true,
	observeParents: true,
	pagination: {
		el: '.swip-pagination',
		type: 'fraction',
	},
	navigation: {
		nextEl: '.swip-button-next',
		prevEl: '.swip-button-prev',
	},
});

$(function() {
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

	$("#mortgage-input" ).slider({
		animate: "slow",
		range: "min",
		step: 100000,
		min: 5000000,
		max: 80000000,
		value: 0,
		slide : function(event, ui) {
			var mortgageBtnIndex = $('.mortgage-btn button.active').text();
			var mortgageValue = ui.value
			var mortgageValueStr = mortgageValue.toString();
			var mortgageValueRep = mortgageValueStr.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
			var mortgageContribution = mortgageValue / 100 * 20;
			var mortgageContributionStr = mortgageContribution.toString();
			var mortgageContributionRep = mortgageContributionStr.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
			var mortgageSum = ( mortgageValue - mortgageContribution ) / mortgageBtnIndex;
			var mortgageSumStr = mortgageSum.toString();
			var mortgageSumRep = mortgageSumStr.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
			$("#mortgage-value").text(mortgageValueRep);
			$('.contribution-mortgage').text(mortgageContributionRep + ' рублей');
			$('.mortgage_sum').text(mortgageSumRep + ' рублей');
		}
	});

	$( "#invest-input" ).slider({
		animate: "slow",
		range: "min",
		step: 100000,
		min: 5000000,
		max: 80000000,
		value: 0,
		slide : function(event, ui) {
			var investBtnIndex = $('.invest-btn button.active').text();
			var investValue = ui.value
			var investValueStr = investValue.toString();
			var investValueRep = investValueStr.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
			var investSale = investValue + investValue / 100 * 15;
			var investSaleStr = investSale.toString();
			var investSaleRep = investSaleStr.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
			var investProfit = investValue / 100 * 15 * investBtnIndex;
			var investProfitStr = investProfit.toString();
			var investProfitRep = investProfitStr.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
			$("#invest-value").text(investValueRep);
			$('.invest-sale').text(investSaleRep + ' рублей');
			$('.invest-profit').text(investProfitRep + ' рублей');
		}
	});

	$('.invest-btn button').click(function () {
		$('.invest-btn button').removeClass('active');
		$(this).addClass('active');
		$( "#invest-input" ).slider();
	})

	$('.mortgage-btn button').click(function () {
		$('.mortgage-btn button').removeClass('active');
		$(this).addClass('active');
		$( "#mortgage-input" ).slider();
	})
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
	var screenWidth = ScreenWidth = screen.width;
	if (screenWidth > 768) {
		if ($(window).scrollTop() > numScroll) {
			$('.navbar').addClass('active');
			$('.select-menu').show(300).css('right', margRight);
		} else {
			$('.navbar').removeClass('active');
			$('.select-menu').hide(0);
		}
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

// меняет текст в селекте
$('.select-menu-items a').click(function (event) {
	var text = $(this).text();
	var index = $(this).parent().index();
	var indexCdhild = index + 2;

	$('.select-menu-selected').text(text);
	$('.p-0').removeClass('active');
	$('#row' + index + '').addClass('active');
	$('.row-column>*').removeClass('active');
	$('.row-column>*:nth-child(' + indexCdhild +')').addClass('active');

	// смена активной колонки

		$('.eleven-col').removeClass('active');
		$('#eleven-col-' + index +'').addClass('active');

	 event.preventDefault();
	 var id  = $(this).attr('href'),
	 top = $(id).offset().top;
	 $('body,html').animate({scrollTop: top}, 600);

});

// плавный скролл
$('.little a').click(function (event) {
	event.preventDefault();
	var id  = $(this).attr('href'),
	top = $(id).offset().top;
	$('body,html').animate({scrollTop: top}, 600);
});

// переключение слайдеров по названию
var com = $('.complex-item');
var	capital = $('.eights-content-capital');
var	neva = $('.eights-content-neva');
var	wings = $('.eights-content-wings');

com.click(function () {
	var checkIdCom = $(this).attr('id');
	var indexCom = $('#' + checkIdCom + '').index();
	var idActiveSlider = $('.complex-slider.active').attr('id');
	var indexActiveSlider = $('#' + idActiveSlider + '').index();
	var sliderActive = $('#complex-slider'+ indexCom + '-' + indexActiveSlider + '');

	roomInfo.removeClass('active');
	$('.eights-text-' + indexActiveSlider + '').addClass('active');

	com.removeClass('active');
	$(this).addClass('active');

	room.removeClass('active');
	sliderActive.addClass('active');

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
var roomClick = $('.eights-head a');
var roomActive = $('.complex-slider.active');
var roomInfo = $('.eights-text');

roomClick.click(function() {
	var indexRoom = $(this).parent().index();
	var idComplex = $('.complex-item.active').attr('id');
	var indexComplex = $('#' + idComplex + '').index();
	var selectText = $(this).text();

	var sliderActive = $('#complex-slider'+ indexComplex + '-' + indexRoom + '');
	var sliderActiveId = sliderActive.attr('id');
	roomClick.removeClass('active');
	$(this).addClass('active');
	room.removeClass('active');
	$('.eights-head-selected').text(selectText);
	sliderActive.addClass('active');
	roomInfo.removeClass('active');
	$('.eights-text-' + indexRoom + '').addClass('active');
});

// menu navbar
$('.menu-open').click(function () {
	var checkOpenMenu = $('.menu-open').hasClass('menu-close');
	var screenWidth = ScreenWidth = screen.width;
	if(checkOpenMenu == true) {
		if (screenWidth > 991 ) {
			$('.navbar-menu').css('display', 'none');
		} else {
			$('.navbar-wrapper').hide(300);
		}
		$('.menu-open').removeClass('menu-close');
		$('.select-menu-head').css('margin-top', '0');
	} else {
		if (screenWidth > 991 ) {
			$('.navbar-menu').css('display', 'flex');
		} else {
			$('.navbar-wrapper').show(300);
		}
		$('.menu-open').addClass('menu-close');
		$('.select-menu-head').css('margin-top', '45px');
	}
});

// room selected
$('.eights-head-selected').click(function () {
	$('.eights-head').toggleClass('d-none');
	$('.eights-head').toggleClass('d-flex');
	$(document).mouseup(function (e){
		var select = $('.eights-head-selected');
		if (!select.is(e.target)
		&& select.has(e.target).length === 0) {
			$('.eights-head').addClass('d-none');
			$('.eights-head').removeClass('d-flex');
		}
	});
})

// смена активной колонки
$('.eleven-link a').click(function () {
	var indexLink = $(this).index();
	$('.eleven-link a').removeClass('active');
	$('.eleven-col').removeClass('active');
	$(this).addClass('active');
	$('#eleven-col-' + indexLink +'').addClass('active');

	return false
});

// swipe
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	var heightWindows = ScreenWidth = screen.height;
	var scrollTop = scroll + heightWindows;
	var swipe1 = $('#swipe1');
	var swipe2 = $('#swipe2');
	var swipe3 = $('#swipe3');
	var swipe1Pos = swipe1.offset().top;
	var swipe2Pos = swipe2.offset().top;
	var swipe3Pos = swipe3.offset().top;

	if (scrollTop > swipe1Pos) {
		swipe1.addClass('active');
	}
	if (scrollTop > swipe2Pos) {
		swipe2.addClass('active');
	}
	if (scrollTop > swipe3Pos) {
		swipe3.addClass('active');
	}
});

// popup формы
$('.popup-open').click(function () {
	var popId = $(this).attr('id');
	$('.popup-wrapper').hide();
	$('#popup-' + popId + '').show();
});

$('.btn-close').click(function(){
	$('.popup-wrapper').hide();
});
