/**
 * Cordova bootstrap for Joker Player.
 */
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
  const ready = document.getElementById('deviceready');
  if (ready) ready.classList.add('ready');
}
