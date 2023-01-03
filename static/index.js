var form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  go(form.querySelector('input').value)
});

async function go(url) {
  var sw = await navigator.serviceWorker.register('/worker.js', { scope: __aero$config.scope });

  location.assign(__aero$config.scope + url);
}

// sad no ts
// trol
// (︶︹︺)
