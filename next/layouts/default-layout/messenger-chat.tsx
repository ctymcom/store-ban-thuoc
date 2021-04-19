import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useDevice from "./../../lib/hooks/useDevice";

/**
 * Utils
 */
// const removeElementByIds = (ids) => {
//   ids.forEach((id) => {
//     const element = document.getElementById(id);
//     if (element && element.parentNode) {
//       element.parentNode.removeChild(element);
//     }
//   });
// };

interface PropsType extends ReactProps {
  pageId: string;
  themeColor: string;
  language: string;
}
export default function MessengerChat({ pageId, language, themeColor, ...props }: PropsType) {
  const { isSSR } = useDevice();
  if (isSSR) return null;

  const [inited, setInited] = useState(false);
  const ref = useRef();

  const setFbAsyncInit = () => {
    (window as any).fbAsyncInit = () => {
      (window as any).FB.init({
        xfbml: true,
        version: "v10.0",
      });
    };
  };

  const loadSDKAsynchronously = () => {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  // const removeFacebookSDK = () => {
  //   removeElementByIds(["facebook-jssdk", "fb-root"]);
  //   delete (window as any).FB;
  // };

  const reloadSDKAsynchronously = () => {
    // removeFacebookSDK();
    loadSDKAsynchronously();
  };

  useEffect(() => {
    if (ref.current && !inited) {
      setInited(true);
      setFbAsyncInit();
      reloadSDKAsynchronously();
    }
  }, [ref.current]);

  useEffect(() => {
    return () => {
      document.getElementById("chatplugin-root").remove();
    };
  }, []);

  return (
    <div>
      <div>
        {createPortal(
          <>
            <div id="fb-root"></div>
            <div
              ref={ref}
              className="fb-customerchat"
              {...{
                language,
                theme_color: themeColor,
                page_id: pageId,
              }}
            ></div>
          </>,
          document.getElementById("chatplugin-root")
        )}
      </div>
    </div>
  );
}
