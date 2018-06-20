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

jQuery(document).ready(function($) {
    phoneMask();
    languageToggle();
    characterAnimate();
    characterSlider();
    audioControl();
});

jQuery(window).resize(function (){

});