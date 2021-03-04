import { createContext, useContext, useEffect, useState } from "react";
import { SettingService } from "../../../lib/repo/setting.repo";

export const DefaultLayoutContext = createContext<Partial<{
  topMenus: { name: string, link: string }[],
  hotline: { 
    headerText: string, 
    footerText: string, 
    phone: string, 
    items: { display: string, phone: string }[]
  },
  footerIntro: { content: string, link: string },
  footerMenus: { link: string, text: string }[],
  socials: { 
    facebook: { link: string, visable: boolean, visible: boolean },
    youtube: { link: string, visable: boolean, visible: boolean },
    zalo: { link: string, visable: boolean, visible: boolean }
  },
}>>({});

export function DefaultLayoutProvider({ children} : any) {

  const [topMenus, setTopMenus] = useState(null);
  const [hotline, setHotline] = useState(null);
  const [footerIntro, setFooterIntro] = useState(null);
  const [footerMenus, setFooterMenus] = useState(null);
  const [socials, setSocials] = useState(null);

  const loadSettings = () => {
    SettingService.getAll({
      query: {
        limit: 0,
        filter: { key: { __in: ["TOP_MENU", "HOTLINE", "FOOTER_INTRO", "FOOTER_MENU", "SOCIAL"] } }
      }
    }).then(res => {
      setTopMenus(res.data.find(x => x.key == 'TOP_MENU').value.items)
      setHotline(res.data.find(x => x.key == 'HOTLINE').value)
      setFooterIntro(res.data.find(x => x.key == "FOOTER_INTRO").value)
      setFooterMenus(res.data.find(x => x.key == "FOOTER_MENU").value.items)
      setSocials(res.data.find(x => x.key == "SOCIAL").value)
    })
  }

  useEffect(() => {
    loadSettings()
  }, []);

  return (
    <DefaultLayoutContext.Provider value={{ topMenus, hotline, footerIntro, footerMenus, socials }}>
      {children}
    </DefaultLayoutContext.Provider>
  );
}

export const useDefaultLayoutContext = () => useContext(DefaultLayoutContext);