import { HttpStatusCode } from "axios";
import { OmdbAPIResponse } from "./response";

export class GetMovieDetailRequestDto {
  static from(params) {
    const { imdbId } = params;

    return { i: imdbId, plot: "full" };
  }
}

export class GetMovieDetailResponseDto {
  static from(res) {
    const {
      Title,
      Released,
      Runtime,
      Actors,
      Plot,
      Poster,
      Metascore,
      Type,
      Response,
      Error,
    } = res;

    if (Response === "True") {
      return OmdbAPIResponse.success(HttpStatusCode.Ok, {
        movie: {
          title: Title,
          released: parseDateString(Released),
          runTime: parseKoreaTime.call(Runtime),
          actors: Actors.split(", "),
          plot: Plot,
          poster: posterResize(Poster, 700),
          metaScore: Number(Metascore),
          type: Type,
        },
      });
    }

    return OmdbAPIResponse.error(
      Error === "Incorrect IMDb ID."
        ? HttpStatusCode.BadRequest
        : HttpStatusCode.InternalServerError,
      Error
    );
  }
}

// 포스터 크기 조절
function posterResize(posterUrl, size) {
  const posterSizeRegExp = /[0-9]+(?=\.jpg)/;

  return posterUrl.replace(posterSizeRegExp, size);
}

// 날짜 형식 변환 (기본: 한국 날짜 형식)
function parseDateString(dateString, locale = "ko-KR") {
  const options = {
    year: "numeric",
    month: "short",
    weekday: "short",
    day: "numeric",
  };

  return new Intl.DateTimeFormat(locale, options).format(
    Date.parse(dateString)
  );
}

// 한국 시간 형식으로 변환
// 매개변수 이름과 변수 이름을 구분짓지 않고 간결하게 하고 싶어서 (mimute)
// 호출할 때 응답받은 Runtime 값(mimute)을 this로 binding
function parseKoreaTime() {
  const timeRegExp = /[0-9]+(?= min)/;
  const [stringOfMimute] = timeRegExp.exec(this);

  const time = Number(stringOfMimute);
  const hour = Math.floor(time / 60);
  const mimute = time - hour * 60;

  return `${hour ? `${hour}시간 ` : ""}${mimute}분`;
}

/*
  rating 점수는 metaScore 데이터를 사용하기로 결정
  - 일반적으로 신뢰할 수 있을만한 rating 소스를 찾기 위해 참고한 reference
  - https://www.freecodecamp.org/news/whose-reviews-should-you-trust-imdb-rotten-tomatoes-metacritic-or-fandango-7d1010c6cf19/
*/

/*
 omdbAPI 원본 JSON 데이터 예시

{
  "Title":"The Avengers",
  "Year":"2012",
  "Rated":"PG-13",
  "Released":"04 May 2012",
  "Runtime":"143 min",
  "Genre":"Action, Adventure, Sci-Fi",
  "Director":"Joss Whedon",
  "Writer":"Joss Whedon, Zak Penn",
  "Actors":"Robert Downey Jr., Chris Evans, Scarlett Johansson",
  "Plot":"Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
  "Language":"English, Russian, Hindi",
  "Country":"United States",
  "Awards":"Nominated for 1 Oscar. 38 wins & 80 nominations total",
  "Poster":"https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  "Ratings":[
    {"Source":"Internet Movie Database","Value":"8.0/10"},
    {"Source":"Rotten Tomatoes","Value":"91%"},
    {"Source":"Metacritic","Value":"69/100"}
  ],
  "Metascore":"69",
  "imdbRating":"8.0",
  "imdbVotes":"1,391,621",
  "imdbID":"tt0848228",
  "Type":"movie",
  "DVD":"25 Sep 2012",
  "BoxOffice":"$623,357,910",
  "Production":"N/A",
  "Website":"N/A",
  "Response":"True"
}


*/
