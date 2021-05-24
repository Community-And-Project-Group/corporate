import { DOCUMENT } from './core';

function scrollToTop() {
  const footer = DOCUMENT.getElementById('footer');
  const scrollToTopBtn = DOCUMENT.getElementById('scroll-to-top');

  DOCUMENT.addEventListener('scroll', function () {
    if (window.pageYOffset > 100) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.visibility = 'visible';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.visibility = 'hidden';
    }

    if (footer.getBoundingClientRect().top - window.innerHeight >= 0) {
      scrollToTopBtn.classList.add('scroll-to-top_fixed');
      scrollToTopBtn.classList.remove('scroll-to-top_absolute');
    } else {
      scrollToTopBtn.classList.add('scroll-to-top_absolute');
      scrollToTopBtn.classList.remove('scroll-to-top_fixed');
    }
  });
}

function isSM() {
  return window.innerWidth <= 767;
}

function dropdownMenu() {
  const items = document.querySelectorAll('.menu__item--dropdown');

  items.forEach((item) => {
    const menu = item.querySelector('.menu__dropdown');
    const isDirectionTop = menu.classList.contains('menu__dropdown--top');
    const isDirectionBottom = menu.classList.contains('menu__dropdown--bottom');
    const isHeaderMenu = menu.classList.contains('menu__dropdown--header');

    const open = () => {
      if (isSM() && isHeaderMenu) return;

      const { top, left, bottom } = item.getBoundingClientRect();

      if (isDirectionBottom) {
        menu.style.top = `${bottom}px`;
      } else if (isDirectionTop) {
        menu.style.bottom = `${window.innerHeight - top}px`;
      }

      menu.style.left = `${left}px`;
      menu.classList.remove('closed');
    };
    const close = () => {
      if (isSM() && isHeaderMenu) return;

      if (isDirectionBottom) {
        menu.style.top = '';
      } else if (isDirectionTop) {
        menu.style.bottom = '';
      }

      menu.style.left = '';

      menu.classList.add('closed');
    };

    menu.classList.add('initiated');

    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', close);
  });
}

dropdownMenu();
scrollToTop();
