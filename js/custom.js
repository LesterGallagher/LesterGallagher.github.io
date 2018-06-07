

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
	navigator.serviceWorker.register('./sw.js', { scope: './' }).then(function (registration) {
		console.log('Service worker successfully registered on scope', registration.scope);

	}).catch(function (error) {
		console.log('Service worker failed to register');
	});
}



