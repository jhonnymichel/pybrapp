import 'scss/index.scss';
import 'core-js/fn/object/assign';
import 'core-js/fn/object/values';
import 'core-js/fn/array/from';
import 'core-js/es6/promise';
import 'core-js/es6/symbol';
import 'core-js/es6/string';
import 'isomorphic-fetch';
import 'scrolling-element';
import AppRouter from 'app/AppRouter';
import Schedule from 'app/schedule-app';

const routes = [
  '/codigo-de-conduta',
  '/patrocinadores',
  '/programacao',
];

class App {
  constructor() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this));
  }

  onDeviceReady() {
    new Schedule();
  }
}

new App();
