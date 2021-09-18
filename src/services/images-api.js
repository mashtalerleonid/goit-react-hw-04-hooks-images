export async function fetchImages(page, query) {
  const baseUrl = "pixabay.com/api/";
  const API_KEY = "22509463-498a875afefc35fc9228c8f09";
  const response = await fetch(
    `https://${baseUrl}?key=${API_KEY}&q=${query}&page=${page}&per_page=12&image_type=photo`
  );
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error(`No results`));
}
