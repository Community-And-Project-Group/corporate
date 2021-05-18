import $ from 'jquery';
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

function projectTabs() {
  const buttons = $('.project-single__tabs-link');
  const tabs = $('.project-single__item');

  buttons.click((event) => {
    const target = $(event.target).closest('.project-single__tabs-link');
    const targetTab = $(`.project-single__item[data-tab="${target.attr('data-tab')}"]`);

    if (target.hasClass('current')) {
      return false;
    }

    buttons.filter('.current').removeClass('current');
    target.addClass('current');

    tabs.filter('.current').fadeOut().removeClass('current');

    targetTab.fadeIn().addClass('current');
  });
}

scrollToTop();
projectTabs();
