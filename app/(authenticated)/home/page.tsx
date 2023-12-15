
import { getInsertedPlaylists } from "@/app/_actions/SpotifyActions";
import Card from "@/app/_components/Card";


export default async function UserSettings() {
  const playlists = await getInsertedPlaylists();
  return (
    <div className="flex flex-col w-full space-y-3 m-12">
      <PlaylistDisplay playlists={playlists ?? []}/>
    </div>
  )
}

type PlaylistDisplayProps = {
  playlists: any[]
}

function PlaylistDisplay({playlists}: PlaylistDisplayProps) {
  console.log(playlists);
  return playlists.map((playlist) => {
    return <Card key={playlist.name} image={playlist.images[0].url} text={playlist.name} subtext={playlist.description}/>
  })
}

