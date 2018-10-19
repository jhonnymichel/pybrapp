import 'scss/index.scss';
import 'core-js/fn/object/assign';
import 'core-js/fn/object/values';
import 'core-js/fn/array/from';
import 'core-js/fn/array/includes';
import 'core-js/es6/promise';
import 'core-js/es6/symbol';
import 'core-js/es6/string';
import 'isomorphic-fetch';
import 'scrolling-element';
import Schedule from 'app/schedule-app';
import initReactFastclick from 'react-fastclick';
import TransitionManager from 'app/TransitionManager';
initReactFastclick();

const routes = [
  '/codigo-de-conduta',
  '/patrocinadores',
  '/programacao',
];

class App {
  constructor() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this));
  }

  setupNotifications() {
    try {
      cordova.plugins.notification.local.setDefaults({
        led: { color: '#7FC7CF' },
        vibrate: true
      });
    } catch (e) {
      document.write(e.message);
    }
  }

  onDeviceReady() {
    console.log('device is ready');
    this.setupNotifications();
    if (cordova.platformId === 'android') {
      const tm = new TransitionManager({
        fadeSpeed: 120
      });

      tm.fadeContent(document.querySelector('#schedule'), 'fade-out')
        .then(() => {
          new Schedule();
          tm.fadeContent(document.querySelector('#schedule'), 'fade-out');
        })
    } else {
      new Schedule();
    }
  }
}

new App();
