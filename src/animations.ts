import { Dimensions } from 'react-native';
import { AnimationPresupposition } from 'rmotion';

const { width, height } = Dimensions.get('window');

export const fade: AnimationPresupposition = {
  from: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const fadeDown: AnimationPresupposition = {
  from: {
    opacity: 0,
    translateY: 100,
  },
  animate: {
    opacity: 1,
    translateY: 0,
  },
};
export const fadeTop: AnimationPresupposition = {
  from: {
    opacity: 0,
    translateY: -100,
  },
  animate: {
    opacity: 1,
    translateY: 0,
  },
};
export const fadeLeft: AnimationPresupposition = {
  from: {
    opacity: 0,
    translateX: -100,
  },
  animate: {
    opacity: 1,
    translateX: 0,
  },
};
export const fadeRight: AnimationPresupposition = {
  from: {
    opacity: 0,
    translateX: -100,
  },
  animate: {
    opacity: 1,
    translateX: 0,
  },
};

/* =========== slide =============*/
export const slideDown: AnimationPresupposition = {
  from: {
    translateY: height,
  },
  animate: {
    translateY: 0,
  },
};

export const slideTop: AnimationPresupposition = {
  from: {
    translateY: -height,
  },
  animate: {
    translateY: 0,
  },
};

export const slideLeft: AnimationPresupposition = {
  from: {
    translateX: -width,
  },
  animate: { translateX: 0 },
};

export const slideRight: AnimationPresupposition = {
  from: {
    translateX: width,
  },
  animate: { translateX: 0 },
};

/* =========== zoom =============*/
export const zoom: AnimationPresupposition = {
  from: {
    scale: 0,
  },
  animate: {
    scale: 1,
  },
};
