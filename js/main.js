(function($) {

	'use strict';


	/* SCROLL */

  	$('a[href^="#"]').on('click', function(event) {
  		var target = $($(this).attr('href') );
	   	if( target.length ) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 2000);
	    }
	});

	/* MENU NA HOVER */

	$('ul.mainmenu li.menu-item').mouseenter(function(){
		$(this).find('a').css({'color':'#32c4f5', 'font-weight':'300'});
		$(this).find('div.separator').css('margin-top','-8px');
	});
	$('ul.mainmenu li.menu-item').mouseleave(function(){
		$(this).find('a').css({'color':'#ccc', 'font-weight':'100'});
		$(this).find('div.separator').css('margin-top','-10px');
	});

	/* TIMELINE */

	$('.event-item.active .event-description').css('display','block');

	$('.event-item').click(function(){
		$('.event-item.active .event-description').slideUp();

		$('.event-item').removeClass('active'); 
		$(this).addClass('active');

		if($('.event-item.active').length > 0){
		$(this).find('.event-description').slideDown();
		} else {
			$('.event-description').slideUp();
		}
	});

	/* SPEAKERS ACTION */

	$('.speaker-open').click(function(){
		$('.speaker-item').removeClass('active');
		$(this).parentsUntil().parent('.speaker-item').toggleClass('active');
	});	

	$('.speaker-close').click(function(){
		$(this).parentsUntil().parent('.speaker-item').removeClass('active');
	});

	/* CONTACT FORM VAIDATOR */
	$().ready(function() {
	    $("#contact1").validate({
	    	rules: {
				name: {
					required: true,
					minLength:2
				},

				email: {
					required: true,
					email: true
				},

				subject: {
					required: true,
					minlength: 2
				},

				message: {
					required: true,
					minLength: 2
				}
			},
			messages: {
				name: {
					required: "Please enter your name",
					minLength: ""
				},				
				email: {
					required: "Please enter your email",
					email: "Pleas enter a valid email address"
				},
				subject: {
					required:"Please enter subject",
					minLength: ""
				},
				message: {
					require: "Please enter message",
					minLength: ""
				}
			}
				
    	});
	});

	/* UNIFORM */

    var $uniformed = $("input[type=checkbox]").not(".skipThese");
    $uniformed.uniform();

	/* MAPA GOOGLE */	    
  
  	var mapa; // obiekt globalny
  	var dymek = new google.maps.InfoWindow();
	
	
	function mapaStart()  
	{  
		var dymek = new google.maps.InfoWindow();
		var wspolrzedne = new google.maps.LatLng(52.235192, 20.997448);
		var styl = [ 
			{ "featureType": "road", 
			   "elementType": 
			   "labels.icon", 
			   "stylers": [ 
				  { "saturation": 1 }, 
				  { "gamma": 1 }, 
				  { "visibility": "off" }
			   ] 
			},

			{ "elementType": "all", "stylers": [ 
				{ 
					"saturation": -100 } 
			  ] 
			} 
		];
		var opcjeMapy = {
			zoom: 12,
			center: wspolrzedne,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: false,
			backgroundColor:"#eeeeee",

		};

		mapa = new google.maps.Map(document.getElementById("mapka"), opcjeMapy); 

		var mapType = new google.maps.StyledMapType(styl, {name:"Grayscale"});    
				mapa.mapTypes.set('grey', mapType);
				mapa.setMapTypeId('grey');

		// dymek.setContent('Pierwsze okienko z informacjami!');
		// dymek.setPosition(new google.maps.LatLng(52.235192, 20.997448));
		// dymek.open(mapa);
	
		// wspólne cechy ikon
		var rozmiar = new google.maps.Size(209,235);
		// var rozmiar_cien = new google.maps.Size(59,32);
		var punkt_startowy = new google.maps.Point(0,0);
		var punkt_zaczepienia = new google.maps.Point(135,235);
		
		// ikonki
		var ikona1 = new google.maps.MarkerImage("images/marker.png", rozmiar, punkt_startowy, punkt_zaczepienia);
		
		
		// var cien1 = new google.maps.MarkerImage("http://maps.google.com/mapfiles/kml/pal2/icon38s.png", rozmiar_cien, punkt_startowy, punkt_zaczepienia);
		
		
		dodajMarker({position: new google.maps.LatLng(52.235192, 20.997448), title: 'Miejsce', icon: ikona1});	
	}  

	function dodajMarker(opcjeMarkera)
	{
		opcjeMarkera.map = mapa;
		var marker = new google.maps.Marker(opcjeMarkera);

		google.maps.event.addListener(marker,'click',function(zdarzenie)
		{

			dymek.setContent('<div class="info"><p>Miejsce<br />Adres 00</p></div>');  
			dymek.setPosition(new google.maps.LatLng(52.235192, 20.997448));  
			dymek.open(mapa);

			$('.gm-style-iw').siblings('div').hide();
 			$('.gm-style-iw').parent('div').addClass('window-info');
  
		});
	}
	
	

	mapaStart();



})(jQuery);