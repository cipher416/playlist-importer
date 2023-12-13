import { getServerSession } from "next-auth/next"
import prisma from "@/app/utils/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkUserExists, getAllSpotifyPlaylists } from "@/app/utils/SpotifyClient";
async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({
      message: "You are not logged in."
    }), {
      status: 403,
    })
  } else {
      const result = await prisma.userStreamingServiceAccount.findFirst({
        where: {
          userId : session.user.id,
          streamingService: "SPOTIFY"
        },
        select: {
          accountName: true
        }
      });
      const playlists = await getAllSpotifyPlaylists(result!.accountName);
      return Response.json(playlists);
  }  
}

export {GET};