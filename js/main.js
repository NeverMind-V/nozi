function phoneMask() {
    if ($('input[type="tel"]').length || $('input[type="tel"]').length) {
        $('input[type="tel"]').inputmask("+38(099) 999-99-99");  //static mask
    }
}

function languageToggle() {
	$('.js-lang').on('click',function(){
		$('.js-lang .lang__list').slideToggle('fast');
	});
}

function characterAnimate() {	
	$('.character__body').on('click',function(e) {		
	  e.preventDefault();
	  var person = $(this);
	  $(this).addClass('jump');
	  setTimeout(function(){
	    person.removeClass('jump');
	  },600);
	});
}
function audioControl() {
	var audio = document.getElementById('audio-block');	
	audio.volume = 0.1;

	if (window.matchMedia('(max-width: 768px)').matches) {
        audio.pause();
    }

    $(window).resize(function () {
        if (window.matchMedia('(max-width: 768px)').matches) {
            audio.pause();
        } else {
            audio.play();
        }
    });

	$('.js-sound').on('click',function(){
		$('.asst2').fadeToggle();
		if(audio.paused == false) {
			audio.pause();
		}
		else {
			audio.play();
		}
	});
}
function characterSlider() {
	$(".js-character-slider").slick({
        dots: false,
        infinite: true,
        draggable: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,               
        prevArrow: '.js-character-left',
        nextArrow: '.js-character-right'
        // responsive: [{
        //     breakpoint: 769,
        //     settings: "unslick"
        //   }]
    });    
}
function hamburger() {
	$('.js-menu').on('click',function() {
		$(this).parent().toggleClass('is-active');
		$('.js-character-block').fadeToggle(300);
		if($(this).parent().hasClass('is-active')) {
			$('.js-dropdown>li').removeClass('bounceOutUp').addClass('animated bounceInDown');
		}
		else {
			$('.js-dropdown>li').removeClass('bounceInDown').addClass('animated bounceOutUp');
		}
		
		setTimeout(function(){
			// $('.js-background').toggleClass('menu-active');
		},600);
		setTimeout(function(){
	 		// $('.header__mob-dropdown').toggleClass('d-none');
		},800);
		
		
	});
}
function wowInit() {
    var wow = new WOW({
        boxClass: 'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 100,          // distance to the element when triggering the animation (default is 0)
        mobile: true,       // trigger animations on mobile devices (default is true)
        live: true,       // act on asynchronously loaded content (default is true)
        callback: function (box) {
            /*$(box).siblings('.heading__excerpt').textillate({
               loop: true,
               type: 'char',
               in: {
                  effect: 'flash',
                  shuffle: true,
               },
               // out animation settings.
               out: {
                  effect: '',

               },

            })*/
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
    });
    wow.init();
}

jQuery(document).ready(function($) {
    phoneMask();
    languageToggle();
    characterAnimate();
    characterSlider();
    audioControl();
    hamburger();
    wowInit();
});

jQuery(window).resize(function (){

});