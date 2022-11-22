import Cookies from "js-cookie";
import User from "./models/user";
import nextConfig from "./next.config";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // const cookie = request.cookies.get('activeLogin')
  // console.log(cookie,'middleware')
  // const response = NextResponse.next()
  // if (cookie == undefined) {
  //   console.log(new User())
  //   response.cookies.set('activeLogin', JSON.stringify(new User().toJSON()), {
  //     sameSite: 'lax',
  //     doNotParse: true,
  //     path: '/',
  //   })
  // }
  // console.log(request.cookies)
}
