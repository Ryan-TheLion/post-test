import fetch from "node-fetch";
import {
  GetMovieDetailRequestDto,
  GetMovieDetailResponseDto,
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

    const { i, plot } = GetMovieDetailRequestDto.from(req.body);
    const data = await fetch(`${url}&i=${i}&plot=${plot}`).then((res) =>
      res.json()
    );

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
