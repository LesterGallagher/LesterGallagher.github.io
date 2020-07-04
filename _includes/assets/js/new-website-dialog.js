(function () {
  var dialog = document.getElementById('new-website-dialog')
  if (dialog) {
    var btnClose = dialog.querySelector('.btn.close')
    btnClose.addEventListener('click', function(e) {
      dialog.style.display = 'none'
      dialog.removeAttribute('open')
    })
  }
})();