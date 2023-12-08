import { getServerSession } from "next-auth/next"
import prisma from "@/app/utils/db";
import SpotifyService from "@/app/utils/SpotifyClient";
import SpotifyClient from "@/app/utils/SpotifyClient";
import { authOptions } from "../../auth/[...nextauth]/route";
async function GET() {
  const session = await getServerSession(authOptions);
  console.log(session)
  if (!session) {
    return new Response('You Are Not Logged In.', {
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
      return Response.json(result ?? {accountName: ''});
  } 
}

async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response('You Are Not Logged In.', {
      status: 403,
    })
  } else {
    const body = await request.json();
    const checkAccountName = await SpotifyClient.checkUserExists(body.accountName);
    if (checkAccountName) {
      const spotifyStreamingAccount = await prisma.userStreamingServiceAccount.upsert({
        where: {
          id: session.user.id,
          streamingService: "SPOTIFY",
        }, 
        update: {
          accountName: body.accountName,
        },
        create: {
          accountName: body.accountName,
          streamingService: "SPOTIFY",
          accountPassword: '',
          userId: session.user.id,
        }
      })
      return Response.json(spotifyStreamingAccount);
    }
    else {
      return new Response('The account doesn\'t exist.', {
        status: 400
      });
    }
  }
}

export {POST, GET}