import type { ReactNode } from "react";

interface props {
  // children?: ReactNode;
}

const arts = [
  {
    title: "Jaguar",
    slug: "jaguar",
    image:
      "https://api.anatamayo.com/wp-content/uploads/2025/05/jaguar-600x439.webp",
  },
  {
    title: "Diálogos Iluminados",
    slug: "dialogos-iluminados",
    image:
      "https://api.anatamayo.com/wp-content/uploads/2025/05/dialogo-iluminados-600x762.webp",
  },
  {
    title: "Fluir - Flow",
    slug: "fluir-flow",
    image:
      "https://api.anatamayo.com/wp-content/uploads/2025/05/fluir-flow-600x406.webp",
  },
];

const Arts = ({}: props) => {
  return (
    <>
      {arts.map((art) => {
        return (
          <div className="w-90% mx-auto md:w-56 md:px-4 lg:w-80 lg:px-8 xl:w-[22rem]">
            <a href={art.slug}>
              <figure>
                <img
                  src={art.image}
                  alt={art.title}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full"
                />
                <div className="mt-4 flex flex-row justify-between items-start">
                  <div>
                    <figcaption className="font-beausite-grand-light text-lg text-left">
                      {art.title}
                    </figcaption>
                    {/* <p className="font-medium-italic pt-0 text-sm">
                      18 X 24 INCHES
                    </p> */}
                  </div>
                  <div>
                    <span className="border-primary border-2 px-2 py-1 font-beausite-grand-light text-lg">
                      +
                    </span>
                  </div>
                </div>
              </figure>
            </a>
          </div>
        );
      })}
    </>
  );
};

export default Arts;
