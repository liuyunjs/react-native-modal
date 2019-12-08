/**
 * @Description : modal types
 * @Create on : 2019/11/18 22:10
 * @author liuyunjs
 * @version 0.0.1
 **/

import {ViewStyle} from 'react-native';
import {Animation, CustomAnimation} from 'react-native-animatable';

export type HorizontalLayout = 'center' | 'left' | 'right';

export type VerticalLayout = 'center' | 'top' | 'bottom';

export interface LocalModalProps {
  // 模态框显示隐藏
  visible?: boolean;
  // 模态框状态已经改变
  onChange?: (visible: boolean) => any;
  // 模态框状态将要改变
  onWillChange?: (visible: boolean) => any;
  // 进场动画
  animationIn?: Animation | CustomAnimation;
  // 出场动画
  animationOut?: Animation | CustomAnimation;
  // 进场动画时间
  animationInTiming?: number;
  // 出场动画时间
  animationOutTiming?: number;
  // 遮罩进场动画时间
  maskAnimationInTiming?: number;
  // 遮罩出场动画时间
  maskAnimationOutTiming?: number;
  // 是否渲染遮罩
  mask?: boolean;
  // 遮罩是否可点击关闭
  maskCloseable?: boolean;
  // 遮罩背景
  maskBackgroundColor?: string;
  style?: ViewStyle;
  // 是否使用原生动画
  useNativeDriver?: boolean;
  // 设备宽度
  deviceWidth?: number;
  // 设备高度
  deviceHeight?: number;
  // 是否响应键盘弹出收起时，自动推动内容位置
  avoidKeyboard?: boolean;
  // 垂直方向内容位置 上 中 下
  verticalLayout?: VerticalLayout;
  // 水平方向内容位置 左中右
  horizontalLayout?: HorizontalLayout;
  // 在模态框将要关闭的时候收起键盘
  keyboardDismissWillHide?: boolean;
  // 模态框关闭之后销毁模态框中的内容
  ifHideDestroy?: boolean;
}

export interface LocalModalState {
  visible?: boolean;
  visibleProps?: boolean;
  mount?: boolean;
}

export interface ModalProps extends LocalModalProps {
  // 是否全屏
  fullScreen?: boolean;
  id?: string;
  prefix?: string;
}
