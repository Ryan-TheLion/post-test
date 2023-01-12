export class OmdbAPIResponse {
  static success(status, payload, message = "ok") {
    return { status, payload, message };
  }

  static error(status, message) {
    return { status, message };
  }
}

// {status, payload: { ... }, message}
