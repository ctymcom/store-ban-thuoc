import { useEffect } from "react";
import { createPortal } from "react-dom";
import useDevice from "../../lib/hooks/useDevice";
interface PropsType extends ReactProps {
  pageId: string;
}

declare var FB: any;
export function MessengerCustomerChat({ pageId }: PropsType) {
  const { isSSR } = useDevice();
  if (isSSR) return null;
  useEffect(() => {
    (window as any).fbAsyncInit = function () {
      FB.init({
        xfbml: true,
        version: "v10.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return createPortal(
    <>
      <div id="fb-root"></div>
      {
        <div
          className="fb-customerchat"
          //@ts-ignore
          attribution="setup_tool"
          theme_color="#42B54A"
          page_id={pageId}
        ></div>
      }
    </>,
    document.body
  );
}
