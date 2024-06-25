async function giphy(q = "celebrate") {
  const key = "dzSxeJtetjuDCGswNddYiwaMhwJfDKIw";
  const baseURL = "https://api.giphy.com/v1/gifs/translate";

  try {
    const response = await fetch(`${baseURL}?api_key=${key}&s=${q}`);
    const json = await response.json();
    return json.data.images.original.url;
  } catch (error) {
    return { error: `${error}` };
  }
}

export { giphy };
