import { Subject } from 'rxjs';
import { DOCUMENT } from '../core';

const POLYFILLS = [
  {
    name: 'intersection-observer',
    isNeed: !('IntersectionObserver' in window),
    importCallback: () => import(/* webpackChunkName: "intersection-observer" */ 'intersection-observer'),
  },
  {
    name: 'smoothscroll',
    isNeed: !('scrollBehavior' in DOCUMENT.documentElement.style),
    importCallback: () => import(/* webpackChunkName: "smoothscroll-polyfill" */ 'smoothscroll-polyfill'),
  },
];

class PolyfillStatement {
  constructor(isNeed, importCallback) {
    this.isNeed = isNeed;
    this.importCallback = importCallback;

    this.loaded = false;
    this.emitter = new Subject();
    this.module = null;
  }

  subscribe(callback) {
    this.emitter.subscribe(callback);

    if (!this.loaded && this.isNeed) {
      this.importCallback().then((module) => {
        this.module = module;
        this.emitter.next(module);
        this.emitter.unsubscribe();
        this.loaded = true;
      });
    } else {
      callback(this.module);
    }
  }
}

export class PolyfillLoader {
  constructor() {
    POLYFILLS.forEach(
      (polyfill) => (this[polyfill.name] = new PolyfillStatement(polyfill.isNeed, polyfill.importCallback))
    );

    if (!PolyfillLoader._instance) PolyfillLoader._instance = this;
    else return PolyfillLoader._instance;
  }

  get(name) {
    return this[name];
  }
}
