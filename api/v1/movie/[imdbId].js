import axios, { HttpStatusCode } from "axios";
import {
  GetMovieDetailRequestDto,
  GetMovieDetailResponseDto,
  OmdbAPIResponse,
} from "../../../src/omdbAPI/dto";

const url = `${process.env.apiUrl}/?apikey=${process.env.apiKey}`;

export default async function handler(req, res) {
  try {
    console.log(req?.method);
    const { data } = await axios.get(url, {
      params: { ...GetMovieDetailRequestDto.from({ ...req.query }) },
    });

    const { status, payload, message } = GetMovieDetailResponseDto.from(data);

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
