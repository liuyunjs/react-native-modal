/**
 * @Description : modal utils
 * @Create on : 2019/11/18 22:22
 * @author liuyunjs
 * @version 0.0.1
 * @Update on : 2021/07/03 09:56
 **/

import { HorizontalLayout, VerticalLayout } from './types';

/**
 * 解析模态框中的内容的位置设置成所对应的样式
 * @param layout
 */
export function getLayout(
  layout?: HorizontalLayout | VerticalLayout,
): 'flex-end' | 'flex-start' | 'center' | undefined {
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
