import { useState } from "react";
import { MainHeader } from "./main-header";
import { MenuHeader } from "./menu-header";
import { TopHeader } from "./top-header";

export function Header() {
  const [menuOpened, setMenuOpened] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <>
      <div className="w-full sticky top-0 md:-top-7 z-50">
        <TopHeader />
        <MainHeader setMenuOpened={setMenuOpened} />
        <MenuHeader menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
      </div>
    </>
  );
}
