import { SvgIcon } from "../../lib/svg-icon";
import { firebase } from "../../lib/firebase-client";
import { Router } from "next/router";
import { TableIcon } from "../../icons/table";
import { PlusCircleIcon } from "../../icons/plus-circle";
import { LogoutIcon } from "../../icons/logout";
export const Routes = [
  { label: "Form", icon: TableIcon(), href: "/" },
  { label: "Tạo Form", icon: PlusCircleIcon(), href: "/create-form" },
  {
    label: "Đăng xuất",
    icon: LogoutIcon(),
    href: "/logout",
    type: "action",
    action: (router: Router) => {
      firebase.auth().signOut();
      router.push("/auth/login");
    },
  },
];
