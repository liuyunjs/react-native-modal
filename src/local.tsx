/**
 * @Description : modal
 * @Create on : 2019/11/21 21:59
 * @author liuyunjs
 * @version 0.0.6
 **/

import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  EventSubscription,
} from 'react-native';
import * as animatable from 'react-native-animatable';
import {
  initializeAnimations,
  getLayout,
  width,
  height,
  registorAnimation,
} from './utils';
import {LocalModalProps, LocalModalState} from './types';

// 重置 react-native-animatable 默认的动画
initializeAnimations();

export class LocalModal extends React.PureComponent<
  LocalModalProps,
  LocalModalState
> {
  static defaultProps: LocalModalProps = {
    visible: true,
    mask: true,
    maskBackgroundColor: 'rgba(0, 0, 0, .2)',
    maskCloseable: true,
    animationIn: 'slideInUp',
    animationOut: 'slideOutDown',
    animationInTiming: 300,
    animationOutTiming: 300,
    maskAnimationInTiming: 300,
    maskAnimationOutTiming: 300,
    useNativeDriver: true,
    deviceHeight: height,
    deviceWidth: width,
    avoidKeyboard: false,
    keyboardDismissWillHide: true,
    ifHideDestroy: true,
  };

  // 用于标识组件是否已卸载
  // 在使用全屏模态框的时候，在模态框关闭动画结束以后会进行模态框销毁操作
  // 此时不应该再setState
  private isUnmounted?: boolean;
  // 键盘弹出
  private keyboardDidShowListener?: EventSubscription;
  // 键盘收起
  private keyboardDidHideListener?: EventSubscription;
  // 键盘状态标识
  private keyboardShow?: boolean;

  // 遮罩
  private maskRef: React.RefObject<any>;
  // 内容
  private contentRef: React.RefObject<any>;

  // 正在动画
  private isTransition: boolean;

  private animationIn: string;
  private animationOut: string;

  constructor(props: LocalModalProps) {
    super(props);
    const {visible, animationIn, animationOut} = props;

    this.animationIn = registorAnimation(animationIn!);
    this.animationOut = registorAnimation(animationOut!);

    this.state = {
      visible,
      visibleProps: visible,
      mount: visible,
    };

    this.maskRef = React.createRef();
    this.contentRef = React.createRef();
    this.isTransition = false;
  }

  static getDerivedStateFromProps(
    nextProps: LocalModalProps,
    prevState: LocalModalState,
  ): LocalModalState | null {
    const {visible} = nextProps;

    // props 中的 visible 状态改变的时候同步到 state 中
    // 并且当下个 props 中的 visible 状态为true的时候应该要渲染出模态框，并且开始动画
    // 所以应该改变 mount state 的值
    if (visible !== prevState.visibleProps) {
      return {
        visibleProps: visible,
        visible,
        mount: visible || prevState.mount,
      };
    }

    return null;
  }

  componentDidMount() {
    // 如果需要组件去控制在模态框将要关闭的时候，有键盘弹出的话，就关闭键盘的时候
    // 应该监听键盘状态
    const {keyboardDismissWillHide} = this.props;

    if (keyboardDismissWillHide) {
      this.addKeyboardListener();
    }

    if (this.state.visible) {
      this.toggle();
    }
  }

  componentDidUpdate(prevProps: LocalModalProps, prevState: LocalModalState) {
    // 支持动态改变是否需要组件去控制键盘关闭
    const {keyboardDismissWillHide} = this.props;
    if (keyboardDismissWillHide !== prevProps.keyboardDismissWillHide) {
      keyboardDismissWillHide
        ? this.addKeyboardListener()
        : this.removeKeyboardListener();
    }
    const {visible} = this.state;

    if (visible !== prevState.visible) {
      this.toggle();
    }
  }

  componentWillUnmount() {
    // 标识组件卸载
    this.isUnmounted = true;
    // 执行移除键盘监听器
    this.removeKeyboardListener();
  }

  async toggle(): Promise<any> {
    if (this.isTransition) {
      // this.stop();
      // this.toggle(animated);
      return;
    }
    const {
      animationInTiming,
      animationOutTiming,
      maskAnimationInTiming,
      maskAnimationOutTiming,
    } = this.props;
    const {visible} = this.state;
    if (this.maskRef.current) {
      const toValue = this.choose(1, 0);
      this.maskRef.current.transitionTo(
        {
          opacity: toValue,
        },
        this.choose(maskAnimationInTiming!, maskAnimationOutTiming!),
      );
    }
    if (this.contentRef.current) {
      this.isTransition = true;
      const animation = this.choose(this.animationIn, this.animationOut);
      const animationTiming = this.choose(
        animationInTiming,
        animationOutTiming,
      );
      this.onAnimationBegin();
      await this.contentRef.current[animation](animationTiming);
      this.isTransition = false;
      if (this.state.visible !== visible) {
        return this.toggle();
      }
      this.onAnimationEnd();
    }
  }

  /**
   * 绑定键盘 收起/弹出 事件
   */
  private addKeyboardListener() {
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.onKeyboardDidHide,
    );
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.onKeyboardDidShow,
    );
  }

  /**
   * 移除键盘 收起/弹出 事件
   */
  private removeKeyboardListener() {
    this.keyboardDidShowListener && this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener && this.keyboardDidHideListener.remove();
    this.keyboardDidHideListener = undefined;
    this.keyboardDidShowListener = undefined;
  }

  /**
   * 标识键盘状态为收起
   */
  private onKeyboardDidHide = () => {
    this.keyboardShow = false;
  };

  /**
   * 标识键盘状态为弹出
   */
  private onKeyboardDidShow = () => {
    this.keyboardShow = true;
  };

  /**
   * 关闭模态框，会开启模态框关闭动画
   */
  private close = () => {
    this.setState({
      visible: false,
    });
  };

  /**
   * 模态框动画开始监听
   */
  private onAnimationBegin = () => {
    const {onWillChange, keyboardDismissWillHide} = this.props;
    const {visible} = this.state;

    // 执行模态框状态将要改变的监听器
    onWillChange && onWillChange(visible!);

    // 如果是将要关闭模态框
    // 以及当前键盘状态为打开
    // 并且需要我们在模态框将要关闭的时候收起键盘
    // 满足这三个条件的时候收起键盘
    if (!visible && this.keyboardShow && keyboardDismissWillHide) {
      Keyboard.dismiss();
    }
  };

  /**
   * 动画结束，此时模态框已完全打开或者收起
   */
  private onAnimationEnd = () => {
    const {visible} = this.state;
    const {onChange, ifHideDestroy} = this.props;
    // 执行监听器
    onChange && onChange(visible!);

    // 如果是关闭动画结束
    // 并且组件未卸载
    // 并且需要在关闭动画结束以后卸载
    // 将 mount state 设置为false
    if (!visible && !this.isUnmounted && ifHideDestroy) {
      this.setState({
        mount: false,
      });
    }
  };

  /**
   * 根据当前visible state 选择不同的值，比如动画时间 动画方式
   * @param visibleIn
   * @param visibleOut
   */
  private choose<T extends any>(visibleIn: T, visibleOut: T) {
    return this.state.visible ? visibleIn : visibleOut;
  }

  /**
   * 选择遮罩
   */
  private renderMask() {
    const {
      maskCloseable,
      mask,
      maskBackgroundColor,
      deviceWidth,
      deviceHeight,
      useNativeDriver,
    } = this.props;
    const {visible} = this.state;

    // 不需要渲染遮罩
    if (!mask) {
      return null;
    }

    // 遮罩组件
    const component = (
      <animatable.View
        ref={this.maskRef}
        // 在模态框关闭的时候设置不响应任何事件
        pointerEvents={visible ? 'auto' : 'none'}
        // 是否开启原生动画
        useNativeDriver={useNativeDriver}
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: maskBackgroundColor,
            width: deviceWidth,
            height: deviceHeight,
            opacity: 0,
          },
        ]}
      />
    );

    // 遮罩不需要相应点击关闭模态框
    if (!maskCloseable) {
      return component;
    }

    return (
      <TouchableWithoutFeedback onPress={this.close}>
        {component}
      </TouchableWithoutFeedback>
    );
  }

  /**
   * 渲染模态框的内容
   */
  private renderContent() {
    const {
      style,
      avoidKeyboard,
      children,
      verticalLayout,
      horizontalLayout,
    } = this.props;

    // 模态框内容
    const content = (
      <animatable.View
        ref={this.contentRef}
        // 容器本身不响应任何事件
        pointerEvents="box-none"
        style={[
          styles.content,
          style,
          {
            justifyContent: getLayout(verticalLayout),
            alignItems: getLayout(horizontalLayout),
          },
        ]}>
        {children}
      </animatable.View>
    );

    // 当模态框中的内容有输入框的时候开启此选项能自动在键盘弹出的时候讲内容推上去
    if (avoidKeyboard) {
      // TODO: 有输入框时内容滚动处理
      return (
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          pointerEvents="box-none">
          {content}
        </KeyboardAvoidingView>
      );
    }

    return content;
  }

  render() {
    const {mount} = this.state;

    return (
      mount && (
        <View pointerEvents="box-none" style={styles.container}>
          {this.renderMask()}
          {this.renderContent()}
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },

  content: {
    flex: 1,
  },
});
