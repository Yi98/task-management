export function initializeFetcher() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  return fetcher;
}
