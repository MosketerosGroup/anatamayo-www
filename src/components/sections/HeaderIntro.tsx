import type { MenuItem } from "@/interfaces/menu";

import React, { useEffect, useState } from "react";

import { getMenu } from "@/utils/menu";

import MenuDesktop from "@components/widgets/MenuDesktop";
import MenuMobile from "@components/widgets/MenuMobile";

import Logo from "@assets/Logo";
import ArrowDown from "@assets/ArrowDown";

export default function HeaderIntro() {
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
    <header className="pb-16 md:pb-0 md:flex md:flex-col md:h-screen md:justify-between">
      <div>
        <div className="md:hidden">{/* <MenuMobile menu={menuItems} /> */}</div>
        <div className="hidden float-right w-full lg:w-[80%] xl:w-[70%] md:block">
          {/* <MenuDesktop menu={menuItems} /> */}
        </div>
      </div>

      <div className="pt-40 box-container after:content-[''] after:table after:clear-both md:pt-0">
        <div className="w-full h-16">
          <div className="w-[40%] mx-auto border-t-[1px] border-primary">
            &nbsp;
          </div>
        </div>
        <div className="w-[95%] mx-auto float-end flex flex-row justify-evenly pt-8 py-6 lg:py-0">
          <div>
            <h1 className="font-nunito tracking-[0.5rem] xl:text-2xl">
              ARTIST
            </h1>
            <h1 className="font-beausite-light text-2xl tracking-[0.25rem] md:text-5xl lg:text-6xl xl:text-10xl">
              ANA
            </h1>
            <h1 className="font-beausite-regular -mt-2 text-2xl tracking-[0.25rem] md:text-5xl lg:text-6xl xl:text-10xl">
              TAMAYO
            </h1>
          </div>
          <div>
            <Logo className="w-20 aspect-[10/14] md:w-32 lg:w-36 xl:w-52" />
          </div>
        </div>
        <div className="w-full h-4 text-center text-lg font-italic tracking-widest md:text-xl lg:text-2xl lg:tracking-[12px]">
          COMING SOON
        </div>
      </div>

      <div className="font-beausite-regular text-center mt-24 leading-8 md:hidden">
        IF YOU WANT BE THE FIRST
        <br />
        TO KNOW
        <a href="https://forms.gle/9tvbr58DKjWEpiHc7" className="ml-2">
          <span className="border-2 border-primary px-2 py-2 rounded-xl transition-all duration-200 hover:bg-primary hover:text-white">
            CLICK HERE
          </span>
        </a>
      </div>

      <div className="font-beausite-regular text-center text-md -mt-24 hidden md:block lg:-mt-12 xl:text-lg">
        IF YOU WANT BE THE FIRST TO KNOW
        <a href="https://forms.gle/9tvbr58DKjWEpiHc7" className="ml-2">
          <span className="border-2 border-primary px-2 py-2 rounded-xl transition-all duration-200 hover:bg-primary hover:text-white">
            CLICK HERE
          </span>
        </a>
      </div>

      <div className="w-8 block mx-auto mt-8 md:w-12 lg:w-16 lg:mt-0 lg:pb-8">
        {/* <a href="#about">
          <ArrowDown className="w-full hidden md:block" />
        </a> */}
      </div>
    </header>
  );
}
