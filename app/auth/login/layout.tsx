import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
export default async function LoginLayout({
  children
}: {children: React.ReactNode}) {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect('/home');
  }
  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url("/login-background.svg")'}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}