import { NextRequest } from "next/server";
import { cookies } from "next/headers";



async function GET(req: NextRequest) {
      // console.log(cookies().getAll())
      const basicAuthToken: string = (Buffer.from(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET)).toString('base64')
      const urlFormBody = new URLSearchParams({
        refresh_token : cookies().get('spotify-refresh-token')?.value ?? '',
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? '',
        grant_type: 'refresh_token'
      });
      console.log(urlFormBody);
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
      console.log(tokenResultBody);
      cookies().set('spotify-access-token', tokenResultBody.access_token);
      cookies().set('spotify-refresh-token', tokenResultBody.refresh_token);
      return Response.json({
        message: 'success'
      });
}


export {GET}