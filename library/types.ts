import { StyleProp, ViewStyle } from 'react-native';
import { RMotionProps } from 'rmotion';
import React from 'react';
import type { PortalProps } from 'react-native-portal-view/dist/Portal';
import type { AdapterProps } from 'rn-darkly/dist/darkly';
import {
  BounceType,
  FadeType,
  FlipType,
  SlideType,
  ZoomType,
} from 'rmotion/dist/animations/main';

type FadeInAnimations = `fade${FadeType}In`;
type FadeOutAnimations = `fade${FadeType}Out`;

type FlipInAnimations = `flip${FlipType}In`;
type FlipOutAnimations = `flip${FlipType}Out`;

type SlideInAnimations = `slide${SlideType}In`;
type SlideOutAnimations = `slide${SlideType}Out`;

type ZoomInAnimations = `zoom${ZoomType}In`;
type ZoomOutAnimations = `zoom${ZoomType}Out`;
type BounceInAnimations = `bounce${BounceType}In`;
type BounceOutAnimations = `bounce${BounceType}Out`;

type LightSpeedInAnimations = 'lightSpeedIn';
type LightSpeedOutAnimations = 'lightSpeedOut';

export type AnimationIn = `${
  | FadeInAnimations
  | SlideInAnimations
  | ZoomInAnimations
  | LightSpeedInAnimations
  | FlipInAnimations
  | BounceInAnimations}`;

export type AnimationOut = `${
  | FadeOutAnimations
  | SlideOutAnimations
  | ZoomOutAnimations
  | BounceOutAnimations
  | LightSpeedOutAnimations
  | FlipOutAnimations}`;

export type VerticalLayout = 'center' | 'top' | 'bottom';

export type HorizontalLayout = 'center' | 'left' | 'right';

export type AnimationPresupposition = Pick<
  RMotionProps,
  'from' | 'animate' | 'exit'
> & { style?: StyleProp<ViewStyle> };

export type ModalityProps = {
  // 模态框显示隐藏
  visible?: boolean;
  // 模态框状态已经改变
  onChange?: (visible: boolean) => void;
  // 模态框状态将要改变
  onWillChange?: (visible: boolean) => void;

  fullScreen?: boolean;

  useContextStore?: boolean;
};

export type ModalInternalProps = {
  onRequestClose?: () => void;
  onDidAnimate?: (exit: boolean) => void;
  onWillAnimate?: (exit: boolean) => void;

  // 是否渲染遮罩
  mask?: boolean;
  // 遮罩是否可点击关闭
  maskCloseable?: boolean;
  // 遮罩背景
  maskBackgroundColor?: string;

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

  children?: React.ReactNode;

  animationIn?: AnimationIn;
  animationOut?: AnimationOut;

  // 自定义动画
  animation?: AnimationPresupposition;
  // 自定义动画配置
  animationConf?: RMotionProps['config'];
  // 在模态框将要关闭的时候收起键盘
  keyboardDismissWillHide?: boolean;
  // backHandlerReaction?: boolean;

  backHandlerType?: 'disabled' | 'reaction' | 'none';

  forceDark?: boolean;
};

export type ModalHocProps = ModalityProps & PortalProps;

export type ComposeModalProps<P extends any> = ModalHocProps &
  Omit<P, 'onWillAnimate' | 'onDidAnimate' | 'onRequestClose'>;

export type ModalProps = AdapterProps<
  ComposeModalProps<ModalInternalProps>,
  ['style', 'contentContainerStyle', 'maskBackgroundColor', 'containerStyle']
>;
