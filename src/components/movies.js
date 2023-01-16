import { ModalOpenEvent } from "../events";

export class Movies {
  constructor(parent = document.querySelector("main")) {
    this.parent = parent;
    this.moviesEl = null;
    this.fetchMoreEl = null;

    this.el = this.#initMovies();

    this.state = {
      movieList: [],
      take: 10,
      maxPage: 0,
      currentPage: 0,
      totalResults: 0,
      searchParams: {
        searchKeyword: "",
        year: 0,
      },
    };

    this.#render();
  }

  #initMovies() {
    const wrapper = this.#createElement("wrapper");
    const movies = this.#createElement("movies");
    const fetchMore = this.#createElement("fetchMore");

    this.moviesEl = movies;
    this.fetchMoreEl = fetchMore;
    wrapper.append(movies);

    return wrapper;
  }

  #createElement(elementType) {
    switch (elementType) {
      case "wrapper":
        const wrapper = document.createElement("div");
        wrapper.className = "movies__wrapper";
        wrapper.id = "search";
        const search = this.#createElement("searchForm");
        wrapper.appendChild(search);

        return wrapper;
      case "movies":
        const movies = document.createElement("ul");
        movies.className = "movies";
        return movies;
      case "searchForm":
        const searchWrapper = document.createElement("div");
        searchWrapper.className = "inner";
        const searchForm = document.createElement("form");
        searchForm.className = "search-form";

        const searchKeywordInputWrapper = document.createElement("div");
        searchKeywordInputWrapper.className = "input__wrapper";
        searchKeywordInputWrapper.innerHTML = `<label for="search-keyword">검색어</label>
        <input
          type="text"
          id="searchKeyword"
          name="searchKeyword"
          autocomplete="off"
          spellcheck="false"
          aria-required="true"
        />
        <span class="error-message"></span>
        `;

        const yearInputWrapper = document.createElement("div");
        yearInputWrapper.className = "input__wrapper";
        const yearLabel = document.createElement("label");
        yearLabel.setAttribute("for", "year");
        yearLabel.textContent = "년도";
        const yearSelect = document.createElement("select");
        yearSelect.id = "year";
        yearSelect.name = "year";
        const currentYear = new Date().getFullYear();
        const minYear = 1896;
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "모든 년도";
        yearSelect.appendChild(defaultOption);
        const options = Array.from({ length: currentYear - minYear + 1 }).map(
          (_, index) => {
            const option = document.createElement("option");
            option.textContent = currentYear - index;
            option.value = currentYear - index;
            return option;
          }
        );
        yearSelect.append(...options);

        yearInputWrapper.append(yearLabel, yearSelect);

        const submitBtn = document.createElement("button");
        submitBtn.classList.add("btn");
        submitBtn.textContent = "검색";

        searchForm.append(
          searchKeywordInputWrapper,
          yearInputWrapper,
          submitBtn
        );

        searchWrapper.appendChild(searchForm);

        return searchWrapper;
      case "fetchMore":
        const fetchMore = document.createElement("button");
        fetchMore.className = "fetch-more";

        fetchMore.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
        <svg  class="loading-spinner" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <g transform="rotate(0 50 50)">
          <rect x="40.5" y="30.5" rx="9.5" ry="1.5" width="19" height="3" fill="#fe718d">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7874015748031495s" begin="-0.7217847769028871s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(30 50 50)">
          <rect x="40.5" y="30.5" rx="9.5" ry="1.5" width="19" height="3" fill="#f47e60">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7874015748031495s" begin="-0.6561679790026247s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(60 50 50)">
          <rect x="40.5" y="30.5" rx="9.5" ry="1.5" width="19" height="3" fill="#f8b26a">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7874015748031495s" begin="-0.5905511811023622s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(90 50 50)">
          <rect x="40.5" y="30.5" rx="9.5" ry="1.5" width="19" height="3" fill="#abbd81">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7874015748031495s" begin="-0.5249343832020997s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(120 50 50)">
          <rect x="40.5" y="30.5" rx="9.5" ry="1.5" width="19" height="3" fill="#849b87">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7874015748031495s" begin="-0.45931758530183725s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(150 50 50)">
          <rect x="40.5" y="30.5" rx="9.5" ry="1.5" width="19" height="3" fill="#6492ac">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7874015748031495s" begin="-0.39370078740157477s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(180 50 50)">
          <rect x="40.5" y="30.5" rx="9.5" ry="1.5" width="19" height="3" fill="#637cb5">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7874015748031495s" begin="-0.32808398950131235s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(210 50 50)">
          <rect x="40.5" y="30.5" rx="9.5" ry="1.5" width="19" height="3" fill="#6a63b6">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7874015748031495s" begin="-0.26246719160104987s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(240 50 50)">
          <rect x="40.5" y="30.5" rx="9.5" ry="1.5" width="19" height="3" fill="#fe718d">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7874015748031495s" begin="-0.19685039370078738s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(270 50 50)">
          <rect x="40.5" y="30.5" rx="9.5" ry="1.5" width="19" height="3" fill="#f47e60">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7874015748031495s" begin="-0.13123359580052493s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(300 50 50)">
          <rect x="40.5" y="30.5" rx="9.5" ry="1.5" width="19" height="3" fill="#f8b26a">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7874015748031495s" begin="-0.06561679790026247s" repeatCount="indefinite"></animate>
          </rect>
        </g><g transform="rotate(330 50 50)">
          <rect x="40.5" y="30.5" rx="9.5" ry="1.5" width="19" height="3" fill="#abbd81">
            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.7874015748031495s" begin="0s" repeatCount="indefinite"></animate>
          </rect>
        </g>
        <!-- [ldio] generated by https://loading.io/ --></svg>`;

        return fetchMore;
    }
  }

  #registerClickEvent() {
    this.el.addEventListener("click", (e) => {
      const closestElement = e.target.closest(".movie__wrapper");
      if (!closestElement) return;
      this.el.dispatchEvent(ModalOpenEvent(closestElement.dataset.imdbId));
    });
  }

  #render() {
    this.parent.append(this.el, this.fetchMoreEl);
    this.#registerClickEvent();
  }

  unmount() {
    this.moviesEl.replaceChildren();
    this.state.movieList = [];
  }
}
