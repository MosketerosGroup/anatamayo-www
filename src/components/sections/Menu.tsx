import type { MenuItem } from "@/interfaces/menu";

import { useEffect, useState } from "react";

import { getMenu } from "@/utils/menu";

import MenuDesktop from "@components/widgets/MenuDesktop";
import MenuMobile from "@components/widgets/MenuMobile";

import ContentLoader from "@lib/ContentLoader";

export default function Menu() {
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
    <>
      <div className="md:hidden">
        <MenuMobile menu={menuItems} />
      </div>
      <div className="hidden float-right w-full md:min-h-36 md:w-[90%] lg:w-[70%] xl:w-[65%] md:block">
      {
        (menuItems.length === 0) ?
          <ContentLoader width="800" height="130" viewBoxX="700" />
        :
          <MenuDesktop menu={menuItems} />
      }
      </div>
    </>
  );
}
