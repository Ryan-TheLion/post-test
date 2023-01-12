import axios, { HttpStatusCode } from "axios";
import {
  GetMoviesRequestDto,
  GetMoviesResponseDto,
  OmdbAPIResponse,
} from "../src/omdbAPI/dto";

const url = `${process.env.apiUrl}/?apikey=${process.env.apiKey}`;

export default async function handler(req, res) {
  try {
    console.log({
      method: req?.method,
      body: req.body,
      query: req.query,
    });
    const { data } = await axios.post(
      url,
      {
        ...req.body,
      },
      { params: { ...GetMoviesRequestDto.from({ ...req.body }) } }
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
