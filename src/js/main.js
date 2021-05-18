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

function isWindowInnerWidthSM() {
  return window.innerWidth > 767;
}

function dropdownMenu() {
  const items = document.querySelectorAll('.menu__item--dropdown');

  items.forEach((item) => {
    const menu = item.querySelector('.menu__dropdown');

    menu.classList.add('initiated');

    const enter = () => isWindowInnerWidthSM() && menu.classList.remove('closed');
    const leave = () => isWindowInnerWidthSM() && menu.classList.add('closed');

    item.addEventListener('mouseenter', enter);
    item.addEventListener('mouseleave', leave);
  });
}

dropdownMenu();
scrollToTop();
