import { cookies } from "next/headers";

export default class SpotifyClient {

  static token: string;

  static async refresh(){
    const basicAuthToken: string = (Buffer.from(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET)).toString('base64')
      const urlFormBody = new URLSearchParams({
        refresh_token : cookies().get('spotify-refresh-token')?.value ?? '',
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? '',
        grant_type: 'refresh_token'
      });
      const tokenResult = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        body: urlFormBody,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic '+ basicAuthToken,
        },
        cache: "no-cache"
      });
      const tokenResultBody = await tokenResult.json();
      this.token = tokenResultBody.access_token;
  }


  static async getAllSpotifyPlaylists() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_API_URL}/me/playlists`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      cache: "no-cache"
    });
    const responseJson = await response.json();
    return responseJson;
  }
}

