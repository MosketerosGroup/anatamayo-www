import type { ReactNode } from "react";

interface props {
  // children?: ReactNode;
}

const arts = [
  {
    title: "Jaguar",
    slug: "jaguar",
    pictureAvif: "",
    pictureWebp: "",
    picturePng: "",
    pictureJpg: "https://api.anatamayo.com/wp-content/uploads/2025/05/jaguar-thumbnail-768x562.jpg",
  },
  {
    title: "Diálogos Iluminados",
    slug: "dialogos-iluminados",
    pictureAvif: "",
    pictureWebp: "",
    picturePng: "",
    pictureJpg: "https://api.anatamayo.com/wp-content/uploads/2025/05/dialogo-iluminados-thumbnail-768x976.jpg",
  },
  {
    title: "Fluir - Flow",
    slug: "fluir-flow",
    pictureAvif: "https://api.anatamayo.com/wp-content/uploads/2025/05/fluir-flow-thumbnail-768x520.avif",
    pictureWebp: "https://api.anatamayo.com/wp-content/uploads/2025/05/fluir-flow-thumbnail-768x520.webp",
    picturePng: "",
    pictureJpg: "https://api.anatamayo.com/wp-content/uploads/2025/05/fluir-flow-thumbnail-768x520.jpg",
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
                <div>
                  <picture>
                    {art.pictureAvif !== "" && (
                      <source srcSet={art.pictureAvif} type="image/avif" />
                    )}
                    {art.pictureWebp !== "" && (
                      <source srcSet={art.pictureWebp} type="image/webp" />
                    )}
                    {art.pictureJpg !== "" && (
                      <img
                        src={art.pictureJpg}
                        data-image-component="true"
                        alt={art.title}
                        width="393"
                        height="393"
                        loading="lazy"
                        decoding="async"
                        className="aspect-square"
                      />
                    )}
                    {art.picturePng !== "" && (
                      <img
                        src={art.picturePng}
                        data-image-component="true"
                        alt={art.title}
                        width="393"
                        height="393"
                        loading="lazy"
                        decoding="async"
                        className="aspect-square object-cover"
                      />
                    )}
                  </picture>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <figcaption className="font-beausite-grand-light text-lg mt-4 text-left">
                      {art.title}
                    </figcaption>
                    <p className="font-medium-italic pt-0 text-sm">
                      18 X 24 INCHES
                    </p>
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
