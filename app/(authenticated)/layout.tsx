import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import Loading from "./loading";
import { Suspense } from "react";
import ThemeChanger from "../_components/ThemeChanger";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/login');
  }

  return (
      <div className="drawer min-h-screen">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar">
            <div className="flex-none">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
            </div> 
            <div className="flex-1 px-2 mx-2">Playlist Importer</div>
            <ThemeChanger/>
            <div className="px-2 mx-2">
              <Image className="mask mask-circle" src={session?.user!.image!} width={50} height={50} priority alt="profile picture"/>
            </div>
          </div>
          <div className="h-full flex flex-col items-center">
            <Suspense fallback={<Loading />}>
              <div className="h-full flex flex-row items-center">
                {children}
              </div>
            </Suspense>
          </div>
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            <li><a href="/home">Home</a></li>
            <li><a href="/user-settings">User Settings</a></li>
          </ul>
        </div>
      </div>
  )
}