import { getServerSession } from "next-auth"
import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { redirect } from "next/navigation"
import { rule } from "postcss"
import { authOptions } from "./app/api/auth/[...nextauth]/route"
import { getNewSpotifyAccessToken } from "./app/_actions/SpotifyActions"
import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import SpotifyClient from "./app/utils/SpotifyClient"

export default withAuth({
    callbacks: {
      authorized: async ({ token, req }) => {
        if (!!token) {
          if(req.nextUrl.pathname.startsWith('/auth/login')) {
            redirect('/home');
          }
          return true;
        } else if(!req.nextUrl.pathname.startsWith('/api') || req.nextUrl.pathname.startsWith('/') || req.nextUrl.pathname.startsWith('/auth/login')) {
          return true
        }
        return false;
      }
    },
    pages: {
      signIn: 'auth/login'
    },
  }
)