import { StyleProp, ViewStyle } from 'react-native';
import {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  Keyframe,
} from 'react-native-reanimated';
import type { AdapterProps, DarklyProps } from 'rn-darkly/dist/darkly';

export type VerticalLayout = 'center' | 'top' | 'bottom';

export type HorizontalLayout = 'center' | 'left' | 'right';

export type ModalityProps = {
  // 模态框显示隐藏
  visible?: boolean;
  // 模态框状态改变
  onChange?: (visible: boolean) => void;
  fullScreen?: boolean;
  namespace?: string;
  useCustomStore?: boolean;
};

export type ModalInternalProps = {
  onRequestClose?: () => void;

  // 遮罩透明度
  // maskOpacity?: number;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  // 是否响应键盘弹出收起时，自动推动内容位置
  avoidKeyboard?: boolean;
  // 垂直方向内容位置 上 中 下
  verticalLayout?: VerticalLayout;
  // 水平方向内容位置 左中右
  horizontalLayout?: HorizontalLayout;
  animationIn?:
    | BaseAnimationBuilder
    | typeof BaseAnimationBuilder
    | EntryExitAnimationFunction
    | Keyframe;
  animationOut?:
    | BaseAnimationBuilder
    | typeof BaseAnimationBuilder
    | EntryExitAnimationFunction
    | Keyframe;
  // 在模态框将要关闭的时候收起键盘
  keyboardDismissWillHide?: boolean;

  backHandlerType?: 'disabled' | 'reaction' | 'none';

  // 是否渲染遮罩
  mask?: boolean;
  // 遮罩是否可点击关闭
  maskCloseable?: boolean;
  // 遮罩背景
  maskBackgroundColor?: string;
  maskAnimationIn?:
    | BaseAnimationBuilder
    | typeof BaseAnimationBuilder
    | EntryExitAnimationFunction
    | Keyframe;
  maskAnimationOut?:
    | BaseAnimationBuilder
    | typeof BaseAnimationBuilder
    | EntryExitAnimationFunction
    | Keyframe;
};

export type ModalProps = DarklyProps &
  AdapterProps<
    ModalInternalProps,
    ['style', 'contentContainerStyle', 'maskBackgroundColor', 'containerStyle']
  > &
  ModalityProps &
  ModalInternalProps;
