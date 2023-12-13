import { ElementHandle } from "puppeteer";
import puppeteer from "puppeteer";

export default class TidalClient {



 static async logIn(email: string, password: string) {
  const browser = await puppeteer.launch({
    args: ['--proxy-server=110.34.166.178:4153']
  });
  const page = await browser!.newPage();
  await page.goto(process.env.TIDAL_LOGIN_URL!);
  await page.setViewport({width: 1860, height: 1400});
  await page.waitForXPath('//*[@id="__layout"]/div/div[1]/div/div[2]/div/button');
  const loginBtn = (await page.$x('//*[@id="__layout"]/div/div[1]/div/div[2]/div/button') as ElementHandle[])[0]; 
  await loginBtn.click();
  await Promise.all([
    await page.waitForXPath('//*[@id="email"]'),
    await page.waitForXPath('/html/body/div[1]/div/div/div[2]/div/div[2]/main/div/div/div/div/div[1]/div/form/button/div'),
  ]);
  const emailField = (await page.$x('//*[@id="email"]') as ElementHandle[])[0];
  await emailField.type(email);
  const submitEmailBtn = (await page.$x('/html/body/div[1]/div/div/div[2]/div/div[2]/main/div/div/div/div/div[1]/div/form/button/div') as ElementHandle[])[0];
  await submitEmailBtn.click();
  return await page.content()
 }
}