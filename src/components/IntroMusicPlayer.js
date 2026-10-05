/**
 * THE ODYSSEY - CINEMATIC INTRO MUSIC PLAYER
 * Uses YouTube IFrame Player API to stream background soundtrack
 * Video ID: u0Riy2fTBvU ("You Are Solving The Impossible" - Interstellar Soundtrack)
 * 
 * Strict Requirements:
 * - Hidden player with zero visual interference
 * - Music starts ONLY when user clicks "BEGIN THE JOURNEY →" (respects autoplay policies)
 * - SOUND ON / SOUND OFF controls
 * - Stops music when user clicks "SKIP INTRO →" or when intro completes
 * - Graceful error handling with zero console errors
 */

export class IntroMusicPlayer {
  constructor(options = {}) {
    this.videoId = 'u0Riy2fTBvU';
    this.containerId = 'yt-intro-player';
    this.player = null;
    this.isReady = false;
    this.pendingPlay = false;
    this.soundEnabled = true;
    this.hasStarted = false;
    this.onStateChangeCallback = options.onStateChange || (() => {});

    this.initDOM();
    this.loadYouTubeAPI();
  }

  initDOM() {
    let container = document.getElementById(this.containerId);
    if (!container) {
      const wrapper = document.createElement('div');
      wrapper.className = 'yt-hidden-player-container';
      wrapper.setAttribute('aria-hidden', 'true');

      container = document.createElement('div');
      container.id = this.containerId;
      wrapper.appendChild(container);
      document.body.appendChild(wrapper);
    }
  }

  loadYouTubeAPI() {
    // If YouTube API is already loaded
    if (window.YT && window.YT.Player) {
      this.initPlayer();
      return;
    }

    // Register global hook
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === 'function') previousReady();
      this.initPlayer();
    };

    // Inject YouTube API script if not present
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(tag, firstScript);
      } else {
        document.head.appendChild(tag);
      }
    }
  }

  initPlayer() {
    if (this.player || !window.YT || !window.YT.Player) return;

    try {
      this.player = new window.YT.Player(this.containerId, {
        height: '200',
        width: '200',
        videoId: this.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: this.videoId
        },
        events: {
          onReady: () => {
            this.isReady = true;
            if (this.player && typeof this.player.setVolume === 'function') {
              try {
                this.player.setVolume(85);
              } catch (e) {}
            }
            if (this.pendingPlay && this.soundEnabled) {
              this.pendingPlay = false;
              this.play();
            }
          },
          onError: (e) => {
            // Silently absorb errors to prevent console breakage
            console.warn('[Odyssey Audio] YouTube player notice (code: ' + e.data + ')');
          }
        }
      });
    } catch (err) {
      console.warn('[Odyssey Audio] Initialization notice:', err);
    }
  }

  /**
   * Called when user clicks "BEGIN THE JOURNEY →"
   */
  startJourney() {
    this.hasStarted = true;
    if (this.soundEnabled) {
      this.play();
    }
  }

  play() {
    if (this.isReady && this.player && typeof this.player.playVideo === 'function') {
      try {
        if (typeof this.player.unMute === 'function') {
          this.player.unMute();
        }
        this.player.playVideo();
      } catch (err) {
        console.warn('[Odyssey Audio] Play notice:', err);
      }
    } else {
      this.pendingPlay = true;
    }
  }

  pause() {
    this.pendingPlay = false;
    if (this.isReady && this.player && typeof this.player.pauseVideo === 'function') {
      try {
        this.player.pauseVideo();
      } catch (err) {}
    }
  }

  /**
   * Stops audio and resets player state
   */
  stop() {
    this.pendingPlay = false;
    this.hasStarted = false;
    if (this.isReady && this.player) {
      try {
        if (typeof this.player.stopVideo === 'function') {
          this.player.stopVideo();
        } else if (typeof this.player.pauseVideo === 'function') {
          this.player.pauseVideo();
        }
      } catch (err) {}
    }
  }

  /**
   * Toggles sound between SOUND ON and SOUND OFF
   * Returns current soundEnabled state (true = ON, false = OFF)
   */
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;

    if (this.soundEnabled) {
      // Turn sound ON
      if (this.hasStarted) {
        this.play();
      }
    } else {
      // Turn sound OFF
      this.pause();
    }

    this.onStateChangeCallback(this.soundEnabled);
    return this.soundEnabled;
  }
}
