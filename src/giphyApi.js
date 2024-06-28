async function giphy() {
  const q = "celebrate";
  const key = "dzSxeJtetjuDCGswNddYiwaMhwJfDKIw";
  const baseURL = "https://api.giphy.com/v1/gifs/translate";

  try {
    const response = await fetch(`${baseURL}?api_key=${key}&s=${q}`);
    if (!response.ok) {
      const errorResponse = await response.json();
      const statusMessage = `Response was not ok. status: ${response.status}`;
      const moreInfo = errorResponse
        ? `\n[Giphy_API]: ${JSON.stringify(errorResponse)}`
        : "";
      const message = `${statusMessage}${moreInfo}`;
      console.error(message);
      throw new Error(message);
    }
    const json = await response.json();
    return json?.data?.images?.original?.url;
  } catch (error) {
    return { error: `${error}` };
  }
}

export { giphy };
