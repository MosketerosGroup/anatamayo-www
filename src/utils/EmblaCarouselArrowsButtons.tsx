import React, {
  type ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState
} from 'react'
import { type EmblaCarouselType } from 'embla-carousel'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

type PropType = ComponentPropsWithRef<'button'>

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--prev cursor-pointer w-10 px-1 hidden lg:block xl:w-12"
      type="button"
      {...restProps}
    >
      <svg className="embla__button__svg" version="1.1" viewBox="0 0 532 532" xmlns="http://www.w3.org/2000/svg">
        <circle cx="266" cy="266" r="266" fill="#808080"/>
        <path transform="matrix(-1.1959 0 0 1.1959 420.01 77.644)" d="m305.66 157.5-124.66 71.024-123.84 72.445 0.82053-143.47-0.82053-143.47 123.84 72.445z" fill="#fff"/>
      </svg>

      {children}
    </button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--next cursor-pointer w-10 px-1 hidden lg:block xl:w-12"
      type="button"
      {...restProps}
    >
      <svg className="embla__button__svg" version="1.1" viewBox="0 0 532 532" xmlns="http://www.w3.org/2000/svg">
        <circle cx="266" cy="266" r="266" fill="#808080"/>
        <path transform="matrix(1.1959 0 0 1.1959 85.156 77.644)" d="m305.66 157.5-124.66 71.024-123.84 72.445 0.82053-143.47-0.82053-143.47 123.84 72.445z" fill="#fff"/>
      </svg>


      {children}
    </button>
  )
}
