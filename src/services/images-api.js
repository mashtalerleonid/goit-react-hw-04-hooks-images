export function fetchImages(page, query) {
  const baseUrl = "pixabay.com/api/";
  const API_KEY = "22509463-498a875afefc35fc9228c8f09";
  return fetch(
    `https://${baseUrl}?key=${API_KEY}&q=${query}&page=${page}&per_page=12&image_type=photo`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`No results`));
  });
}
