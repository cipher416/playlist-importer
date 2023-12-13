import { getServerSession } from "next-auth/next"
import prisma from "@/app/utils/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkUserExists } from "@/app/utils/SpotifyClient";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


// async function GET(req: NextRequest) {
//   const queryParams = req.url;
//   console.log(req.nextUrl);
//   console.log();
//   return
//   const token = queryParams.get('access_token') ?? '';
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return new Response(JSON.stringify({
//       message: "You are not logged in."
//     }), {
//       status: 403,
//     })
//   } else {
//       cookies().set('spotify-access-token', token);
//       cookies().set('spotify-token-creation-time', (new Date()).toISOString());
//       redirect('/home');
//   } 
// }

async function POST(request: Request) {
    const body = await request.json();
    const checkAccountName = await checkUserExists(body.accountName);
    console.log(checkAccountName);
    if (checkAccountName) {
      const spotifyStreamingAccount = await prisma.userStreamingServiceAccount.upsert({
        where: {
          user_id_account : {
            userId: body.userId,
            streamingService: "SPOTIFY",
          }
        }, 
        update: {
          accountName: body.accountName,
        },
        create: {
          accountName: body.accountName,
          streamingService: "SPOTIFY",
          accountPassword: '',
          userId: body.userId,
        }
      })
      return Response.json(spotifyStreamingAccount);
    }
    else {
      return new Response(JSON.stringify({
        message: "The account doesn't exist."
      }), {
        status: 400
      });
    }
  }

export {POST}