import { Bind, DOCUMENT, Initiate, Listener } from '../core';

const breakpoint = (w) => w <= 991;
const VIDEO_SRC = 'assets/media/capgMV';
const $base = DOCUMENT.getElementById('video');

@Initiate({
  onViewInit: $base,
})
export class Video {
  alive = false;
  @Bind('update') state;
  $base = $base;
  sourcePC = `
		<video autoplay muted loop playsinline>
			<source src="${VIDEO_SRC}_pc.webm" type="video/webm">
			<source src="${VIDEO_SRC}_pc.mp4" type="video/mp4">
		</video>
	`;
  sourceSP = `
		<video autoplay muted loop playsinline>
			<source src="${VIDEO_SRC}_sp.webm" type="video/webm">
			<source src="${VIDEO_SRC}_sp.mp4" type="video/mp4">
		</video>
	`;

  onViewInit() {
    this.state = breakpoint(window.innerWidth);
    this.updateMediaQuery();
    this.alive = true;
  }

  @Listener(window, 'resize')
  updateMediaQuery() {
    if (breakpoint(window.innerWidth) !== this.state && this.alive) {
      this.state = breakpoint(window.innerWidth);
    }
  }

  update() {
    if (this.state) {
      this.$base.innerHTML = this.sourceSP;
    } else {
      this.$base.innerHTML = this.sourcePC;
    }
  }
}
