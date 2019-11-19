/**
 * @Description : modal types
 * @Create on : 2019/11/18 22:10
 * @author liuyunjs
 * @version 0.0.1
 **/
import {ViewStyle, Animated} from 'react-native';

export type AnimateType = 'scale-in' | 'scale-out' | 'slide-up' | 'slide-down' | 'slide-left' | 'slice-right' | 'fade';

export type HorizontalLayout = 'center' | 'left' | 'right' | 'fullScreen';

export type VerticalLayout = 'center' | 'top' | 'bottom' | 'fullScreen';

type AnimProps = {
  animValue?: Animated.Value,
}

type ModalViewBaseProps = {
  horizontalLayout?: HorizontalLayout
  verticalLayout?: VerticalLayout
  animateType?: AnimateType,
  style?: ViewStyle,
  mask?: boolean,
  maskCloseable?: boolean,
  backgroundColor?: string,
}

export type ModalViewProps = AnimProps & ModalViewBaseProps & {
  close?: () => any
};

export type ModalActionProps = {
  visible?: boolean,
  onChange?: (visible: boolean) => any,
}

export type ModalProps = ModalViewBaseProps & ModalActionProps;

export type ModalState = {
  visible?: boolean,
  propsVisible?: boolean,
}
