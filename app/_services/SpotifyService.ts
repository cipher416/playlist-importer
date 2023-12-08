import { headers } from "next/headers"
import { json } from "stream/consumers";

export default class SpotifyService {
  static async getInsertedSpotifyUsername() {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/account/spotify`, {
      cache: "no-cache",
      headers: headers()
    });
    const responseJson = await response.json()
    console.log(responseJson);
    return responseJson.accountName;
  }

  static async insertUsername(formData: FormData) {
    const accountName = formData.get('accountName');
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/account/spotify`, {
      cache: "no-cache",
      headers: headers(),
      method: "POST",
      body: JSON.stringify({
        accountName: accountName,
      })
    });
  }
}