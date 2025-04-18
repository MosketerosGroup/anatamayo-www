import type { MenuItem } from "@/interfaces/menu";

import React, { useEffect, useState } from 'react';

import { getMenu } from "@/utils/menu";

import MenuDesktop from "@components/widgets/MenuDesktop";
import MenuMobile from "@components/widgets/MenuMobile";

import Logo from "@assets/Logo";
import ArrowDown from "@assets/ArrowDown";

export default function Header() {

  const [menuItems, setMenuItems] = useState<Array<MenuItem>>([]);

  // Fetch the menu data
  useEffect(() => {
    getMenu().then((response) => {
      if (typeof(response) === 'object') {
        setMenuItems(response);
      }
    });  
  }, [])

  return (
    <header className="pb-16 md:pb-0 md:flex md:flex-col md:h-screen md:justify-between">
      <div className="font-denton-regular">
        <div className="md:hidden"><MenuMobile menu={menuItems} /></div>
        <div className="hidden float-right w-full lg:w-[80%] xl:w-[70%] md:block">
          <MenuDesktop menu={menuItems} />
        </div>
      </div>

      <div className="pt-24 box-container after:content-[''] after:table after:clear-both lg:pt-0">
        <div className="w-full h-6">
          <div className="w-[40%] float-left border-t-[1px] border-primary">
            &nbsp;
          </div>
        </div>
        <div className="w-[95%] mx-auto float-end flex flex-row justify-evenly py-8 lg:py-24">
          <div>
            <h1 className="font-nunito tracking-[0.25rem] xl:text-xl">
              ARTIST
            </h1>
            <h1 className="font-denton-thin text-2xl tracking-[0.35rem] md:text-5xl lg:text-6xl xl:text-10xl">
              ANA
            </h1>
            <h1 className="font-denton-bold text-2xl tracking-[0.35rem] md:text-5xl lg:text-6xl xl:text-10xl">
              TAMAYO
            </h1>
          </div>
          <div>
            <Logo className="w-20 aspect-[10/14] md:w-32 lg:w-36 xl:w-52" />
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
          <ArrowDown className="w-full hidden md:block" />
        </a>
      </div>
    </header>
  );
}
