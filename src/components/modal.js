import { ModalCloseEvent, imgLoadEvent } from "../events";
import { movieAPI } from "../omdbAPI";
import { HttpStatusCode } from "../omdbAPI/constants";
import { activeScroll } from "../util/scrollLock";

export class Modal {
  constructor(imdbId) {
    this.state = {
      imdbId,
    };

    this.el = this.#initModal();
  }

  #initModal() {
    const wrapper = this.#createElement("wrapper");
    const modal = this.#createElement("modal");
    const header = this.#createElement("header");
    const content = this.#createElement("content");

    modal.append(header, content);
    wrapper.appendChild(modal);

    return wrapper;
  }

  #createElement(elementType) {
    switch (elementType) {
      case "wrapper":
        const wrapperEl = document.createElement("div");
        wrapperEl.className = "modal__wrapper";

        return wrapperEl;
      case "modal":
        const modalEl = document.createElement("div");
        modalEl.className = "modal";

        return modalEl;
      case "header":
        const headerEl = document.createElement("div");
        headerEl.className = "modal-header";

        const closeBtn = document.createElement("button");
        closeBtn.classList.add("btn", "btn--rounded", "btn--close", "invert");

        headerEl.appendChild(closeBtn);

        return headerEl;
      case "content":
        const contentWrapperEl = document.createElement("div");
        contentWrapperEl.className = "modal-content__wrapper";

        const contentEl = document.createElement("div");
        contentEl.className = "modal-content";

        const $posterEl = this.#createElement("poster");

        const infoEl = document.createElement("div");
        infoEl.className = "movie-info";
        const movieTypeEl = document.createElement("div");
        movieTypeEl.className = "movie-type";
        const movieTitleEl = document.createElement("h3");
        movieTitleEl.className = "movie-title";
        const metaInfoEl = document.createElement("div");
        metaInfoEl.className = "meta-info";
        const releasedEl = document.createElement("div");
        releasedEl.className = "released";
        releasedEl.title = "개봉일";
        const runningTimeEl = document.createElement("div");
        runningTimeEl.className = "running-time";
        runningTimeEl.title = "상영 시간";
        const actorsEl = document.createElement("div");
        actorsEl.className = "actors";
        actorsEl.title = "배우";
        const ratingsEl = this.#createElement("rating");
        metaInfoEl.append(releasedEl, runningTimeEl, actorsEl, ratingsEl);

        const moviePlotEl = document.createElement("p");
        moviePlotEl.className = "movie-plot";

        infoEl.append(movieTypeEl, movieTitleEl, metaInfoEl, moviePlotEl);

        contentEl.append($posterEl, infoEl);
        contentWrapperEl.append(contentEl);

        return contentWrapperEl;
      case "poster":
        const posterWrapperEl = document.createElement("div");
        posterWrapperEl.className = "poster__wrapper";
        const posterEl = document.createElement("img");
        posterEl.className = "poster";
        posterWrapperEl.appendChild(posterEl);

        return posterWrapperEl;
      case "rating":
        const ratingEl = document.createElement("div");
        ratingEl.className = "rating";

        const scoreWrapperEl = document.createElement("div");
        scoreWrapperEl.className = "score__wrapper";
        const scoreEl = document.createElement("div");
        scoreEl.classList.add("score", "loading");
        scoreWrapperEl.appendChild(scoreEl);

        const scoreTextEl = document.createElement("span");
        scoreTextEl.className = "score--text";
        const leftBracket = document.createTextNode("(");
        const slash = document.createTextNode("/");
        const rightBracket = document.createTextNode(")");
        const scoreValueEl = document.createElement("span");
        scoreValueEl.className = "score-value";
        const scoreMaxEl = document.createElement("span");
        scoreMaxEl.className = "score-max";
        scoreMaxEl.textContent = "100";
        scoreTextEl.append(
          leftBracket,
          scoreValueEl,
          slash,
          scoreMaxEl,
          rightBracket
        );

        ratingEl.append(scoreWrapperEl, scoreTextEl);

        return ratingEl;
    }
  }

  #registerModalDimEvent() {
    this.el.addEventListener("click", handleDimClick);

    function handleDimClick(e) {
      const { target, currentTarget } = e;

      if (target.tagName !== "BUTTON" && target !== currentTarget) return;
      target.dispatchEvent(ModalCloseEvent());
      activeScroll();
    }
  }

  async #renderModalContent() {
    const { data } = await movieAPI.getMovieDetail(this.state.imdbId);
    const { status, payload, message } = data;

    if (status === HttpStatusCode.Ok && payload) {
      this.state = { ...this.state, ...payload.movie };

      const poster = this.el.querySelector(".poster");
      poster.src = this.state.poster;
      poster.alt = `${this.state.title}${this.state.title ? " " : ""}poster`;
      imgLoadEvent(poster);

      const [movieType, movieTitle, metaInfo, moviePlot] =
        this.el.querySelector(".movie-info").children;
      movieType.textContent = this.state.type;
      movieTitle.textContent = this.state.title;

      const [released, runningTime, actors, rating] = metaInfo.children;
      released.textContent = this.state.released;
      runningTime.textContent = this.state.runningTime;
      actors.textContent = this.state.actors.join(" , ");

      const metaScoreIsNan = this.state.metaScore === "NaN";
      rating.title = metaScoreIsNan
        ? `평가점수 제공되지 않음`
        : `평가점수 ${this.state.metaScore}점`;
      const score = rating.querySelector(".score__wrapper .score");
      score.classList.remove("loading");
      score.style.width = metaScoreIsNan ? "0%" : `${this.state.metaScore}%`;

      const scoreValue = rating.querySelector(".score--text .score-value");
      scoreValue.textContent = metaScoreIsNan
        ? "제공되지 않음"
        : this.state.metaScore;

      moviePlot.textContent = this.state.plot;
    }
  }

  render() {
    this.#registerModalDimEvent();

    document.body.appendChild(this.el);

    this.#renderModalContent();
  }

  unmount() {
    document.body.removeChild(this.el);
  }
}
