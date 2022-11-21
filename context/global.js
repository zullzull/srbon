import { createContext, useState } from "react";
import { Menu } from "../models/menu";
import cache from "../plugins/cache";

export const GlobalContext = createContext();
export const GlobalProvider = (props) => {
  const [ headers, setHeader] = useState([])
  const [ footers, setFooter] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  
  const getMenu = async () => {
    const menus = await cache({
      key: 'getMenu',
      onNoCache: Menu.fetch,
      maxExpired: 1,
    })

    if (menus.success) {
      setHeader(menus.menus.header)
      setFooter(menus.menus.footer)
      setIsLoading(false)
    }
  }

  let state = {
    headers, setHeader,
    footers, setFooter,
    isLoading, setIsLoading
  }

  let handleSettings = {
    getMenu
  }
  
  return (
    <GlobalContext.Provider value={{state, handleSettings}}>
      {props.children}
    </GlobalContext.Provider>
  )
}