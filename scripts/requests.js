const token = "" //Use your own personal token

//Getting artist ID
const getArtistId = async(userinput) =>{
    const baseURL = "https://api.spotify.com/v1/search";
    const query = `?q=${userinput}&type=artist`;
    const finalURL = baseURL + query;

    const response = await fetch(finalURL, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

    const data = await response.json();
    return data.artists.items[0].id; //returns only artist id
}

//Searching and returning recomended artists
const getRecomended = async(id) => {
    const finalURL = `https://api.spotify.com/v1/artists/${id}/related-artists`;

    const response = await fetch(finalURL, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

    const data = await response.json();
    return data;
}