import SpotifyClient from "@/app/utils/SpotifyClient";
import { cookies } from "next/headers";

async function POST(req: Request) {
  const playlists = await SpotifyClient.getAllSpotifyPlaylists();
  return Response.json(playlists);
}

export {POST};