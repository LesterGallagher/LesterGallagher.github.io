

var publicVapidKey = 'BABOUEnL-6mHr6Sf60UnNQS0cWHPmFXNmwTV2jHIoHAwdqOLJzGnbs-qr_BBxx1ePVozJa8qQzQamriCs5uU9EY';

if (navigator['serviceWorker']) {
	navigator.serviceWorker.register(swUrl).then(function (registration) {
		console.log('Service worker successfully registered on scope', registration.scope);

		registration.pushManager.getSubscription().then(function (subscription) {
			if (subscription !== null) return;

			document.querySelectorAll('.web-push-notifications').forEach(function (elem) {
				elem.classList.add('show');
			});

			document.querySelectorAll('.web-push-notifications .subscribe').forEach(function (elem) {
				elem.addEventListener('click', function () {
					elem.classList.add('loading');

					registration.pushManager.subscribe({
						userVisibleOnly: true,
						// The `urlBase64ToUint8Array()` function is the same as in
						// https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
						applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
					}).then(function (subscription) {
						return fetch('https://api.esstudio.site/api/notifications/esstudio/subscribe', {
							method: 'POST',
							body: JSON.stringify(subscription),
							headers: {
								'content-type': 'application/json'
							}
						});
					}).then(function (response) {
						return response.text();
					}).then(function (json) {
						var obj = JSON.parse(json);
						console.log('succesfully registered push notifications', obj);
						document.querySelectorAll('.web-push-notifications').forEach(function (elem) {
							elem.classList.remove('show');
						});
					}).catch(function (err) {
						elem.classList.remove('loading');
						alert('Something went wrong.');
						console.error(err);
					});
				});
			});
		});



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
			var instance = window.brickJsInstance = Bricks({
				container: grid,
				packed: 'data-packed',
				sizes: sizes
			});
			var prevFrame;
			function pack() {
				cancelAnimationFrame(prevFrame);
				prevFrame = requestAnimationFrame(instance.pack);
			}

			window.addEventListener('resize', pack);
			window.addEventListener('orientationchange', pack);
			window.addEventListener('lazyloaded', pack);
			pack();
		} catch (err) { console.error(err) }
	}

	var preload = document.getElementsByClassName('preload');
	for (var i = 0; i < preload.length; i++) {
		if (preload[i].getAttribute('as') === 'style') preload[i].rel = 'stylesheet';
	}
});

document.addEventListener('lazyload', function (e) {
	var lazy = e.target;
	if (lazy.tagName !== 'IMG') return;
	var img = new Image();

	img.onload = img.onerror = function () {
		lazy.src = img.src;
		lazy.classList.add("loaded");

		var event = document.createEvent('Event');
		event.initEvent('lazyloaded', true, true);
		lazy.dispatchEvent(event);
	};

	img.src = lazy.getAttribute("data-src");
});

(function () {
	var techStackSvg = document.getElementById('teck-stack-svg');
	if (techStackSvg !== null) {
		techStackSvg.addEventListener('lazyload', function () {
			document.body.appendChild
				(document.createElement('script'))
				.setAttribute('src', "/assets/js/techstack.js");
		});
	}
})();

function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
