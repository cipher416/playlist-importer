import { getServerSession } from "next-auth";
import { cookies, headers } from "next/headers"
import test from "node:test";

  export async function getInsertedSpotifyUsername() {
    "use server";
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/account/spotify`, {
      cache: "no-cache",
      headers: headers()
    });
    const responseJson = await response.json();
    return responseJson.accountName;
  }

  export async function getInsertedPlaylists(): Promise<Object[]> {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/playlist/spotify`, {
      method: "POST",
      headers: headers(),
      cache: "no-cache"
    });
    const responseJson = await response.json();
    return responseJson.items;
  }


  export async function getNewSpotifyAccessToken() {
    await fetch(`${process.env.NEXTAUTH_URL}/api/account/spotify/token`, {
      method: "GET",
      cache: "no-cache",
      headers: headers()
    });
  }

  