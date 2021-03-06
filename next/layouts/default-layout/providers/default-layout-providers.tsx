import { createContext, useContext, useEffect, useState } from "react";
import { ImageDialog } from "../../../components/shared/utilities/dialog/image-dialog";
import { SettingService } from "../../../lib/repo/setting.repo";
import { useRouter } from "next/router";

export const DefaultLayoutContext = createContext<
  Partial<{
    topMenus: { name: string; link: string }[];
    hotline: {
      headerText: string;
      footerText: string;
      phone: string;
      items: { display: string; phone: string }[];
    };
    footerIntro: { content: string; link: string; copyright: string; contact: string };
    footerMenus: { link: string; text: string }[];
    policy: string;
    socials: {
      facebook: { link: string; visable: boolean; visible: boolean };
      youtube: { link: string; visable: boolean; visible: boolean };
      zalo: { link: string; visable: boolean; visible: boolean };
    };
    popup: {
      enable: boolean;
      image: string;
      link: string;
    };
    menus: any[];
    hiddenTags: string[];
    pageId: string;
  }>
>({});

export function DefaultLayoutProvider({ children }: any) {
  const [topMenus, setTopMenus] = useState(null);
  const [hotline, setHotline] = useState(null);
  const [footerIntro, setFooterIntro] = useState(null);
  const [footerMenus, setFooterMenus] = useState(null);
  const [socials, setSocials] = useState(null);
  const [policy, setPolicy] = useState(null);
  const [popup, setPopup] = useState(null);
  const [menus, setMenus] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [hiddenTags, setHiddenTags] = useState([]);
  const [pageId, setPageId] = useState("");

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
              "POPUP",
              "FACEBOOK_MESSENGER",
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
      setPopup(res.data.find((x) => x.key == "POPUP").value);
      if (res.data.find((x) => x.key == "FACEBOOK_MESSENGER").value?.enable) {
        setPageId(res.data.find((x) => x.key == "FACEBOOK_MESSENGER").value.pageID);
      }
      const hiddenMenus: string[] = res.data.find((x) => x.key == "HIDDEN_MENUS").value;
      setMenus(
        [
          { label: "S???n ph???m", path: "/products", icon: "/assets/img/product.png" },
          { label: "Ho???t ch???t", path: "/ingredients", icon: "/assets/img/ingredients.png" },
          {
            label: "?????t h??ng nhanh",
            path: "/quick-shopping",
            icon: "/assets/img/quick-shopping.png",
          },
          { label: "Khuy???n m??i", path: "/discount", icon: "/assets/img/promotion.png" },
        ].filter((m) => !hiddenMenus.includes(m.label))
      );
      setHiddenTags(res.data.find((x) => x.key == "HIDDEN_TAGS").value);

      if (!sessionStorage.getItem("hasShowPopup")) {
        console.log("show popup", popup);
        setShowImage(true);
        sessionStorage.setItem("hasShowPopup", "true");
      }
    });
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const router = useRouter();

  return (
    <DefaultLayoutContext.Provider
      value={{
        topMenus,
        hotline,
        footerIntro,
        footerMenus,
        socials,
        policy,
        menus,
        hiddenTags,
        popup,
        pageId,
      }}
    >
      {children}
      {popup?.enable && popup?.image && (
        <ImageDialog
          image={popup.image}
          isOpen={showImage}
          onClose={setShowImage}
          onClick={() => {
            if (popup.link) {
              router.push(popup.link);
              setShowImage(false);
            }
          }}
        />
      )}
    </DefaultLayoutContext.Provider>
  );
}

export const useDefaultLayoutContext = () => useContext(DefaultLayoutContext);
