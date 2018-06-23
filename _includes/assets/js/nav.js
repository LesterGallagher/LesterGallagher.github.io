var menuBtn = document.getElementById('menu-button');
var menu = document.getElementById('nav-items')
menuBtn.addEventListener('click', function (e) {
	if ((menuBtn.getAttribute('class') || '').indexOf('open') !== -1) {
		menuBtn.setAttribute('class', '');
		menu.setAttribute('class', 'close');
		setTimeout(function () {
			menu.setAttribute('class', '');
		}, 400);
	} else {
		menuBtn.setAttribute('class', 'menu-opened open');
		menu.setAttribute('class', 'open');
	}
});

