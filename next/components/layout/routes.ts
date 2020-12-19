import { SvgIcon } from "../../lib/svg-icon";
import { firebase } from "../../lib/firebase-client";
import { Router } from "next/router";
export const Routes = [
  { label: "Form", icon: SvgIcon.form, href: "/" },
  { label: "Tạo Form", icon: SvgIcon.add, href: "/create-form" },
  {
    label: "Đăng xuất",
    icon: SvgIcon.add,
    href: "/create-form",
    type: "action",
    action: (router: Router) => {
      firebase.auth().signOut();
      router.push("/auth/login");
    },
  },
];
