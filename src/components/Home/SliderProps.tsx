import React, {
  FunctionComponent,
  Ref,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useSwiper } from "swiper/react";

const SliderProps = forwardRef((props, ref) => {
  const swiper = useSwiper();

  useImperativeHandle(ref, () => ({
    next() {
      swiper.slideNext();
    },
    previous() {
      swiper.slidePrev();
    },
  }));

  return <></>;
});

export default SliderProps;
