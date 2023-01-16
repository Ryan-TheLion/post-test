import fetch from "node-fetch";
import {
  GetMoviesRequestDto,
  GetMoviesResponseDto,
  OmdbAPIResponse,
} from "../src/omdbAPI/dto";
import { HttpStatusCode } from "../src/omdbAPI/constants";
import { createQueryString } from "../src/util/createQueryString";

const url = `${process.env.apiUrl}/?apikey=${process.env.apiKey}`;

export default async function handler(req, res) {
  try {
    const qs = createQueryString({ ...GetMoviesRequestDto.from(req.body) });

    const data = await fetch(`${url}&${qs}`).then((res) => res.json());

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
