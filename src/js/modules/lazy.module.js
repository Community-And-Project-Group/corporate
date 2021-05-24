import { Initiate } from '../core';
import { PolyfillLoader } from './polyfillLoader.service';

@Initiate()
export class Lazy {
  constructor() {
    const IO_PL = new PolyfillLoader().get('intersection-observer');
    const $lazyNodes = document.querySelectorAll('.lazy');

    IO_PL.subscribe(() => {
      [].forEach.call($lazyNodes, ($node) => this.getIntersectionObserver($node));
    });
  }

  getIntersectionObserver($node) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.prepareImage(entry.target);
          observer.disconnect();
        }
      });
    });

    io.observe($node);
  }

  prepareImage(target) {
    const IMG = new Image();
    const IS_SRC = target.hasAttribute('data-src');
    const IMG_URL = target.getAttribute(IS_SRC ? 'data-src' : 'data-bg');

    target.classList.add('lazy--loading');

    IMG.onload = () => {
      target.classList.remove('lazy--loading');
      IS_SRC ? this.setSrc(target, IMG_URL) : this.setBg(target, IMG_URL);
      target.classList.add('lazy--loaded');
    };
    IMG.src = IMG_URL;
  }

  setSrc(target, url) {
    target.src = url;
  }

  setBg(target, url) {
    target.style.backgroundImage = `url(${url})`;
  }
}
