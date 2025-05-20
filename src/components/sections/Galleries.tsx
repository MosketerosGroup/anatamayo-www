import { useEffect, useState } from "react";
import { getGalleries } from "@/utils/galleries";
import type { GalleryFlatImage } from "@/interfaces/gallery";


const Galleries = () => {
  const [galleries, setGalleries] = useState<Array<GalleryFlatImage>>([]);

  
  useEffect(() => {
    getGalleries().then((response) => {
      if (typeof(response) === 'object')
        setGalleries(response);
    });
  }, []);

  return (
    <>
      {
        galleries.map((gallery, index) => {
          const slug = `gallery/?id=${gallery.databaseId}`;

          return (
            <div
              className="w-90% mx-auto md:w-72 md:px-2 lg:w-56 lg:px-0 xl:w-60"
              key={index}
            >
              <a href={slug}>
                <figure>
                  <img
                    src={gallery.image}
                    alt={gallery.name}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full"
                  />
                  <div className="mt-4 flex flex-row justify-between items-start">
                    <div>
                      <figcaption className="font-beausite-grand-light text-lg text-left">
                        {gallery.name}
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
        })
      }
    </>
  );
};

export default Galleries;
