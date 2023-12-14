import { getServerSession } from "next-auth";
import { cookies, headers } from "next/headers"
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

  export async function getInsertedPlaylists(): Promise<Object[]> {
    await getNewSpotifyAccessToken();
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/playlist/spotify`, {
      method: "POST",
      headers: headers(),
      cache: "no-cache"
    });
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson.items;
  }


  async function getNewSpotifyAccessToken() {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/account/spotify/token`, {
      method: "GET",
      cache: "no-cache",
      headers: headers()
    });
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  }