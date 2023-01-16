/* 
  poster: Poster,
  title: Title,
  type: Type,
  year: Number.parseInt(Year),
  imdbId: imdbID,
*/
import { imgLoadEvent } from "../events";

export class Movie {
  constructor(parent) {
    this.parent = parent;
    this.el = this.#initMovie();
    this.state = {};

    this.#render();
  }

  #initMovie() {
    const wrapper = this.#createElement("wrapper");
    const movie = this.#createElement("movie");

    const poster = this.#createElement("poster");

    const movieInfo = this.#createElement("movieInfo");
    const movieType = this.#createElement("movieType");
    const movieTitle = this.#createElement("title");
    movieInfo.append(movieType, movieTitle);

    movie.append(poster, movieInfo);
    wrapper.appendChild(movie);

    return wrapper;
  }

  #createElement(elementType) {
    switch (elementType) {
      case "wrapper":
        const wrapper = document.createElement("li");
        wrapper.className = "movie__wrapper";

        return wrapper;
      case "movie":
        const movie = document.createElement("div");
        movie.className = "movie";

        return movie;
      case "poster":
        const posterWrapper = document.createElement("div");
        posterWrapper.classList.add("poster__wrapper");

        const poster = document.createElement("img");
        poster.className = "poster";

        posterWrapper.append(poster);

        return posterWrapper;
      case "title":
        const title = document.createElement("h3");
        title.className = "movie-title";

        return title;
      case "movieType":
        const movieType = document.createElement("div");
        movieType.className = "movie-type";

        return movieType;
      case "movieInfo":
        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info", "loading");

        return movieInfo;
    }
  }

  #render() {
    this.parent.appendChild(this.el);
  }

  async renderMovieContent(movieData) {
    this.state = { ...this.state, ...movieData };

    this.el.dataset.imdbId = this.state.imdbId;

    const poster = this.el.querySelector(".poster");
    poster.src = this.state.poster;
    poster.alt = `${this.state.title}${this.state.title ? " " : ""}poster`;
    imgLoadEvent(poster);

    const movieInfo = this.el.querySelector(".movie-info");
    const [movieType, movieTitle] = movieInfo.children;
    movieType.textContent = this.state.type;
    movieTitle.textContent = this.state.title;
    movieInfo.classList.remove("loading");
  }
}
