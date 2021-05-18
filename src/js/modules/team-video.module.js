import { Bind, DOCUMENT, Initiate } from '../core';

const PUBLIC_PATH = 'assets/media/';

@Initiate()
export class TeamPreload {
  baseElement = null;
  @Bind('currentVideoUpdater') currentVideo;
  videos = [
    {
      media: '(min-width: 992px)',
      filename: 'team-1920-1080',
    },
    {
      media: '(max-width: 991px) and (min-width: 768px)',
      filename: 'team-1536-2048',
    },
    {
      media: '(max-width: 768px)',
      filename: 'team-750-1334',
    },
  ];

  constructor() {
    this.baseElement = DOCUMENT.getElementById('team-preload');

    if (!this.baseElement) {
      return;
    }

    this.currentVideo = this.videos.find((video) => matchMedia(video.media).matches);
  }

  playAndHidePreload() {
    this.baseElement.innerHTML = this.getVideoTemplate(this.currentVideo.filename);
    const videoElement = this.baseElement.querySelector('video');

    videoElement.addEventListener('ended', () => {
      DOCUMENT.getElementById('wrapper').style.opacity = '';
      this.baseElement.style.transition = 'opacity 3s ease-in-out 0s';
      this.baseElement.style.opacity = 0;
      setTimeout(() => {
        videoElement.pause();
        DOCUMENT.body.removeChild(this.baseElement);
      }, 3000);
    });

    videoElement.play();
  }

  getVideoTemplate(filename) {
    return `
		<video class="preload-video" muted playsinline>
			<source src="${PUBLIC_PATH}${filename}.mp4" type="video/mp4">
		</video>
		`;
  }

  // Reactive methods

  currentVideoUpdater() {
    this.playAndHidePreload();
  }
}
