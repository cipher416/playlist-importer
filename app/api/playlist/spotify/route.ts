import { getServerSession } from "next-auth/next"
import prisma from "@/app/utils/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkUserExists, getAllSpotifyPlaylists } from "@/app/utils/SpotifyClient";
async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  if (!session) {
    return new Response(JSON.stringify({
      message: "You are not logged in."
    }), {
      status: 403,
    })
  } else {
      const playlists = await getAllSpotifyPlaylists(body.spotify_token);
      return Response.json(playlists);
  }  
}

export {POST};