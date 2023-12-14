import Modal from "@/app/_components/Modal";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ThemedIcon from "@/app/_components/ThemedIcon";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getInsertedSpotifyUsername } from "@/app/_actions/SpotifyActions";
import AccountFormContent from "@/app/_components/AccountFormContent";
import SubmitButton from "@/app/_components/SubmitButton";
import { getInsertedTidalUsername, insertTidalAccount } from "@/app/_actions/TidalActions";

const searchParams = new URLSearchParams({
  "response_type": encodeURIComponent("code"),
  client_id : encodeURIComponent(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? ''),
  scope: encodeURIComponent("playlist-read-private"),
  redirect_uri: 'http://localhost:3000/api/account/spotify'
}).toString();

export default async function UserSettings() {
  const session = await getServerSession(authOptions);
  // const spotifyAccountName = await getInsertedSpotifyUsername();
  const tidalAccountName = await getInsertedTidalUsername();
  return (
      <div className="px-4 mx-2 flex flex-col items-center justify-self-center">
        <div className="flex flex-col justify-items-center items-center justify-evenly space-y-9">
          <Image className="mask mask-circle" src={
            session ? session.user?.image! : '/vercel.svg'
          } width={120} height={120} priority alt="profile picture"/>
          <h1 className="text-3xl px-18 font-bold">
            {session ? session.user?.name! : ''}
          </h1>
        </div>
        <div className="py-6 flex flex-col space-y-3">
          <Modal text={'Log In Spotify Account'} icon={<Image src={'/spotify-2.svg'} alt="spotify icon" width={30} height={30}/>}>
            <div className="flex flex-col space-y-4">
                <a href={`https://accounts.spotify.com/authorize?${searchParams}`}>
                <SubmitButton className="btn w-full">
                  <Image src={'/spotify-2.svg'} alt="streaming service icon" width={30} height={30}/>
                      Login
                </SubmitButton> 
                </a>
            </div>
          </Modal>
          <Modal text={'Log In Tidal Account'} icon={<ThemedIcon src={'/tidal.svg'}/>}>
                <AccountFormContent defaultValue={tidalAccountName} action={insertTidalAccount}>
                <input type="password" placeholder="Password" className="input w-full" name="password" />
                <SubmitButton className="btn w-full">
                <ThemedIcon src={'/tidal.svg'}/>
                      Login
                </SubmitButton> 
                </AccountFormContent>
          </Modal>
        </div>
      </div>
  )
}
