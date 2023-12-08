import Modal from "@/app/_components/Modal";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ThemedIcon from "@/app/_components/ThemedIcon";
import SpotifyService from "@/app/_services/SpotifyService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function UserSettings() {
  const session = await getServerSession(authOptions);
  const result = await SpotifyService.getInsertedSpotifyUsername();
  
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
              <form action={SpotifyService.insertUsername}>
                <input type="text" placeholder="Username" defaultValue={result} className="input w-full" />
                <button className="btn w-full">
                <Image src={'/spotify-2.svg'} alt="spotify icon" width={30} height={30}/>
                  Login
                </button>
              </form>
            </div>
          </Modal>
          <Modal text={'Log In Tidal Account'} icon={<ThemedIcon src={'/tidal.svg'}/>}>
              <div className="flex flex-col space-y-4">
              <input type="text" placeholder="Username" className="input w-full" />
              <input type="text" placeholder="Password" className="input w-full" />
              <button className="btn w-full">
              <ThemedIcon src={'/tidal.svg'}/>
                Login
              </button>
              </div>
          </Modal>
        </div>
      </div>
  )
}
