import React, { createContext, useContext, useEffect, useState } from 'react';
import { Setting, SettingService } from '../../../lib/repo/setting.repo';

export const FooterContext = createContext<Partial<{
  setting: Setting[],
  setSetting: Function,
}>>({});

export const FooterProvider = (props) => {

  const [setting, setSetting] = useState<any[]>(null);

  useEffect(() => {
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
      console.log(res.data);
      setSetting(res.data)  
    })
    
  }, []);

  return <FooterContext.Provider value={{ setting, setSetting }}>
    {props.children}
  </FooterContext.Provider>;
}

export const useFooterContext = () => useContext(FooterContext)