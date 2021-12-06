export const convertQuery2String = (query) => {
  const queryArray = Object.keys(query).map((key) => `${key}=${query[key]}`);
  const queryString = queryArray.join("&");
  return queryString;
};
