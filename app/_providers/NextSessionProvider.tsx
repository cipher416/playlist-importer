"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type sessionProps = {
  children: React.ReactNode;
  session: Session | null;
};
function NextSessionProvider({ children, session }: sessionProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default NextSessionProvider;