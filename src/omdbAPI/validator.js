export class OmdbAPIValidator {
  #version;

  constructor(version) {
    this.#version = version || "v1";
  }

  validateSearchParam(param, value) {
    const v = this.#version;

    const regex = {
      searchKeyword: {
        isAlphaOrNumOrSpaceOrAllowdSpecial: new RegExp(
          `^[a-zA-Z0-9:\\- ]{${value.length}}$`
        ),
      },
    };

    switch (param) {
      case "searchKeyword":
        if (!value) {
          return { errorMessage: "검색어는 필수 입력 항목입니다." };
        }
        if (value.length <= 2) {
          return { errorMessage: "검색어는 최소 3자 이상이어야 합니다." };
        }
        if (
          !regex.searchKeyword.isAlphaOrNumOrSpaceOrAllowdSpecial.test(value)
        ) {
          return {
            errorMessage:
              "검색어는 영어, 숫자, 공백, 또는 특수문자 -:의 조합만 가능합니다.",
          };
        }

        return true;
      case "year":
        return typeof value === paramTypes[v].search.y && y > 1900;
      case "page":
        return (
          typeof value === paramTypes[v].search.page &&
          value >= 1 &&
          value <= 100
        );
      default:
        return;
    }
  }
  validateMovieDetailParam(param, value) {
    const v = this.#version;

    const regex = {
      i: /tt[0-9]+/,
    };

    switch (param) {
      case "i":
        return (
          typeof value === paramTypes[v].movieDetail.i && regex.i.test(value)
        );
      case "t":
        return typeof value === paramTypes[v].movieDetail.t;
      default:
        return;
    }
  }
}

const paramTypes = {
  v1: {
    search: {
      s: "string",
      y: "number",
      page: "number",
    },
    movieDetail: {
      i: "string",
      t: "string",
    },
  },
};

export const omdbAPIValidator = new OmdbAPIValidator();
