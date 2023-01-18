# 배포 사이트 정보

![myNetFlix](https://imagedelivery.net/gDNaP20ZP5HjgdRwMYWErw/dcc782c6-42fb-4e85-8331-cacd6d4b1900/public)

- [데모 사이트](https://post-test-wine.vercel.app/)

- 사용 기술
  - `html`
  - `css`
  - `scss`
  - `javascript`
  - `nodeJS`
  - `parcel`
  - `vercel serverless function`
  - `vercel`

## 추가 구현

- 검색어 실시간 유효성 검사.

  - 실시간 결과 반영해서 화면에 출력

- 반응형 UI 제공

- 스켈레톤, 로딩스피너를 통한 로딩 화면 제공

- 사용자가 사이트를 이용함에 있어 심심하지 않도록 영화 예고편 제공

  - 트레일러 영상의 일정부분을 넘어가면 일시 정지, 다시 올라오면 이어서 재생
  - 소리 뮤트 기능 제공(기본\_뮤트된 상태)
  - 정적json 파일로 예고편 영상 데이터를 앱에 제공
  - 예고편 영상 출처: cgv

- 해시를 이용한 링크 이벤트로 nav 구현

  - 페이지가 아닌 해당 페이지에서 해당하는 요소로 자동 스크롤

- severless

  - 사용자가 네트워크 탭을 통한 요청url확인으로 api노출을 피하기 위해서 server 사용
  - omdbapi 응답결과를 변형해서 사용해서 사용하기 위해 server 사용

- 기술 챌린지
  - 리액트와 비슷한 컴포넌트로 CSR을 하기 위한 클래스 구현
    - 공통 component 클래스를 만들어서 사용하지 않기 때문에, 현재 프로젝트 외 재사용 불가
    - og(opengraph), header, footer는 SSR이 될 수 있도록 index.html에 작성
    - 한번에 render할 경우 로딩을 보여주지 못하고, 일정시간이후 만들어진 결과가 한번에 출력됨
      - 이를 해결하기 위해 render를 세부적으로 나누어서 구현(초기 템플릿 render, 실제 render)
  - :empty 가상 선택자를 활용하여 로딩 css 적용
  - 검색어 실시간 유효성 검사 최적화를 위해 debounce 적용
  - 이미지 로더를 구현하여 이미지 로드에 대한 로직 구현
  - 모달창 열린 경우 스크롤 불가
    - 가능한 css를 활용하는 것이 최적화에 도움이된다고 생각하여, css를 통한 구현을 하게 됨
  - event driven devlopment
    - event에 기반한 핸들링을 위해 커스텀 이벤트를 작성하고, dispatchEvent를 활용하여 구현
  - 유효성 검사
    - 유효성 검사를 위한 로직을 개별적으로 작성하고, 그 규칙에 기반한 입력 유효성 검사
    - 영어와 허용한 특수문자외 입력이 되지 않도록 하기 위한 정규표현식을 만들게되서 좋은 경험이었다고 생각됨
  - serverless 배포
    - 배포 과정이 원활하지는 않았으나, 이를 통해 vercel serverless 플랫폼을 이용한 배포 방법을 알게 됨
    - 이후 동일 플랫폼으로 배포시 시간을 단축해줄수 있게 되서 좋은 경험이었다고 생각됨
  - 최대한 폴더 구조를 세분화 해서 이후에 유지보수의 시간을 줄일 수 있도록 노력함

여러가지를 개인적으로 생각해보고 기술적으로 구현하여 검증하는 과정이 있어서 좋은 경험이었다고 생각함

# 🎬 영화 검색

- 과제 기한:
  - 과제 수행 기간: 2023년 01월 02일(월) ~ 2023년 01월 13일(금)
  - 서로 리뷰 기간: 2023년 01월 16일(월) ~ 2023년 01월 20일(금)
- 내용:
  - 주어진 API를 활용해 '[완성 예시](https://stupefied-hodgkin-d9d350.netlify.app/)' 처럼 자유롭게 영화 검색 기능을 구현해보세요!

## 요구사항

필수 요구사항은 꼭 달성해야 하는 목표로, 수정/삭제는 불가하고 추가는 가능합니다.  
선택 요구사항은 단순 예시로, 자유롭게 추가/수정/삭제해서 구현해보세요.  
각 요구사항은 달성 후 마크다운에서 `- [x]`로 표시하세요.

### ❗ 필수

- [x] 영화 제목으로 검색 가능하고 검색된 결과의 영화 목록이 출력돼야 합니다.
- [x] jQuery, React, Vue 등 JS 라이브러리와 프레임워크는 사용하지 않아야 합니다.
- [x] 스타일(CSS) 라이브러리나 프레임워크 사용은 자유입니다.

### ❔ 선택

- [ ] 한 번의 검색으로 영화 목록이 20개 이상 검색되도록 만들어보세요.
- [x] 영화 개봉연도로 검색할 수 있도록 만들어보세요.
- [x] 영화 목록을 검색하는 동안 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 무한 스크롤 기능을 추가해서 추가 영화 목록을 볼 수 있도록 만들어보세요.
- [x] 영화 포스터가 없을 경우 대체 이미지를 출력하도록 만들어보세요.
- [x] 단일 영화의 상세정보(제목, 개봉연도, 평점, 장르, 감독, 배우, 줄거리, 포스터 등)를 볼 수 있도록 만들어보세요.
- [x] 영화 상세정보가 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [ ] 영화 상세정보 포스터를 고해상도로 출력해보세요.(실시간 이미지 리사이징)
- [x] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [x] 영화와 관련된 기타 기능도 고려해보세요.

## 과제 수행 방법

1. 현재 저장소를 로컬에 클론(Clone)합니다.
1. 자신의 본명(E.g, `ParkYoungWoong`)으로 브랜치를 생성합니다.(본명을 꼭 파스칼케이스로 표시하세요!)
1. 자신의 본명 브랜치에서 과제를 수행합니다.
1. 과제 수행이 끝나면, 자신의 본명 브랜치를 원격 저장소에 푸시(Push)합니다.(`main` 브랜치에 푸시하지 않도록 꼭 주의하세요!)
1. 저장소에서 `main` 브랜치를 대상으로 Pull Request 생성하면, 과제 제출이 완료됩니다!(E.g, `main` <== `ParkYoungWoong`)

- Pull Request에서 보이는 설명을 다른 사람들이 이해하기 쉽도록 꼼꼼하게 작성하세요!
- 과제 수행 및 제출 과정에서 문제가 발생한 경우, 바로 강사에서 얘기해주세요!
- 과제 제출 후 절대 병합(Merge)하지 않도록 주의하세요!

## API 기본 사용법

```curl
curl https://omdbapi.com/?apikey={apikey}
  \ -X 'GET'
```

## 영화 목록 검색

영화 목록은 한 번에 최대 10개까지 검색할 수 있습니다.

| 파라미터 | 설명                              | 기본값 |
| -------- | --------------------------------- | ------ |
| `s`      | 검색할 영화 제목(필수!)           |
| `y`      | 검색할 개봉연도, 빈값은 전체 검색 |
| `page`   | 검색할 페이지 번호                | `1`    |

요청 코드 예시:

```js
async function getMovies(title, year = "", page = 1) {
  const s = `&s=${title}`;
  const y = `&y=${year}`;
  const p = `&page=${page}`;
  const res = await fetch(`https://omdbapi.com/?apikey={apikey}c${s}${y}${p}`);
  const json = await res.json();
  if (json.Response === "True") {
    const { Search: movies, totalResults } = json;
    return {
      movies,
      totalResults,
    };
  }
  return json.Error;
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  Search: Movie[]; // 검색된 영화 목록, 최대 10개
  totalResults: string; // 검색된 영화 개수
  Response: "True" | "False"; // 요청 성공 여부
}
interface Movie {
  Title: string; // 영화 제목
  Year: string; // 영화 개봉연도
  imdbID: string; // 영화 고유 ID
  Type: string; // 영화 타입
  Poster: string; // 영화 포스터 이미지 URL
}
```

```json
{
  "Search": [
    {
      "Title": "Frozen",
      "Year": "2013",
      "imdbID": "tt2294629",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg"
    },
    {
      "Title": "Frozen II",
      "Year": "2019",
      "imdbID": "tt4520988",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg"
    }
  ],
  "totalResults": "338",
  "Response": "True"
}
```

## 영화 상제정보 검색

단일 영화의 상제정보를 검색합니다.

| 파라미터 | 설명                  | 기본값  |
| -------- | --------------------- | ------- |
| `i`      | 검색할 영화 ID(필수!) |
| `plot`   | 줄거리 길이           | `short` |

요청 코드 예시:

```js
async function getMovie(id) {
  const res = await fetch(
    `https://omdbapi.com/?apikey={apikey}&i=${id}&plot=full`
  );
  const json = await res.json();
  if (json.Response === "True") {
    return json;
  }
  return json.Error;
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  Title: string; // 영화 제목
  Year: string; // 영화 개봉연도
  Rated: string; // 영화 등급
  Released: string; // 영화 개봉일
  Runtime: string; // 영화 상영시간
  Genre: string; // 영화 장르
  Director: string; // 영화 감독
  Writer: string; // 영화 작가
  Actors: string; // 영화 출연진
  Plot: string; // 영화 줄거리
  Language: string; // 영화 언어
  Country: string; // 영화 제작 국가
  Awards: string; // 영화 수상 내역
  Poster: string; // 영화 포스터 이미지 URL
  Ratings: Rating[]; // 영화 평점 정보
  Metascore: string; // 영화 메타스코어
  imdbRating: string; // 영화 IMDB 평점
  imdbVotes: string; // 영화 IMDB 투표 수
  imdbID: string; // 영화 고유 ID
  Type: string; // 영화 타입
  DVD: string; // 영화 DVD 출시일
  BoxOffice: string; // 영화 박스오피스
  Production: string; // 영화 제작사
  Website: string; // 영화 공식 웹사이트
  Response: string; // 요청 성공 여부
}
interface Rating {
  // 영화 평점 정보
  Source: string; // 평점 제공 사이트
  Value: string; // 평점
}
```

```json
{
  "Title": "Frozen",
  "Year": "2013",
  "Rated": "PG",
  "Released": "27 Nov 2013",
  "Runtime": "102 min",
  "Genre": "Animation, Adventure, Comedy",
  "Director": "Chris Buck, Jennifer Lee",
  "Writer": "Jennifer Lee, Hans Christian Andersen, Chris Buck",
  "Actors": "Kristen Bell, Idina Menzel, Jonathan Groff",
  "Plot": "When the newly crowned Queen Elsa accidentally uses her power to turn things into ice to curse her home in infinite winter, her sister Anna teams up with a mountain man, his playful reindeer, and a snowman to change the weather co...",
  "Language": "English, Norwegian",
  "Country": "United States",
  "Awards": "Won 2 Oscars. 82 wins & 60 nominations total",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg",
  "Ratings": [
    { "Source": "Internet Movie Database", "Value": "7.4/10" },
    { "Source": "Rotten Tomatoes", "Value": "90%" },
    { "Source": "Metacritic", "Value": "75/100" }
  ],
  "Metascore": "75",
  "imdbRating": "7.4",
  "imdbVotes": "620,489",
  "imdbID": "tt2294629",
  "Type": "movie",
  "DVD": "18 Mar 2014",
  "BoxOffice": "$400,953,009",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
}
```
