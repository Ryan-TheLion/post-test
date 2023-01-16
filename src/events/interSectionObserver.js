import { Movie } from "../components";
import { movieAPI } from "../omdbAPI";
import { HttpStatusCode } from "../omdbAPI/constants";
export const createTrailerObserver = () => {
  const observer = new IntersectionObserver(trailerObserverCallback, {
    threshold: 0.5,
  });

  return observer;
};

export const createFetchMoreObserver = (moviesRef) => {
  const observer = new IntersectionObserver(fetchMoreObserverCallback, {
    threshold: 0.5,
  });
  observer.moviesRef = moviesRef;

  return observer;
};

function trailerObserverCallback(entries, observer) {
  const trailerEntries = entries.length > 1 ? entries : entries[0];

  if (entries.length > 1) {
    trailerEntries.forEach((trailer) => {
      trailer.isIntersecting ? trailer.target.play() : trailer.target.pause();
    });
    return;
  }

  trailerEntries.isIntersecting
    ? trailerEntries.target.play()
    : trailerEntries.target.pause();
}

async function fetchMoreObserverCallback(entries, observer) {
  const [fetchMoreTrigger] = entries;

  if (fetchMoreTrigger.isIntersecting) {
    const { searchParams, currentPage, maxPage } = observer.moviesRef.state;
    const nextPage =
      currentPage + 1 > 1 && currentPage + 1 <= maxPage ? currentPage + 1 : 0;

    if (nextPage) {
      if (fetchMoreTrigger.target.classList.contains("fetch-more--fetching")) {
        console.log("영화데이터를 로딩중입니다. 잠시만 기다려 주세요...");
        return;
      }
      fetchMoreTrigger.target.classList.add("fetch-more--fetching");
      const { status, payload, message } = await fetchMore({
        ...searchParams,
        page: nextPage,
      });
      fetchMoreTrigger.target.classList.remove("fetch-more--fetching");
      if (status !== HttpStatusCode.Ok && !payload) return;

      observer.moviesRef.state = {
        ...observer.moviesRef.state,
        currentPage: nextPage,
      };

      const movieList = Array.from({ length: payload.movies.length }).map(
        (_) => new Movie(observer.moviesRef.moviesEl)
      );

      movieList.forEach((movie, index) => {
        observer.moviesRef.state.movieList.push(movie);
        movie.renderMovieContent(payload.movies[index]);
      });
    }

    return;
  }
}

async function fetchMore(params) {
  const { data } = await movieAPI.getMovies({ ...params });
  const { status, payload, message } = data;

  return { status, payload, message };
}
