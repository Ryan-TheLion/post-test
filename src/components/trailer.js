// control state에 따라 달라지는 css - event처리

export class Trailer {
  constructor(trailerSrc, parent = document.querySelector("main")) {
    this.state = {
      srcList: [...trailerSrc],
      curTrailerIndex: 0,
    };

    this.parent = parent;

    this.video = this.#createVideoElement();
    this.control = this.#createControl();
    this.el = this.#InitTrailer();

    this.render();
  }

  #InitTrailer() {
    const trailer = document.createElement("div");
    trailer.className = "trailer";
    trailer.id = "home";

    const wrapper = document.createElement("div");
    wrapper.className = "inner";

    wrapper.append(this.video.wrapper, this.control.el);

    trailer.appendChild(wrapper);

    return trailer;
  }

  #createControl() {
    const controlEl = document.createElement("div");
    controlEl.className = "control";

    const playOnOffBtnEl = document.createElement("button");
    playOnOffBtnEl.classList.add("btn", "btn--rounded", "video--playing");

    const soundOnOffBtnEl = document.createElement("button");
    soundOnOffBtnEl.classList.add("btn", "btn--rounded", "sound--muted");

    const controlComponent = {
      el: controlEl,
      ref: this.video.el,
      btnList: new Map([
        ["playOnOff", playOnOffBtnEl],
        ["soundOnOff", soundOnOffBtnEl],
      ]),
      getControlType(target) {
        const classListArray = Array.from(target.classList);
        if (
          classListArray.find((className) => className.startsWith("sound--"))
        ) {
          return "soundOnOff";
        }
        if (
          classListArray.find((className) => className.startsWith("video--"))
        ) {
          return "playOnOff";
        }
      },
      requestSoundOnOff(soundState) {
        soundState === "muted"
          ? (this.ref.muted = true)
          : (this.ref.muted = false);

        return this.ref.muted ? "muted" : "listen";
      },
      requestPlayOnOff(playState) {
        playState === "paused" ? this.ref.pause() : this.ref.play();

        return this.ref.paused ? "paused" : "playing";
      },
    };

    controlEl.append(...controlComponent.btnList.values());

    controlEl.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") return;

      const controlEventMap = {
        soundOnOff: soundOnOffEvent,
        playOnOff: playOnOffEvent,
      };

      controlEventMap[controlComponent.getControlType(e.target)]();

      function soundOnOffEvent() {
        const requestSoundState = controlComponent.ref.muted
          ? "listen"
          : "muted";
        const requestResult =
          controlComponent.requestSoundOnOff(requestSoundState);

        const mutedClassName = "sound--muted";
        const listenClassName = "sound--listen";
        const soundOnOffBtnClassList =
          controlComponent.btnList.get("soundOnOff").classList;

        if (requestResult === "muted") {
          soundOnOffBtnClassList.remove(listenClassName);
          soundOnOffBtnClassList.add(mutedClassName);
          return;
        }
        soundOnOffBtnClassList.remove(mutedClassName);
        soundOnOffBtnClassList.add(listenClassName);
        return;
      }

      function playOnOffEvent() {
        const requestPlayState = controlComponent.ref.paused
          ? "playing"
          : "paused";

        controlComponent.requestPlayOnOff(requestPlayState);
      }
    });

    return controlComponent;
  }

  #createVideoElement() {
    const wrapper = document.createElement("div");
    wrapper.className = "video";

    const video = document.createElement("video");
    video.src = this.state.srcList[0].src;
    video.autoplay = true;
    video.muted = true;
    video.volume = 0.2;

    const pauseClassName = "video--paused";
    const playingClassName = "video--playing";

    video.addEventListener("pause", (e) => {
      const playOnOffBtn = this.control.btnList.get("playOnOff");

      playOnOffBtn.classList.add(pauseClassName);
      playOnOffBtn.classList.remove(playingClassName);
    });

    video.addEventListener("play", (e) => {
      const playOnOffBtn = this.control.btnList.get("playOnOff");

      playOnOffBtn.classList.add(playingClassName);
      playOnOffBtn.classList.remove(pauseClassName);
    });

    video.addEventListener("ended", (e) => {
      setTimeout(() => {
        this.state.curTrailerIndex =
          (this.state.curTrailerIndex + 1) % this.state.srcList.length;
        video.src = this.state.srcList[this.state.curTrailerIndex].src;
      }, 1500);
    });

    wrapper.appendChild(video);

    return { wrapper, el: video };
  }

  render() {
    this.parent.appendChild(this.el);
  }
}
