import { Movie } from "../components";
import { movieAPI } from "../omdbAPI";
import { HttpStatusCode } from "../omdbAPI/constants";
import { debounce } from "../util/debounce";

export const searchFormValidateEvent = (searchForm) => {
  const submitBtn = Array.from(searchForm.elements).find(
    (el) => el.tagName === "BUTTON"
  );
  searchForm.elements.searchKeyword.addEventListener(
    "input",
    debounce((e) => {
      const validateKeyword = movieAPI.validator.validateSearchParam(
        "searchKeyword",
        e.target.value
      );
      const isInValid = validateKeyword !== true;
      e.target.classList.toggle("error", isInValid);
      if (isInValid) {
        submitBtn.disabled = true;
        e.target.nextElementSibling.dataset.error =
          validateKeyword.errorMessage;
        return;
      }
      delete e.target.nextElementSibling.dataset.error;
      submitBtn.disabled = false;
    }, 300)
  );
};

export const searchFormSubmitEvent = (searchForm, moviesRef) => {
  searchForm.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();
      const { searchKeyword, year } = e.target.elements;
      moviesRef.el.scrollIntoView();

      searchKeyword.dispatchEvent(new Event("input"));

      if (!searchKeyword.value) return;

      const params = {
        searchKeyword: searchKeyword.value.trim(),
        year: Number(year.value),
      };

      // get movies
      moviesRef.moviesEl.classList.remove("result");
      moviesRef.moviesEl.classList.remove("error");
      delete moviesRef.moviesEl.dataset.error;
      moviesStateClear(moviesRef);
      moviesRef.state.searchParams = {
        ...params,
      };
      moviesRef.moviesEl.classList.add("loading");

      const { data } = await movieAPI.getMovies({ ...params });
      const { status, payload, message } = data;

      moviesRef.moviesEl.classList.remove("loading");
      if (!payload && status === HttpStatusCode.NotFound) {
        // 데이터 없음
        moviesRef.moviesEl.classList.add("movies--no-result");
        return;
      }
      if (!payload && status === HttpStatusCode.InternalServerError) {
        // 에러
        moviesRef.moviesEl.classList.add("movies--error");
        moviesRef.moviesEl.dataset.error = message;
        return;
      }

      moviesRef.state.totalResults = payload.totalResults;
      moviesRef.state.maxPage = Math.ceil(
        moviesRef.state.totalResults / moviesRef.state.take
      );
      moviesRef.state.currentPage += 1;

      const movieList = Array.from({ length: payload.movies.length }).map(
        (_) => new Movie(moviesRef.moviesEl)
      );

      movieList.forEach((movie, index) => {
        moviesRef.state.movieList.push(movie);
        movie.renderMovieContent(payload.movies[index]);
      });
    } catch (e) {
      console.log(e);
    }
  });
};

function moviesStateClear(moviesRef) {
  moviesRef.state.movieList.length > 0 && moviesRef.unmount();

  const initState = {
    movieList: [],
    maxPage: 0,
    currentPage: 0,
    totalResults: 0,
    searchParams: {
      searchKeyword: "",
      year: 0,
    },
  };
  moviesRef.state = { ...moviesRef.state, ...initState };
}
