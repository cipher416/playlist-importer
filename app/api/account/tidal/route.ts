import { getServerSession } from "next-auth/next"
import prisma from "@/app/utils/db";
import { authOptions } from "../../auth/[...nextauth]/route";
import TidalClient from "@/app/utils/TidalClient";
async function GET() {
  const session = await getServerSession(authOptions);
  console.log(session)
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
          streamingService: "TIDAL"
        },
        select: {
          accountName: true
        }
      });
      return Response.json(result ?? {accountName: ''});
  } 
}

async function POST(request: Request) {
    // const body = await request.json();
    // const checkAccountName = true;
    // if (checkAccountName) {
    //   const tidalStreamingAccount = await prisma.userStreamingServiceAccount.upsert({
    //     where: {
    //       user_id_account : {
    //         userId: body.userId,
    //         streamingService: "TIDAL",
    //       }
    //     }, 
    //     update: {
    //       accountName: body.accountName,
    //       accountPassword: body.password
    //     },
    //     create: {
    //       accountName: body.accountName,
    //       streamingService: "TIDAL",
    //       accountPassword: body.password,
    //       userId: body.userId,
    //     }
    //   })
    //   return Response.json(tidalStreamingAccount);
    // }
    // else {
    //   return new Response(JSON.stringify({
    //     message: "The account doesn't exist."
    //   }), {
    //     status: 400
    //   });
    // }
    const response = TidalClient.logIn('test', 'test');
    return response;
  }

export {POST, GET}