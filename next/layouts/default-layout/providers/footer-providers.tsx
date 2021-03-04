import React, { createContext, useContext, useEffect, useState } from 'react';
import { SettingService } from '../../../lib/repo/setting.repo';

export const FooterContext = createContext<Partial<{
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

export const FooterProvider = ({ children }: any) => {
  const [hotline, setHotline] = useState(null);
  const [footerIntro, setFooterIntro] = useState(null);
  const [footerMenus, setFooterMenus] = useState(null);
  const [socials, setSocials] = useState(null);

  const loadSettings = () => {
    SettingService.getAll({
      query: { 
        limit:0, 
        filter: {
          key: {
            __in: ["HOTLINE", "FOOTER_INTRO", "FOOTER_MENU", "SOCIAL"]
          }
        } 
      },
      fragment: SettingService.shortFragment
    }).then(res => {
      setHotline(res.data.find(x => x.key == "HOTLINE").value)
      setFooterIntro(res.data.find(x => x.key == "FOOTER_INTRO").value)
      setFooterMenus(res.data.find(x => x.key == "FOOTER_MENU").value.items)
      setSocials(res.data.find(x => x.key == "SOCIAL").value)
    })
  }
  useEffect(() => {
    loadSettings();
  }, []);
    
  return (
    <FooterContext.Provider value={{ hotline, footerIntro, footerMenus, socials }}>
      {children}
    </FooterContext.Provider>
  );
}

export const useFooterContext = () => useContext(FooterContext)