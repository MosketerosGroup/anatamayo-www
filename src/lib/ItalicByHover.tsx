import type { ReactNode } from "react";

interface ItalicByHoverProps {
  children: ReactNode;
}

export function ItalicByHover({ children }: ItalicByHoverProps) {
  const childrenText = Array.from(children?.toString() as string);

  return (
    <div className="flex flex-row">
      {childrenText?.map((char: string, index: number) => {
        const style = {
          transitionDelay: `${index * 70}ms`,
        };

        return (
          <div
            key={index}
            className="transition-all ease-in-out transition-400 group-hover:-skew-x-12"
            style={style}
          >
            {char}
          </div>
        );
      })}
    </div>
  );
}
