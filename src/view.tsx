/**
 * @Description : modal
 * @Create on : 2019/12/17 23:59
 * @author liuyunjs
 * @version 0.0.10
 **/

import * as React from 'react';
import { Keyboard, KeyboardAvoidingView, View, StyleSheet, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { Animation, CustomAnimation } from 'react-native-animatable';
import { getLayout } from './utils';

export type VerticalLayout = 'center' | 'top' | 'bottom';

export type HorizontalLayout = 'center' | 'left' | 'right';

export type ModalViewProps = {
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
  // 遮罩透明度
  maskOpacity?: number;
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
};

type ModalViewState = {
  visible?: boolean;
  visibleProps?: boolean;
};

export default class extends React.PureComponent<ModalViewProps, ModalViewState> {
  static defaultProps = {
    visible: true,
    mask: true,
    maskBackgroundColor: '#000',
    maskOpacity: 0.2,
    maskCloseable: true,
    animationIn: 'slideInUp',
    animationOut: 'slideOutDown',
    animationInTiming: 300,
    animationOutTiming: 300,
    maskAnimationInTiming: 300,
    maskAnimationOutTiming: 300,
    useNativeDriver: true,
    avoidKeyboard: false,
    keyboardDismissWillHide: true,
  };

  private keyboardShow: boolean = false;
  private keyboardWillHideListener: any;
  private keyboardWillShowListener: any;

  state: ModalViewState = {};

  static getDerivedStateFromProps(nextProps: ModalViewProps, prevState: ModalViewState) {
    const { visible } = nextProps;

    if (visible !== prevState.visibleProps) {
      return {
        visible,
        visibleProps: visible,
      };
    }

    return null;
  }

  componentDidMount() {
    // 如果需要组件去控制在模态框将要关闭的时候，有键盘弹出的话，就关闭键盘的时候
    // 应该监听键盘状态
    const { keyboardDismissWillHide } = this.props;

    if (keyboardDismissWillHide) {
      this.addKeyboardListener();
    }
  }

  componentDidUpdate(prevProps: ModalViewProps) {
    // 支持动态改变是否需要组件去控制键盘关闭
    const { keyboardDismissWillHide } = this.props;
    if (keyboardDismissWillHide !== prevProps.keyboardDismissWillHide) {
      keyboardDismissWillHide ? this.addKeyboardListener() : this.removeKeyboardListener();
    }
  }

  componentWillUnmount() {
    // 执行移除键盘监听器
    this.removeKeyboardListener();
  }

  /**
   * 绑定键盘 收起/弹出 事件
   */
  private addKeyboardListener() {
    this.keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this.onKeyboardWillHide,
    );
    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this.onKeyboardWillShow,
    );
  }

  /**
   * 移除键盘 收起/弹出 事件
   */
  private removeKeyboardListener() {
    this.keyboardWillShowListener && this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener && this.keyboardWillHideListener.remove();
    this.keyboardWillShowListener = undefined;
    this.keyboardWillHideListener = undefined;
  }

  /**
   * 标识键盘状态为收起
   */
  private onKeyboardWillHide = () => {
    this.keyboardShow = false;
  };

  /**
   * 标识键盘状态为弹出
   */
  private onKeyboardWillShow = () => {
    this.keyboardShow = true;
  };

  private maybeTrigger(name: string, ...args: any[]) {
    const fn = (this.props as any)[name];
    fn && fn(...args);
  }

  private onDidShow = () => this.maybeTrigger('onChange', true);
  private onDidHide = () => this.maybeTrigger('onChange', false);
  private onWillShow = () => this.maybeTrigger('onWillChange', true);
  private onWillHide = () => {
    this.maybeTrigger('onWillChange', false);

    // 如果是将要关闭模态框
    // 以及当前键盘状态为打开
    // 并且需要我们在模态框将要关闭的时候收起键盘
    // 满足这三个条件的时候收起键盘
    if (!this.keyboardShow && this.props.keyboardDismissWillHide) {
      Keyboard.dismiss();
    }
  };

  private onBackdropPress = () => {
    if (!this.props.maskCloseable) {
      return;
    }

    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      verticalLayout,
      horizontalLayout,
      style,
      children,
      avoidKeyboard,
      maskAnimationInTiming,
      maskAnimationOutTiming,
      mask,
      maskBackgroundColor,

      maskOpacity,
      ...restProps
    } = this.props;

    const content = (
      <View
        style={[
          styles.container,
          {
            justifyContent: getLayout(verticalLayout),
            alignItems: getLayout(horizontalLayout),
          },
          style,
        ]}
      >
        {children}
      </View>
    );

    return (
      <Modal
        {...restProps}
        isVisible={this.state.visible!}
        hideModalContentWhileAnimating
        onBackdropPress={this.onBackdropPress}
        hasBackdrop={mask}
        backdropColor={maskBackgroundColor}
        backdropOpacity={maskOpacity}
        backdropTransitionInTiming={maskAnimationInTiming}
        backdropTransitionOutTiming={maskAnimationOutTiming}
        style={styles.modal}
        coverScreen={false}
        onModalHide={this.onDidHide}
        onModalShow={this.onDidShow}
        onModalWillHide={this.onWillHide}
        onModalWillShow={this.onWillShow}
      >
        {avoidKeyboard ? (
          <KeyboardAvoidingView style={styles.container}>{content}</KeyboardAvoidingView>
        ) : (
          content
        )}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    flex: 1,
  },

  container: {
    flex: 1,
  },
});
