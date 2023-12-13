import { getInsertedPlaylists } from "@/app/_actions/SpotifyActions";
import Card from "@/app/_components/Card";

export default async function UserSettings() {

  const playlists = await getInsertedPlaylists();
  const searchParams = new URLSearchParams({
    "response_type": encodeURIComponent("token"),
    client_id : encodeURIComponent(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? ''),
    scope: encodeURIComponent("playlist-read-private"),
    redirect_uri: 'http://localhost:3000/spotify-callback'
  }).toString();
  return (
    <div className="flex flex-col w-full space-y-3 m-12">
          <a href={`https://accounts.spotify.com/authorize?${searchParams}`} >
            test
          </a>
    </div>
  )
}

type PlaylistDisplayProps = {
  playlists: Object[]
}

function PlaylistDisplay({playlists}: PlaylistDisplayProps) {
  return playlists.map((playlist) => {
    return <>
      {/* <Card image={playlist.href} /> */}
    </>
  })
}

