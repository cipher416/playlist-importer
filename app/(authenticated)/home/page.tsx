'use client';

import Card from "@/app/_components/Card";
import { getInsertedPlaylists } from "@/app/_services/SpotifyService";
import { useEffect, useState } from "react";

export default function UserSettings() {
  const [playlists, setPlaylists] = useState<Object[]>([]);
  
  useEffect(() => {
    getInsertedPlaylists().then(value => {
      setPlaylists(value);
     });
  }, []);
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
  return playlists.map((playlist) => {
    return <>
      <Card image={playlist.images[0].url} text={playlist.name} subtext={playlist.description}/>
    </>
  })
}

