import type { GalleryDetailFlatImage } from "@/interfaces/galleryDetail";

import { useEffect, useState } from "react";

import ContentLoader from "@lib/ContentLoader";
import { getGallery } from "@/utils/gallery";


const Fallback = () => {

  return (
    <>
      <div className="box-container lg:pt-0">
        <div className="w-full h-12">
          <div className="w-[40%] float-left border-t-[1px] border-primary">
            &nbsp;
          </div>
        </div>
        <h1 className="font-beausite-regular text-center text-2xl tracking-[0.25rem] md:text-5xl lg:text-6xl xl:text-10xl">
          <div className="md:hidden"><ContentLoader width="90%" height="60" viewBoxX="200" viewBoxY="50" className="mx-auto" /></div>
          <div className="hidden md:block xl:hidden"><ContentLoader width="90%" height="100" viewBoxX="200" viewBoxY="50" className="mx-auto" /></div>
          <div className="hidden xl:block"><ContentLoader width="90%" height="150" viewBoxX="200" viewBoxY="50" className="mx-auto" /></div>
        </h1>
      </div>

      <div className="box-container mt-12 md:text-center">
				<div className="md:hidden">
					<ContentLoader width="100%" height="30" viewBoxX="500" viewBoxY="50" className="mx-auto" />
					<ContentLoader width="100%" height="30" viewBoxX="500" viewBoxY="50" className="mx-auto" />
					<ContentLoader width="100%" height="30" viewBoxX="500" viewBoxY="50" className="mx-auto" />
					<ContentLoader width="100%" height="30" viewBoxX="500" viewBoxY="50" className="mx-auto" />
				</div>
				<div className="hidden md:block">
					<ContentLoader width="90%" height="35" viewBoxX="900" viewBoxY="50" transform="translate(50)" className="mx-auto" />
					<ContentLoader width="90%" height="35" viewBoxX="900" viewBoxY="50" transform="translate(50)" className="mx-auto" />
					<ContentLoader width="90%" height="35" viewBoxX="900" viewBoxY="50" transform="translate(50)" className="mx-auto" />
					<ContentLoader width="90%" height="35" viewBoxX="900" viewBoxY="50" transform="translate(50)" className="mx-auto" />
				</div>
      </div>

      <div className="mx-auto w-full lg:max-w-[1100px]">
        <div className="box-container mt-12 flex flex-row flex-wrap justify-center gap-y-1">
          <div className="px-2 w-36 aspect-square md:w-52">
            <ContentLoader width="100" height="100" viewBoxX="100" viewBoxY="100" className="mx-auto w-full h-full" />
          </div>
          <div className="px-2 w-36 aspect-square md:w-52">
            <ContentLoader width="100" height="100" viewBoxX="100" viewBoxY="100" className="mx-auto w-full h-full" />
          </div>
          <div className="px-2 w-36 aspect-square md:w-52">
            <ContentLoader width="100" height="100" viewBoxX="100" viewBoxY="100" className="mx-auto w-full h-full" />
          </div>
        </div>
      </div>
    </>
  );
};

const GalleryDetail = () => {

  const [gallery, setGallery] = useState<GalleryDetailFlatImage | null>();

  // Get the galleryId from URL
  const params = new URLSearchParams(document.location.search);
  const galleryId = params.get("id");

  useEffect(() => {
    
    if (galleryId)
      getGallery(100, galleryId).then((response) => {
        if (typeof(response) === 'object')
          setGallery(response);
      });
  }, []);

  return (
    <>
    {
      (gallery) ?
      <>
        <div className="box-container lg:pt-0">
          <div className="w-full h-12">
            <div className="w-[40%] float-left border-t-[1px] border-primary">
              &nbsp;
            </div>
          </div>
          <h1 className="font-beausite-regular uppercase text-center text-2xl tracking-[0.25rem] md:text-5xl lg:text-6xl xl:text-10xl">
            {gallery.name}
          </h1>
        </div>

        <div className="box-container mt-8 md:text-center" dangerouslySetInnerHTML={{__html: gallery.description}}></div>

        <div className="mx-auto w-full lg:max-w-[1100px]">
          <div className="box-container mt-12 flex flex-row flex-wrap justify-center gap-y-1">
          {
            gallery.products.map((product, index) => {

              const url = `/art/?galid=${gallery.databaseId}&id=${product.databaseId}`

              return (
                <div className="px-2 w-36 aspect-square md:w-52" key={index}>
                  <a href={url}>
                    <img
                      alt={product.name}
                      title={product.name}
                      className="w-full aspect-square object-cover border-white border-2 transition-all hover:scale-120 hover:drop-shadow-my-shadow"
                      src={product.image}
                    />
                  </a>
                </div>
              )
            })
          }
          </div>
        </div>
      </>
      :
      <Fallback />
    }
    </>
  );
};

export default GalleryDetail;
