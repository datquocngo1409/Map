function updateOptions(options) {
  const update = {...options};
  if (this.localStorage.jwt) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${this.localStorage.jwt}`,
    };
  }
  return update;
}

export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}
