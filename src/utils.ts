/**
 * @Description : modal utils
 * @Create on : 2019/11/18 22:22
 * @author liuyunjs
 * @version 0.0.1
 **/

import {HorizontalLayout, VerticalLayout} from './types';

export function getHorizontalLayout(layout: HorizontalLayout): string {
  switch (layout) {
    case 'left':
      return 'flex-start';
    case 'right':
      return 'flex-end';
    case 'fullScreen':
      return 'stretch';
    default:
      return layout;
  }
}

export function getVerticalLayout(layout: VerticalLayout): string | undefined {
  switch (layout) {
    case 'top':
      return 'flex-start';
    case 'bottom':
      return 'flex-end';
    case 'fullScreen':
      return;
    default:
      return layout;
  }
}

export function ifTrueFullScreen(layout: HorizontalLayout | VerticalLayout): string | undefined {
  switch (layout) {
    case 'fullScreen':
      return '100%';
    default:
      return;
  }
}
