import { Bind, DOCUMENT, Initiate, Listener } from '../core';
import { PolyfillLoader } from './polyfillLoader.service';

const LS = localStorage;
const LOCAL_STORAGE_ID = 'anchorId';

const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
const scrollIntoView = ($$) => {
  window.scrollTo({
    top: $$.getBoundingClientRect().top + window.pageYOffset,
    left: 0,
    behavior: 'smooth',
  });
};

@Initiate()
export class Anchor {
  @Bind('loadTrigger') pageLoaded = false;
  @Bind('loadTrigger') polyfillLoaded = false;

  constructor() {
    const SS_PL = new PolyfillLoader().get('smoothscroll');

    SS_PL.subscribe((module) => {
      module && module.polyfill && module.polyfill();
      this.polyfillLoaded = true;
    });
  }

  @Listener(window, 'load')
  load() {
    this.pageLoaded = true;
  }

  loadTrigger() {
    const isReady = this.pageLoaded && this.polyfillLoaded;

    if (isReady) {
      const id = LS.getItem(LOCAL_STORAGE_ID);
      if (id) {
        // remove item and scrollIntoView
        LS.removeItem(LOCAL_STORAGE_ID);
        setTimeout(() => scrollIntoView(DOCUMENT.getElementById(id)), 300);
      }
    }
  }

  @Listener(DOCUMENT, 'click')
  handleEvent(event) {
    const $target = event.target.closest('[data-anchor]');
    if (!$target) return;

    const data = $target.getAttribute('data-anchor');

    if ($target.href) {
      // save to ls
      event.preventDefault();
      LS.setItem(LOCAL_STORAGE_ID, data);
      window.location.assign($target.href);
    } else {
      // jumping
      data === '' ? scrollToTop() : scrollIntoView(DOCUMENT.getElementById(data));
    }
  }
}
