export const createQueryString = (query) => {
  const qs = Object.keys(query).reduce((accumulated, key, index, arr) => {
    const encodedQuery = query[key]
      ? `${key}=${encodeURIComponent(query[key])}`
      : "";

    const validQueryRule = `${accumulated}${encodedQuery}${
      index < arr.length - 1 ? "&" : ""
    }`;
    const emptyQueryRule =
      accumulated.endsWith("&") && index === arr.length - 1
        ? accumulated.substring(0, accumulated.length - 1)
        : accumulated;

    const queryRule = encodedQuery ? validQueryRule : emptyQueryRule;

    return queryRule;
  }, "");

  return qs;
};
