import { Bind, DOCUMENT, Initiate, Listener } from '../core';
import { Subject } from 'rxjs';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock/lib/bodyScrollLock.es6';

function addVendors(element, property, value) {
  let upperCaseFirstCharInProperty = property.replace(property[0], property[0].toUpperCase());

  element.style[`webkit${upperCaseFirstCharInProperty}`] = value;
  element.style[`ms${upperCaseFirstCharInProperty}`] = value;
  element.style[property] = value;
}

function animate(element, property, value, duration, needClearAfter = false) {
  addVendors(element, 'transitionDuration', '');
  addVendors(element, 'transitionDuration', `${duration / 1000}s`);
  addVendors(element, property, value);
  // clear assets
  if (needClearAfter) {
    setTimeout(() => {
      addVendors(element, 'transitionDuration', '');
      addVendors(element, property, '');
    }, duration);
  }
}

const $toggle = DOCUMENT.getElementById('menu-toggle');

@Initiate()
export class Menu {
  $menu = DOCUMENT.getElementById('menu');
  $logo = DOCUMENT.querySelector('.header .logo');
  $toggle = $toggle;
  menuOpened = false;

  $header = DOCUMENT.getElementById('header');
  lastScrollYPosition = window.pageYOffset;
  @Bind('headerToggle') lastScrollDirection = null;

  constructor() {
    this.state = new Subject();
    this.state.subscribe(this.menuToggle.bind(this));
  }

  @Listener($toggle, 'click')
  click() {
    this.state.next(!this.menuOpened);
  }

  @Listener(DOCUMENT, 'scroll')
  scroll() {
    if (window.innerWidth >= 768) {
      return false;
    }

    if (window.pageYOffset <= 100) {
      return false;
    }

    if (window.pageYOffset - this.lastScrollYPosition >= 0) {
      this.lastScrollDirection = 'down';
    } else {
      this.lastScrollDirection = 'up';
    }

    this.lastScrollYPosition = window.pageYOffset;
  }

  headerToggle() {
    if (this.lastScrollDirection === 'down') {
      this.$header.classList.add('hidden');
    } else if (this.lastScrollDirection === 'up') {
      this.$header.classList.remove('hidden');
    }
  }

  menuToggle(nextState) {
    this.$toggle.classList.toggle('active');

    if (nextState) {
      disableBodyScroll(this.$menu.children[0]);
      this.$header.classList.remove('hidden');
      this.$logo.classList.add('white');
      animate(this.$menu, 'transform', 'translateX(0)', 400);
    } else {
      enableBodyScroll(this.$menu.children[0]);
      this.$logo.classList.remove('white');
      animate(this.$menu, 'transform', 'translateX(100%)', 400, true);
    }

    this.menuOpened = nextState;
  }
}
