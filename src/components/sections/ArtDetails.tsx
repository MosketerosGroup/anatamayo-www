import { useCallback, useEffect, useState } from "react";

import type { GalleryDetailFlatImage } from "@/interfaces/galleryDetail";
import { getGallery } from "@/utils/gallery";

import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { NextButton, PrevButton, usePrevNextButtons } from "@/utils/EmblaCarouselArrowsButtons";
import { useDotButton } from "@/utils/EmblaCarouselDotButton";

import ArrowBack from "@assets/ArrowBack";
import imgEmail from "@assets/email.webp";
import imgCellphone from "@assets/cellphone.webp";

import styles from "@/styles/artDetails.module.css";
import ContentLoader from "@/lib/ContentLoader";


const ArtDetails = () => {

  const [gallery, setGallery] = useState<GalleryDetailFlatImage | null>();

  // Get the galleryId from URL
  const params = new URLSearchParams(document.location.search);
  const galleryId = params.get("galid");

  useEffect(() => {
    
    if (galleryId)
      getGallery(100, galleryId).then((response) => {
        if (typeof(response) === 'object') {
          console.debug('getGalleryArts', response);
          setGallery(response);
        }
      });
  }, []);


  // ---------------------

  // All code below is carousel related
  const options : EmblaOptionsType = {loop: true};

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, []);

  // const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
  //   emblaApi,
  //   onNavButtonClick
  // );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick);


  return (
    <>
      <div className="box-container">
        {
          (gallery) ?
            <a href={`/gallery/?id=${galleryId}`}>
              <ArrowBack className="w-12 px-1 py-1 lg:w-14" />
            </a>
          :
            <ContentLoader height="60" width="60" viewBoxX="60" viewBoxY="60" />
        }

        <div className="flex flex-col items-center mt-8 gap-y-4 lg:flex-row">
          <div className="w-full lg:pr-8 lg:basis-1/2 xl:basis-5/12">
            <div className="flex flex-row items-center">
                {
                  (gallery) ?
                    <>
                      <div className="w-full"><hr/></div>
                      <h1 className="font-beausite-regular text-right px-4 uppercase text-xl tracking-[0.25rem] leading-10 md:text-5xl md:leading-20 md:pl-4 lg:text-3xl lg:pr-12 lg:pl-8 lg:leading-16">
                        {gallery.name}
                      </h1>
                    </>
                  :
                    <>
                      <div className="md:hidden">
                        <ContentLoader width="100%" height="60" viewBoxX="500" viewBoxY="60" className="mx-auto" />
                      </div>
                      <div className="hidden md:block lg:hidden">
                        <ContentLoader width="100%" height="95" viewBoxX="900" viewBoxY="95" className="mx-auto" />
                      </div>
                      <div className="hidden lg:block">
                        <ContentLoader width="100%" height="60" viewBoxX="490" viewBoxY="60" className="mx-auto" />
                      </div>
                    </>
                }
            </div>
            <div className="text-center hidden mt-12 ml-[30%] lg:block">
              <h1 className="font-beausite-grand-light text-xl">Selva</h1>
              <p className="font-medium-italic">16 X 24 INCHES</p>
              <hr className="mx-auto md:w-[80%]"/>
              <p className="font-medium-italic leading-8">Acrylic, gesso, GRAPHITE, AND CHARCHOAL ON WATERCOLOR PAPER</p>
              <div className="flex flex-row gap-x-4 mt-8 justify-center">
                <a href="#!">
                  <img src={imgCellphone.src} alt="Cellphone" className="w-16" />
                </a>
                <a href="#!">
                  <img src={imgEmail.src} alt="Email" className="w-16" />
                </a>
              </div>
              <p className="font-medium-italic text-sm md:text-base">Contact if you are interested in this painting</p>
            </div>
          </div>

          <div className="lg:basis-1/2 xl:basis-7/12">
            <div className={styles.embla}>
              <div className="flex flex-row items-center justify-center">
                <div className={styles.embla__controls}>
                  <div className={styles.embla__buttons}>
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    {/* <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} /> */}
                  </div>
                </div>

                <div className="lg:pl-4">
                  <div className={styles.embla__viewport} ref={emblaRef}>
                    <div className={styles.embla__container}>
                      {/* === */}
                      <div className={styles.embla__slide}>
                        <img src="https://api.anatamayo.com/wp-content/uploads/2025/05/melanistic_jaguar_i-01-600x439.webp" className="mx-auto" alt='' />
                      </div>
                      <div className={styles.embla__slide}>
                        <img src="https://api.anatamayo.com/wp-content/uploads/2025/05/selva-01-600x439.webp" className="mx-auto" alt="" />
                      </div>
                      {/* === */}
                    </div>
                  </div>
                </div>

                <div className={styles.embla__controls}>
                  <div className={styles.embla__buttons}>
                    {/* <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} /> */}
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 text-center lg:hidden">
          <h1 className="font-beausite-grand-light text-xl">Selva</h1>
          <p className="font-medium-italic">18 X 24 INCHES</p>
          <hr className="mx-auto md:w-[80%]"/>
          <p className="font-medium-italic leading-8">Acrylic, gesso, GRAPHITE, AND CHARCHOAL ON WATERCOLOR PAPER</p>
          <div className="flex flex-row gap-x-4 mt-8 justify-center">
            <a href="#!">
              <img src={imgCellphone.src} alt="Cellphone" className="w-16" />
            </a>
            <a href="#!">
              <img src={imgEmail.src} alt="Email" className="w-16" />
            </a>
          </div>
          <p className="font-medium-italic text-sm md:text-base">Contact if you are interested in this painting</p>
        </div>
      </div>

      <div className="mt-8 bg-base-200 py-8 relative">
        <div className="hidden absolute font-beausite-regular text-primary/40 text-xl left-[5%] top-[50%] -translate-y-[50%] [writing-mode:_sideways-lr] md:block">
          Gallery
        </div>
        <div className="box-container text-center">
          {
            (gallery) ?
              <h1 className="font-beausite-regular uppercase text-xl tracking-[0.25rem] md:text-5xl lg:text-3xl lg:pl-8">
                {gallery.name}
              </h1>
            :
              <>
                <div className="md:hidden">
                  <ContentLoader width="100%" height="60" viewBoxX="500" viewBoxY="60" className="mx-auto" />
                </div>
                <div className="hidden md:block lg:hidden">
                  <ContentLoader width="100%" height="95" viewBoxX="900" viewBoxY="95" className="mx-auto" />
                </div>
                <div className="hidden lg:block">
                  <ContentLoader width="100%" height="60" viewBoxX="490" viewBoxY="60" className="mx-auto" />
                </div>
              </>
          }

          {
            (gallery) ?
              <p className="box-container mt-4 text-sm md:text-base">
                {gallery.subdescription}
              </p>
            :
              <ContentLoader width="100%" height="60" viewBoxX="500" viewBoxY="60" className="mx-auto" />
          }
        </div>
      </div>
    </>
  );
};

export default ArtDetails;
