import trailerSrcList from "./data/trailerSrcList.json";
import { Movies, Trailer } from "./components";
import {
  headerScrollEvent,
  createTrailerObserver,
  searchFormValidateEvent,
  searchFormSubmitEvent,
  createFetchMoreObserver,
} from "./events";

try {
  headerScrollEvent(document.querySelector("header"));

  const trailer = new Trailer(trailerSrcList);
  const trailerObserver = createTrailerObserver();
  trailerObserver.observe(trailer.video.el);

  const movies = new Movies();
  const moviesFetchMoreObeserver = createFetchMoreObserver(movies);
  moviesFetchMoreObeserver.observe(movies.fetchMoreEl);

  const searchForm = document.querySelector(".search-form");
  searchFormValidateEvent(searchForm);
  searchFormSubmitEvent(searchForm, movies);

  const footer = document.querySelector("footer");
  footer.innerHTML = `&copy; ${new Date().getFullYear()}.&nbsp;<a href="https://github.com/Ryan-TheLion" target="_blank">Ryan-TheLion</a>&nbsp;all rights reserved. `;
} catch (e) {
  console.log(e);
}
