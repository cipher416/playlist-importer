import { getServerSession } from "next-auth";
import { headers } from "next/headers"
import { authOptions } from "../api/auth/[...nextauth]/route";

  export async function getInsertedSpotifyUsername() {
    "use server";
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/account/spotify`, {
      cache: "no-cache",
      headers: headers()
    });
    const responseJson = await response.json()
    console.log(responseJson);
    return responseJson.accountName;
  }

  export async function getInsertedPlaylists(): Promise<Object[]> {
    "use server";
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/playlist/spotify`, {
      headers: headers()
    });
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  }

  export async function insertSpotifyAccount(prevState:any,formData: FormData) {
    "use server";
    const accountName = formData.get('accountName');
    const session = await getServerSession(authOptions);
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/account/spotify`, {
      cache: "no-cache",
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({
        accountName: accountName,
        userId: session!.user.id
      })
    });
    if (response.ok) {
      return 'Account Inserted!'
    } 
    return 'An error has occured.' 
  }
