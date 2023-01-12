import fetch from "node-fetch";
import {
  GetMoviesRequestDto,
  GetMoviesResponseDto,
  OmdbAPIResponse,
} from "../src/omdbAPI/dto";

const url = `${process.env.apiUrl}/?apikey=${process.env.apiKey}`;
const HttpStatusCode = {
  InternalServerError: 500,
};

export default async function handler(req, res) {
  try {
    console.log({
      method: req?.method,
      body: req.body,
      query: req.query,
    });

    const { s, y, page } = GetMoviesRequestDto.from(req.body);

    const data = await fetch(`${url}&s=${s}&y=${y}&page=${page}`).then((res) =>
      res.json()
    );

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
