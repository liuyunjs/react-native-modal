import { StyleProp, ViewStyle } from 'react-native';
import { AnimationProps, AnimationPresupposition } from 'rmotion';
import React from 'react';
import { Portal } from 'react-native-portal-view';

export type VerticalLayout = 'center' | 'top' | 'bottom';

export type HorizontalLayout = 'center' | 'left' | 'right';

export type ModalifyProps = {
  // 模态框显示隐藏
  visible?: boolean;
  // 模态框状态已经改变
  onChange?: (visible: boolean) => void;
  // 模态框状态将要改变
  onWillChange?: (visible: boolean) => void;

  fullScreen?: boolean;
};

export type ModalBaseWithOverlayProps = {
  onRequestClose: () => void;
  onDidAnimate?: (exit: boolean) => void;
  onWillAnimate?: (exit: boolean) => void;
  z?: number;

  // 是否渲染遮罩
  mask?: boolean;
  // 遮罩是否可点击关闭
  maskCloseable?: boolean;
  // 遮罩背景
  maskBackgroundColor?: string;
  // 遮罩透明度
  // maskOpacity?: number;
  style?: StyleProp<ViewStyle>;
  // 是否响应键盘弹出收起时，自动推动内容位置
  avoidKeyboard?: boolean;
  // 垂直方向内容位置 上 中 下
  verticalLayout?: VerticalLayout;
  // 水平方向内容位置 左中右
  horizontalLayout?: HorizontalLayout;

  children?: React.ReactNode;

  // 自定义动画
  animation?: AnimationPresupposition;
  // 自定义动画配置
  animationConf?: AnimationProps['config'];
  // 在模态框将要关闭的时候收起键盘
  keyboardDismissWillHide?: boolean;
  // backHandlerReaction?: boolean;

  backHandlerType?: 'disabled' | 'reaction' | 'none';
};

export type ModalProps = Omit<
  ModalBaseWithOverlayProps,
  'onDidAnimate' | 'onRequestClose' | 'onWillAnimate'
> &
  ModalifyProps;
