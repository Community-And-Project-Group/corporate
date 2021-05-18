import './core/polyfill';
import '../styles/index.css';

import { boot } from './core/boot';
import { Lazy } from './modules/lazy.module';
import { Video } from './modules/video.module';
import { TeamPreload } from './modules/team-video.module';
import { Menu } from './modules/menu.module';
import { Anchor } from './modules/anchor.module';

import './main';

//eslint-disable-next-line no-undef
const Rellax = require('rellax');

boot.init([
  { module: Lazy },
  { module: Menu },
  { module: Video },
  { module: TeamPreload },
  { module: Anchor },
  // module
]);

new Rellax('.rellax', {
  speed: -3,
  center: true,
  wrapper: null,
  round: true,
  vertical: true,
  horizontal: false,
});
