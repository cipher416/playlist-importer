import { NextRequest } from "next/server";
import { cookies } from "next/headers";



async function GET(req: NextRequest) {
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
          'Authorization': 'Basic ' + basicAuthToken,
        },
        cache: "no-cache"
      });
      const tokenResultBody = await tokenResult.json();
      return new Response();
}


export {GET}