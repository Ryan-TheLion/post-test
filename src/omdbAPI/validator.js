export class OmdbAPIValidator {
  #version;

  constructor(version) {
    this.#version = version || "v1";
  }

  validateSearchParam(param, value) {
    const v = this.#version;

    switch (param) {
      case "s":
        return typeof value === paramTypes[v].search.s;
      case "y":
        return typeof value === paramTypes[v].search.y && y > 0;
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
