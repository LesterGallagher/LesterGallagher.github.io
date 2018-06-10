// JavaScript Document

$('#subscribeform').submit(function () {
	var action = $(this).attr('action');
	$("#mesaj").slideUp(750, function () {
		$('#mesaj').hide();
		$('#subsubmit')
			.after('')
			.attr('disabled', 'disabled');
		$.post(action, {
			email: $('#subemail').val()
		},
			function (data) {
				document.getElementById('mesaj').innerHTML = data;
				$('#mesaj').slideDown('slow');
				$('#subscribeform img.subscribe-loader').fadeOut('slow', function () { $(this).remove() });
				$('#subsubmit').removeAttr('disabled');
				if (data.match('success') != null) $('#subscribeform').slideUp('slow');
			}
		);
	});
	return false;
});

if (navigator['serviceWorker']) {
	navigator.serviceWorker.register(serviceWorkerUrl, { scope: './' }).then(function (registration) {
		console.log('Service worker successfully registered on scope', registration.scope);

	}).catch(function (error) {
		console.log('Service worker failed to register');
	});
}

new LazyLoad({
	threshold: 0
});

$.fn.isInViewport = function () {
	var elementTop = $(this).offset().top;
	var elementBottom = elementTop + $(this).outerHeight();
	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();
	return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(function () {
	var grid = document.getElementById('grid');
	if (grid) {
		new AnimOnScroll(grid, {
			minDuration: 0.4,
			maxDuration: 0.7,
			viewportFactor: 0.2
		});
	}

	// preload
	var $mainCss = $('#maincss');
	$mainCss.attr('rel', 'stylesheet');
	setTimeout(function () {
		$mainCss.on('load', function (e) {
			$(grid).masonry();
		});
	}, 0);
});
