// JavaScript Document
function openThemes() {
  $( ".makale-tema" ).css("left","0vw");
  $( ".makale-tema-opener" ).css("left","-30px");
}
$( ".makale-tema-opener" ).on( "click", openThemes );

function closeThemes() {
  $( ".makale-tema" ).css("left","-100vw");
	$( ".makale-tema-opener" ).css("left","0px");
}
$( ".makale-tema-closer" ).on( "click", closeThemes );

function addColorToTheme() {
	if ($('.makale-tema-01 input').is(':checked')) {
	$('span.makale-tema-01').addClass('makale-tema-color-01');
}
	if (!$('.makale-tema-01 input').is(':checked')) {
	$('span.makale-tema-01').removeClass('makale-tema-color-01');
}
	if ($('.makale-tema-02 input').is(':checked')) {
	$('span.makale-tema-02').addClass('makale-tema-color-02');
}
	if (!$('.makale-tema-02 input').is(':checked')) {
	$('span.makale-tema-02').removeClass('makale-tema-color-02');
}
	if ($('.makale-tema-03 input').is(':checked')) {
	$('span.makale-tema-03').addClass('makale-tema-color-03');
}
	if (!$('.makale-tema-03 input').is(':checked')) {
	$('span.makale-tema-03').removeClass('makale-tema-color-03');
}
	if ($('.makale-tema-04 input').is(':checked')) {
	$('span.makale-tema-04').addClass('makale-tema-color-04');
}
	if (!$('.makale-tema-04 input').is(':checked')) {
	$('span.makale-tema-04').removeClass('makale-tema-color-04');
}
	if ($('.makale-tema-05 input').is(':checked')) {
	$('span.makale-tema-05').addClass('makale-tema-color-05');
}
	if (!$('.makale-tema-05 input').is(':checked')) {
	$('span.makale-tema-05').removeClass('makale-tema-color-05');
}
	if ($('.makale-tema-06 input').is(':checked')) {
	$('span.makale-tema-06').addClass('makale-tema-color-06');
}
	if (!$('.makale-tema-06 input').is(':checked')) {
	$('span.makale-tema-06').removeClass('makale-tema-color-06');
}
	if ($('.makale-tema-07 input').is(':checked')) {
	$('span.makale-tema-07').addClass('makale-tema-color-07');
}
	if (!$('.makale-tema-07 input').is(':checked')) {
	$('span.makale-tema-07').removeClass('makale-tema-color-07');
}
	if ($('.makale-tema-08 input').is(':checked')) {
	$('span.makale-tema-08').addClass('makale-tema-color-08');
}
	if (!$('.makale-tema-08 input').is(':checked')) {
	$('span.makale-tema-08').removeClass('makale-tema-color-08');
}
	if ($('.makale-tema-09 input').is(':checked')) {
	$('span.makale-tema-09').addClass('makale-tema-color-09');
}
	if (!$('.makale-tema-09 input').is(':checked')) {
	$('span.makale-tema-09').removeClass('makale-tema-color-09');
}
	if ($('.makale-tema-10 input').is(':checked')) {
	$('span.makale-tema-10').addClass('makale-tema-color-10');
}
	if (!$('.makale-tema-10 input').is(':checked')) {
	$('span.makale-tema-10').removeClass('makale-tema-color-10');
}
}

$( ".makale-tema-element" ).on( "click", addColorToTheme);



var elementPosition = $('.makale-tema-holder').offset();

$(window).scroll(function(){
        if($(window).scrollTop() > elementPosition.top - 50 && window.innerWidth < 992){
              $('.makale-tema-holder').css('position','fixed').css('top','75px');
        }  else {
			$('.makale-tema-holder').css('position','static');
		}
});


