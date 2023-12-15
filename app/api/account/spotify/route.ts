import { getServerSession } from "next-auth/next"
import prisma from "@/app/utils/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;
  const code = queryParams.get('code') ?? '';
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({
      message: "You are not logged in."
    }), {
      status: 403,
    })
  } else {
      const basicAuthToken: string = (Buffer.from(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET)).toString('base64')
      const urlFormBody = new URLSearchParams({
        code: code,
        redirect_uri: 'http://localhost:3000/api/account/spotify',
        grant_type: 'authorization_code'
      });
      const tokenResult = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        body: urlFormBody,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + basicAuthToken,
        }
      });
      const tokenResultBody = await tokenResult.json();
      cookies().set('spotify-access-token', tokenResultBody.access_token);
      cookies().set('spotify-refresh-token', tokenResultBody.refresh_token);
      redirect('/home');
  } 
}
export {GET}