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
