function phoneMask() {
    if ($('input[type="tel"]').length || $('input[type="tel"]').length) {
        $('input[type="tel"]').inputmask("+38(099) 999-99-99");  //static mask
    }
}

jQuery(document).ready(function($) {
    phoneMask();
});

jQuery(window).resize(function (){

});