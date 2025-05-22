import { useCallback, useEffect, useState } from "react";

import type { GalleryDetailFlatImage } from "@/interfaces/galleryDetail";
import type { Art, GalleryAndArts } from "@/interfaces/art";
import { getGallery } from "@/utils/gallery";
import { getArt } from "@/utils/art";

import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/utils/EmblaCarouselArrowsButtons";
// import { useDotButton } from "@/utils/EmblaCarouselDotButton";

import ArrowBack from "@assets/ArrowBack";
import imgEmail from "@assets/email.webp";
import imgCellphone from "@assets/cellphone.webp";

import styles from "@/styles/artDetails.module.css";
import ContentLoader from "@/lib/ContentLoader";

const ArtDetails = () => {
  const [gallery, setGallery] = useState<GalleryDetailFlatImage | null>(null);
  const [art, setArt] = useState<Art | null>(null);

  // Get the galleryId & artId from URL
  const params = new URLSearchParams(document.location.search);
  const galleryId = params.get("galid");
  const artId = params.get("id");

  useEffect(() => {
    if (galleryId) {
      getGallery(100, galleryId).then((response) => {
        if (typeof response === "object") {
          // console.debug("getGallery", response);
          setGallery(response);
        }
      });

      if (artId) {
        getArt(600, galleryId, artId).then((response) => {
          if (typeof response === "object") {
            const selectedArt = response.filter(
              (art) => art.databaseId === Number(artId),
            );
            console.debug('art', selectedArt[0]);
            setArt(selectedArt[0]);
          }
        });
      }
    }
  }, []);

  // ---------------------

  // All code below is carousel related
  const options: EmblaOptionsType = { loop: true };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  // const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
  //   emblaApi,
  //   onNavButtonClick
  // );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <>
      <div className="box-container">
        {gallery ? (
          <a href={`/gallery/?id=${galleryId}`}>
            <ArrowBack className="w-12 px-1 py-1 lg:w-14" />
          </a>
        ) : (
          <ContentLoader height="60" width="60" viewBoxX="60" viewBoxY="60" />
        )}

        <div className="flex flex-col items-center mt-8 gap-y-4 lg:flex-row">
          <div className="w-full lg:pr-8 lg:basis-1/2 xl:basis-5/12">
            <div className="flex flex-row items-center">
              {gallery ? (
                <>
                  <div className="w-full">
                    <hr />
                  </div>
                  <h1
                    className="font-beausite-regular text-right pl-4 uppercase text-xl tracking-[0.25rem] leading-10 md:text-5xl md:leading-20 lg:text-3xl lg:pl-8 lg:leading-16"
                    dangerouslySetInnerHTML={{
                      __html: gallery.name.replace("-", "&#8209;"),
                    }}
                  ></h1>
                </>
              ) : (
                <>
                  <div className="md:hidden">
                    <ContentLoader
                      width="100%"
                      height="60"
                      viewBoxX="500"
                      viewBoxY="60"
                      className="mx-auto"
                    />
                  </div>
                  <div className="hidden md:block lg:hidden">
                    <ContentLoader
                      width="100%"
                      height="95"
                      viewBoxX="900"
                      viewBoxY="95"
                      className="mx-auto"
                    />
                  </div>
                  <div className="hidden lg:block">
                    <ContentLoader
                      width="100%"
                      height="60"
                      viewBoxX="490"
                      viewBoxY="60"
                      className="mx-auto"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="text-center hidden mt-12 ml-[30%] lg:block">
              {art ? (
                <>
                  <h1 className="font-beausite-grand-light text-xl">
                    {art.name}
                  </h1>
                  <p className="font-medium-italic uppercase">
                    {
                      art.attributes.filter(
                        (attribute) => attribute.name === "size",
                      )[0].content
                    }
                  </p>
                  <hr className="mx-auto md:w-[80%]" />
                  <p className="font-medium-italic leading-8">
                    {
                      art.attributes.filter(
                        (attribute) => attribute.name === "materials",
                      )[0].content
                    }
                  </p>
                </>
              ) : (
                <>
                  <ContentLoader
                    width="100%"
                    height="55"
                    viewBoxX="250"
                    viewBoxY="55"
                    className="mx-auto"
                  />
                  <ContentLoader
                    width="100%"
                    height="30"
                    viewBoxX="250"
                    viewBoxY="30"
                    className="mx-auto"
                  />
                  <ContentLoader
                    width="100%"
                    height="70"
                    viewBoxX="250"
                    viewBoxY="70"
                    className="mx-auto"
                  />
                </>
              )}
              <div className="flex flex-row gap-x-4 mt-8 justify-center">
                <a href="#!">
                  <img
                    src={imgCellphone.src}
                    alt="Cellphone"
                    className="w-16"
                  />
                </a>
                <a href="#!">
                  <img src={imgEmail.src} alt="Email" className="w-16" />
                </a>
              </div>
              <p className="font-medium-italic text-sm md:text-base">
                Contact if you are interested in this painting
              </p>
            </div>
          </div>

          <div className="lg:basis-1/2 xl:basis-7/12">
            <div className={styles.embla}>
              <div className="flex flex-row items-center justify-center">
                <div className={styles.embla__controls}>
                  <div className={styles.embla__buttons}>
                    <PrevButton
                      onClick={onPrevButtonClick}
                      disabled={prevBtnDisabled}
                    />
                  </div>
                </div>

                <div className="lg:pl-4">
                  <div className={styles.embla__viewport} ref={emblaRef}>
                    <div className={styles.embla__container}>
                      {
                        (art) ?
                          art.gallery.map((image, index) => {
                            return (
                              <div className={styles.embla__slide} key={index}>
                                <img
                                  src={image.thumbnailUrl}
                                  className="m-auto max-h-96"
                                  alt=""
                                />
                              </div>
                            )
                          })
                        :
                          <ContentLoader
                            width="100%"
                            height="450"
                            viewBoxX="600"
                            viewBoxY="450"
                            className="mx-auto"
                          />
                      }
                    </div>
                  </div>
                </div>

                <div className={styles.embla__controls}>
                  <div className={styles.embla__buttons}>
                    <NextButton
                      onClick={onNextButtonClick}
                      disabled={nextBtnDisabled}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center lg:hidden">
          {art ? (
            <>
              <h1 className="font-beausite-grand-light text-xl">
                {art.name}
              </h1>
              <p className="font-medium-italic uppercase">
                {
                  art.attributes.filter(
                    (attribute) => attribute.name === "size",
                  )[0].content
                }
              </p>
              <hr className="mx-auto md:w-[80%]" />
              <p className="font-medium-italic leading-8">
                {
                  art.attributes.filter(
                    (attribute) => attribute.name === "materials",
                  )[0].content
                }
              </p>
            </>
          ) : (
            <>
              <ContentLoader
                width="100%"
                height="55"
                viewBoxX="250"
                viewBoxY="55"
                className="mx-auto"
              />
              <ContentLoader
                width="100%"
                height="30"
                viewBoxX="250"
                viewBoxY="30"
                className="mx-auto"
              />
              <ContentLoader
                width="100%"
                height="70"
                viewBoxX="250"
                viewBoxY="70"
                className="mx-auto"
              />
            </>
          )}
          <div className="flex flex-row gap-x-4 mt-8 justify-center">
            <a href="#!">
              <img src={imgCellphone.src} alt="Cellphone" className="w-16" />
            </a>
            <a href="#!">
              <img src={imgEmail.src} alt="Email" className="w-16" />
            </a>
          </div>
          <p className="font-medium-italic text-sm md:text-base">
            Contact if you are interested in this painting
          </p>
        </div>
      </div>

      <div className="mt-8 bg-base-200 py-8 relative">
        <div className="hidden absolute font-beausite-regular text-primary/40 text-xl left-[5%] top-[50%] -translate-y-[50%] [writing-mode:_sideways-lr] md:block">
          Gallery
        </div>
        <div className="box-container text-center">
          {gallery ? (
            <h1 className="font-beausite-regular uppercase text-xl tracking-[0.25rem] md:text-5xl lg:text-3xl lg:pl-8">
              {gallery.name}
            </h1>
          ) : (
            <>
              <div className="md:hidden">
                <ContentLoader
                  width="100%"
                  height="60"
                  viewBoxX="500"
                  viewBoxY="60"
                  className="mx-auto"
                />
              </div>
              <div className="hidden md:block lg:hidden">
                <ContentLoader
                  width="100%"
                  height="95"
                  viewBoxX="900"
                  viewBoxY="95"
                  className="mx-auto"
                />
              </div>
              <div className="hidden lg:block">
                <ContentLoader
                  width="100%"
                  height="60"
                  viewBoxX="490"
                  viewBoxY="60"
                  className="mx-auto"
                />
              </div>
            </>
          )}

          {gallery ? (
            <p className="box-container mt-4 text-sm md:text-base">
              {gallery.subdescription}
            </p>
          ) : (
            <ContentLoader
              width="100%"
              height="60"
              viewBoxX="500"
              viewBoxY="60"
              className="mx-auto"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ArtDetails;
