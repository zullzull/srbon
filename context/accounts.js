import { createContext, useState } from "react";
import cache from "../plugins/cache";
import nextConfig from "../next.config";
import User from "../models/user";
import Cookies from "js-cookie";

export const AccountContext = createContext()
export const AccoutProvider = (props, request ) => {
  const cacheExpiration = nextConfig.env.LOGIN_CACHE_TIME
  const [user,setUser] = useState(new User().toJSON())
  const authCookie = Cookies.get("activeLogin")

  const isLogin = async ()=> {
    if ( authCookie == undefined) {
      let userJson = user
      if (userJson.token == '') {
        try {
          let refresh = await User.refreshToken()
          if (refresh.noauth_token) {
            userJson.token = refresh.noauth_token
          }
        } catch (error) {
          userJson.token = ''
        }
      }

      await cache({
        key: 'activeLogin',
        onNoCache: () => JSON.stringify(userJson),
        maxExpired: cacheExpiration,
        storageType: 'cookies',
      })

      setUser(userJson)
    }else{
      const cookiesToJSON = JSON.parse(authCookie)
      const users = JSON.parse(cookiesToJSON.response)
      if (user.token == '') {
        let userJson = users
        if (userJson.token == '') {
          try {
            let refresh = await User.refreshToken()
            if (refresh.noauth_token) {
              userJson.token = refresh.noauth_token
            }
          } catch (error) {
            userJson.token = ''
          }

          await cache({
            key: 'activeLogin',
            onNoCache: () => JSON.stringify(userJson),
            maxExpired: cacheExpiration,
            storageType: 'cookies',
          })
        }
        setUser(userJson)
      }
    }

    return user.isLogin
  }

  let state = {
    user,setUser,
  }

  let handleAccounts = {
    isLogin
  }

  return (
    <AccountContext.Provider value={{state, handleAccounts}}>
      {props.children}
    </AccountContext.Provider>
  )
}