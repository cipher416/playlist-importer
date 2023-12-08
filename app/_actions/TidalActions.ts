import { getServerSession } from "next-auth";
import { headers } from "next/headers"
import { authOptions } from "../api/auth/[...nextauth]/route";

  export async function getInsertedTidalUsername() {
    "use server";
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/account/tidal`, {
      cache: "no-cache",
      headers: headers()
    });
    const responseJson = await response.json()
    console.log(responseJson);
    return responseJson.accountName;
  }

  export async function insertTidalAccount(formData: FormData) {
    "use server";
    const accountName = formData.get('accountName');
    const password = formData.get('password');
    const session = await getServerSession(authOptions);
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/account/tidal`, {
      cache: "no-cache",
      headers: {
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify({
        accountName: accountName,
        userId: session!.user.id,
        password: password
      })
    });
    const responseBody = await response.json();
    return responseBody;
  }
