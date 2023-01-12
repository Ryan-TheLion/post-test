import axios, { HttpStatusCode } from "axios";
import { OmdbAPIResponse } from "./dto";
import { OmdbAPIVersioningTool } from "./versioningTool";

export class OmdbAPI {
  #versionTool;
  #fetcher;

  constructor(version) {
    this.#versionTool = new OmdbAPIVersioningTool();
    this.version = this.#versionTool.setVersion(version);
    this.#fetcher = axios.create({
      baseURL: `/api/${this.version}`,
    });
  }

  getPath(pathName) {
    const paths = {
      movies: "/movies",
      movie: "/movie",
    };

    return paths[pathName] ?? "";
  }

  async getMovies(query) {
    // query: { searchKeyword, year, page }
    try {
      const moviesPath = this.getPath("movies");
      console.log(this.#fetcher.getUri());
      const res = await this.#fetcher.post(moviesPath, {
        ...query,
      });

      return res;
    } catch (e) {
      return this.handleError(e);
    }
  }

  async getMovieDetail(imdbId) {
    try {
      const movieDetailPath = this.getPath("movie");
      console.log(this.#fetcher.getUri());
      const res = await this.#fetcher.post(`${movieDetailPath}/${imdbId}`, {
        imdbId,
      });

      return res;
    } catch (e) {
      return this.handleError(e);
    }
  }

  handleError(e) {
    if (e.name === "AxiosError") {
      return { data: e.response.data };
    }

    return {
      data: OmdbAPIResponse.error(
        HttpStatusCode.InternalServerError,
        e.message
      ),
    };
  }
}
