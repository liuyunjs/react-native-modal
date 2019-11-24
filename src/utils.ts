/**
 * @Description : modal utils
 * @Create on : 2019/11/18 22:22
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as animatable from 'react-native-animatable';
import {Dimensions} from 'react-native';
import {CustomAnimation} from 'react-native-animatable';

import {HorizontalLayout, VerticalLayout} from './types';

/**
 * 解析模态框中的内容的位置设置成所对应的样式
 * @param layout
 */
export function getLayout(layout?: HorizontalLayout | VerticalLayout): 'flex-end' | 'flex-start' | 'center' | undefined {
  switch (layout) {
    case 'left':
    case 'top':
      return 'flex-start';
    case 'right':
    case 'bottom':
      return 'flex-end';
    default:
      return layout;
  }
}

export const {width, height} = Dimensions.get('window');

export const initializeAnimations = () => {
  // Since react-native-animatable applies by default a margin of 100 to its
  // sliding animation, we reset them here overriding the margin to 0.
  const animationDefinitions: Record<string, CustomAnimation> = {
    slideInDown: makeSlideTranslation('translateY', -height, 0),
    slideInUp: makeSlideTranslation('translateY', height, 0),
    slideInLeft: makeSlideTranslation('translateX', -width, 0),
    slideInRight: makeSlideTranslation('translateX', width, 0),
    slideOutDown: makeSlideTranslation('translateY', 0, height),
    slideOutUp: makeSlideTranslation('translateY', 0, -height),
    slideOutLeft: makeSlideTranslation('translateX', 0, -width),
    slideOutRight: makeSlideTranslation('translateX', 0, width),
  };

  animatable.initializeRegistryWithDefinitions(animationDefinitions);
};

export const makeSlideTranslation = (
  translationType: string,
  fromValue: number,
  toValue: number,
) => ({
  from: {
    [translationType]: fromValue,
  },
  to: {
    [translationType]: toValue,
  },
});
