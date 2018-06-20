
if (navigator['serviceWorker']) {
	navigator.serviceWorker.register(swUrl, { scope: '/' }).then(function (registration) {
		console.log('Service worker successfully registered on scope', registration.scope);

	}).catch(function (error) {
		console.log('Service worker failed to register');
	});
}

window.addEventListener('load', function () {
	var grid = document.getElementById('grid');
	if (grid) {
		var sizes = [
			{ columns: 1, gutter: 0 },
			{ mq: '768px', columns: 2, gutter: 0 },
		];
		try {
			var instance = window.instance = Bricks({ 
				container: grid, 
				packed: 'data-packed', 
				sizes: sizes
			});
			window.addEventListener('resize', instance.pack);
			window.addEventListener('orientationchange', instance.pack);
			instance.pack();
		} catch (err) { console.error(err) }
	}

	var preload = document.getElementsByClassName('preload');
	for (var i = 0; i < preload.length; i++) {
		if (preload[i].getAttribute('as') === 'style') preload[i].rel = 'stylesheet';
	}
});
