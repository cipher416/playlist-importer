
  export async function logIn(): Promise<string> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_API_TOKEN_URL ?? ''}`
    , {
      cache: "no-cache",
      method: "POST",
      body : new URLSearchParams({
          "grant_type": "client_credentials",
          client_id : process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? '',
          client_secret : process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET ?? '',
      }),
      headers : {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    const responseJson = await response.json();
    return responseJson.access_token;
  }

  export async function checkUserExists(username: string)  {
    const token = await logIn();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_API_URL}/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        cache: "no-cache"
      });
      if (!response.ok) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  export async function getAllSpotifyPlaylists(token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_API_URL}/me/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: "no-cache"
    });
    const responseJson = await response.json();
    console.log(responseJson[0]);
    return responseJson;
  }

