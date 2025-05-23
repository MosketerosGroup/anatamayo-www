import type { MenuItem } from "@/interfaces/menu";
import { ItalicByHover } from "@lib/ItalicByHover";
import Subscribe from "@components/widgets/Subscribe";

interface Props {
  menu: Array<MenuItem>;
}

export default function MenuDesktop({menu} : Props) {

  return (
    <nav className="flex-row font-beausite-regular w-full hidden text-md md:flex">
      <menu className="flex justify-center flex-row p-0 xl:text-lg">
        {menu.map(({ name, href, target }, key) => {

          return (
            <li className="" key={key}>
              <a href={href} target={target}>
                <div className="group pl-4 pr-4 pb-2 pt-16 hover:bg-secondary/30 transition-colors duration-500 lg:pl-5 lg:pr-5">
                  <ItalicByHover>{name}</ItalicByHover>
                </div>
              </a>
            </li>
          );
        })}
      </menu>
      <Subscribe />
    </nav>
  );
}
