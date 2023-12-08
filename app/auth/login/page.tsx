'use client';
import Image from 'next/image';
import {signIn} from 'next-auth/react'
import { useSession } from "next-auth/react"
import {useEffect} from 'react'
export default function Login() {
  return (
    <div className="bg-base-100 shadow-xl items-center rounded-xl">
      <Image src={'/cassette.jpg'} width={100} height={100} className='w-full h-full' alt="Album" priority unoptimized/>
      <div className="card-body flex items-center">
        <button className="btn" onClick={
          ()=>{signIn('discord')}}>Login</button>
      </div>
    </div>
  )
}
