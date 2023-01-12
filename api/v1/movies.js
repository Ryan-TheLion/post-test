import axios, { HttpStatusCode } from "axios";
import {
  GetMoviesRequestDto,
  GetMoviesResponseDto,
} from "../../src/omdbAPI/dto/getMovies.dto";
import { OmdbAPIResponse } from "../../src/omdbAPI/dto/response";

const url = `${process.env.apiUrl}/?apikey=${process.env.apiKey}`;

export default async function handler(req, res) {
  try {
    console.log(req?.method);
    const { data } = await axios.get(url, {
      params: { ...GetMoviesRequestDto.from({ ...req.query }) },
    });

    const { status, payload, message } = GetMoviesResponseDto.from(data);

    return res
      .status(status)
      .json({ status, ...(payload && { payload }), message });
  } catch (e) {
    return res
      .status(HttpStatusCode.InternalServerError)
      .json(
        OmdbAPIResponse.error(HttpStatusCode.InternalServerError, e.message)
      );
  }
}
