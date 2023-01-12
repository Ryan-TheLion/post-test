import axios from "axios";
import { OmdbAPI } from "./omdbAPI/omdb";

const api = new OmdbAPI();

const searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", async (e) => {
  try {
    const searchKeyword = document.querySelector("input").value;
    const { data } = await api.getMovies({ searchKeyword });
    console.log({ data });
    const { status, payload, message } = data;

    if (payload) {
      setTimeout(async () => {
        const { data: movieData } = await api.getMovieDetail(
          payload.movies[0].imdbId
        );
        console.log({ movieData });
      }, 1500);
    }
  } catch (e) {
    console.log(e);
  }
});
// const trailerSrcList = [
//   new URL("./assets/86157_211325_1200_128_960_540.mp4", import.meta.url),
//   new URL("./assets/86728_210817_1200_128_960_540.mp4", import.meta.url),
//   new URL("./assets/86720_211023_1200_128_960_540.mp4", import.meta.url),
// ];
const trailerSrcList = [
  "http://h.vod.cgv.co.kr/vodCGVa/86157/86157_211325_1200_128_960_540.mp4",
  "http://h.vod.cgv.co.kr/vodCGVa/86728/86728_210817_1200_128_960_540.mp4",
  "http://h.vod.cgv.co.kr/vodCGVa/86720/86720_211023_1200_128_960_540.mp4",
];

const trailerControl = document.querySelector(
  ".trailer__wrapper .control__wrapper"
);
trailerControl.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  if (e.target.classList.contains("toggleMuted")) {
    e.target.classList.toggle("active");
    videoElement.muted = !videoElement.muted;
  }
});
const videoElement = document.querySelector("video");
videoElement.volume = 0.5;

let curIndex = 0;
videoElement.src = trailerSrcList[0];
videoElement.addEventListener("ended", (e) => {
  curIndex += 1;
  setTimeout(() => {
    videoElement.src = trailerSrcList[curIndex % trailerSrcList.length];
  }, 1500);
});

console.log("hello");
