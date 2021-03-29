import { createContext, useContext, useEffect, useState } from "react";
import { SettingService } from "../../../lib/repo/setting.repo";

export const DefaultLayoutContext = createContext<
  Partial<{
    topMenus: { name: string; link: string }[];
    hotline: {
      headerText: string;
      footerText: string;
      phone: string;
      items: { display: string; phone: string }[];
    };
    footerIntro: { content: string; link: string; more: string };
    footerMenus: { link: string; text: string }[];
    policy: string;
    socials: {
      facebook: { link: string; visable: boolean; visible: boolean };
      youtube: { link: string; visable: boolean; visible: boolean };
      zalo: { link: string; visable: boolean; visible: boolean };
    };
    menus: any[];
    hiddenTags: string[];
  }>
>({});

export function DefaultLayoutProvider({ children }: any) {
  const [topMenus, setTopMenus] = useState(null);
  const [hotline, setHotline] = useState(null);
  const [footerIntro, setFooterIntro] = useState(null);
  const [footerMenus, setFooterMenus] = useState(null);
  const [socials, setSocials] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [menus, setMenus] = useState([]);
  const [hiddenTags, setHiddenTags] = useState([]);

  const loadSettings = () => {
    SettingService.getAll({
      query: {
        limit: 0,
        filter: {
          key: {
            __in: [
              "TOP_MENU",
              "HOTLINE",
              "FOOTER_INTRO",
              "FOOTER_MENU",
              "SOCIAL",
              "POLICY",
              "HIDDEN_MENUS",
              "HIDDEN_TAGS",
            ],
          },
        },
      },
    }).then((res) => {
      setTopMenus(res.data.find((x) => x.key == "TOP_MENU").value.items);
      setHotline(res.data.find((x) => x.key == "HOTLINE").value);
      setFooterIntro(res.data.find((x) => x.key == "FOOTER_INTRO").value);
      setFooterMenus(res.data.find((x) => x.key == "FOOTER_MENU").value.items);
      setSocials(res.data.find((x) => x.key == "SOCIAL").value);
      setPolicy(res.data.find((x) => x.key == "POLICY").value);
      const hiddenMenus: string[] = res.data.find((x) => x.key == "HIDDEN_MENUS").value;
      setMenus(
        [
          { label: "Sản phẩm", path: "/products", icon: "/assets/img/product.png" },
          { label: "Hoạt chất", path: "/ingredients", icon: "/assets/img/ingredients.png" },
          {
            label: "Đặt hàng nhanh",
            path: "/quick-shopping",
            icon: "/assets/img/quick-shopping.png",
          },
          { label: "Khuyến mãi", path: "/products?sale=true", icon: "/assets/img/promotion.png" },
        ].filter((m) => !hiddenMenus.includes(m.label))
      );
      setHiddenTags(res.data.find((x) => x.key == "HIDDEN_TAGS").value);
    });
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <DefaultLayoutContext.Provider
      value={{ topMenus, hotline, footerIntro, footerMenus, socials, policy, menus, hiddenTags }}
    >
      {children}
    </DefaultLayoutContext.Provider>
  );
}

export const useDefaultLayoutContext = () => useContext(DefaultLayoutContext);
