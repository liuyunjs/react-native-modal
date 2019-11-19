/**
 * @Description : modal action
 * @Create on : 2019/11/18 22:37
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import {Animated} from 'react-native';
import ModalView from './view';
import {ModalProps, ModalState} from './types';

export default class extends React.PureComponent<ModalProps, ModalState> {
  private animValue: Animated.Value;
  private anim?: Animated.CompositeAnimation;

  static defaultProps: ModalProps = {
    visible: false,
  };

  constructor(props: ModalProps) {
    super(props);
    const visible = !!props.visible;
    this.animValue = new Animated.Value(0);
    this.createAnimate(1);

    this.state = {
      visible,
      propsVisible: visible,
    };
  }

  static getDerivedStateFromProps(nextProps: ModalProps, prevState: ModalState): ModalState | null {
    const {visible} = nextProps;
    if (visible !== prevState.propsVisible) {
      return {
        visible,
        propsVisible: visible,
      };
    }

    return null;
  }

  componentDidMount() {
    if (this.state.visible) {
      this.startAnimate();
    }
  }

  componentDidUpdate(prevProps: ModalProps, prevState: ModalState) {
    const {visible} = this.state;

    if (visible !== prevState.visible) {
      this.createAnimate(+!!visible);
      this.startAnimate();
    }
  }

  componentWillUnmount() {
    this.anim!.stop();
  }

  close = () => {
    this.setState({
      visible: false,
    });
  };

  private startAnimate() {
    this.anim!.start(this.onAnimationEnd);
  }

  private onAnimationEnd = () => {
    const {onChange} = this.props;
    onChange && onChange(this.state.visible!);
  };

  private createAnimate(toValue: number) {
    this.anim = Animated.spring(
      this.animValue,
      {
        toValue,
        useNativeDriver: true,
        friction: 10,
      }
    );
  }

  render() {
    return (
      <ModalView
        {...this.props}
        close={this.close}
        animValue={this.animValue}
      />
    );
  }
}
