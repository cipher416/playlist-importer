'use client';
import { getHashParams } from "@/app/utils/Helpers";
import { cookies } from "next/headers";
import { redirect, usePathname} from "next/navigation";
import { useEffect } from "react";

export default function SpotifyCallback() {
  const path = usePathname();
  useEffect(() => {
    const hashParams: any = getHashParams(); 
    localStorage.setItem('spotify-access-token', hashParams.access_token);
    localStorage.setItem('spotify-token-expiration', new Date(new Date().getSeconds() + 3600).toISOString());
    redirect('/home');
  });
  return (
    <>
    </>
  )
}

