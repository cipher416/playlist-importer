export async function getInsertedPlaylists(): Promise<Object[]> {
  const response = await fetch(`/api/playlist/spotify`, {
    method: "POST",
    body: JSON.stringify({
      "spotify_token" : localStorage.getItem("spotify-access-token")
    })
  });
  const responseJson = await response.json();
  console.log(responseJson);
  return responseJson.items;
}