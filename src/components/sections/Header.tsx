import type { MenuItem } from "@/interfaces/menu";

import { useEffect, useState } from "react";

import { getMenu } from "@/utils/menu";

import MenuDesktop from "@components/widgets/MenuDesktop";
import MenuMobile from "@components/widgets/MenuMobile";

import Logo from "@assets/Logo";
import ArrowDown from "@assets/ArrowDown";
import ContentLoader from "@lib/ContentLoader";
import Menu from "@components/sections/Menu";

export default function Header() {
  const [menuItems, setMenuItems] = useState<Array<MenuItem>>([]);

  // Fetch the menu data
  useEffect(() => {
    getMenu().then((response) => {
      if (typeof response === "object") {
        setMenuItems(response);
      }
    });
  }, []);

  return (
    <header className="pb-16 md:h-screen md:flex md:flex-col md:justify-between">

      <Menu />
      
      <div className="pt-24 box-container after:content-[''] after:table after:clear-both lg:pt-0">
        <div className="w-full h-6">
          <div className="w-[40%] float-left border-t-[1px] border-primary">
            &nbsp;
          </div>
        </div>
        <div className="w-[95%] mx-auto float-end flex flex-row justify-evenly py-8 lg:py-24">
          <div>
            <div className="w-fit">
              <h1 className="font-nunito tracking-[0.5rem] effect-typewritter xl:text-2xl">
                ARTIST
              </h1>
            </div>
            <h1 className="font-beausite-light text-2xl tracking-[0.25rem] md:text-5xl lg:text-6xl xl:text-10xl">
              ANA
            </h1>
            <h1 className="font-beausite-regular -mt-2 text-2xl tracking-[0.25rem] md:text-5xl lg:text-6xl xl:text-10xl">
              TAMAYO
            </h1>
          </div>
          <div>
            <Logo className="logo-header w-20 aspect-[10/14] md:w-32 lg:w-36 xl:w-52" />
          </div>
        </div>
        <div className="w-full h-4">
          <div className="w-[40%] float-right border-b-[1px] border-primary">
            &nbsp;
          </div>
        </div>
      </div>

      <div className="w-8 block mx-auto mt-8 md:w-12 lg:w-16 lg:mt-0 lg:pb-8">
        <a href="#about">
          <ArrowDown className="w-full hidden animate-bounce md:block" />
        </a>
      </div>
    </header>
  );
}
