import type { MenuItem } from "@/interfaces/menu";

interface Props {
  menu: Array<MenuItem>;
}

export default function MenuDesktop({menu} : Props) {

  return (
    <nav className="w-full hidden md:block">
      <menu className="flex justify-center flex-row p-0 menu-desktop">
        {menu.map(({ name, href, target }, key) => {
          return (
            <li className="" key={key}>
              <a href={href} target={target}>
                <div className="pl-4 pr-4 pb-2 pt-16 text-md hover:bg-secondary/30 transition-colors duration-500 lg:pl-5 lg:pr-5 xl:text-lg">
                  {name}
                </div>
              </a>
            </li>
          );
        })}
      </menu>
    </nav>
  );
}
