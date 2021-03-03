import { createContext, useContext, useEffect, useState } from "react";
import { SettingService } from "../../../lib/repo/setting.repo";

export const HeaderContext = createContext<Partial<{
  topMenus: { name: string, link: string }[]
  hotline: { 
    headerText: string, 
    footerText: string, 
    phone: string, 
    items: { display: string, phone: string }[]
  }
}>>({});

export function HeaderProvider({ children }: any) {

  const [topMenus, setTopMenus] = useState(null);
  const [hotline, setHotline] = useState(null);

  const loadSettings = () => {
    SettingService.getAll({
      query: {
        limit: 0,
        filter: { key: { __in: ["TOP_MENU", "HOTLINE"] } }
      }
    }).then(res => {
      setTopMenus(res.data.find(x => x.key == 'TOP_MENU').value.items)
      setHotline(res.data.find(x => x.key == 'HOTLINE').value)
    })
  }

  useEffect(() => {
    loadSettings()
  }, []);
    
  return (
    <HeaderContext.Provider value={{ topMenus, hotline }}>
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeaderContext = () => useContext(HeaderContext)