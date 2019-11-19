/**
 * @Description : modal view
 * @Create on : 2019/11/18 22:07
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import {View, StyleSheet, Animated, TouchableWithoutFeedback, Dimensions} from 'react-native';
import {ModalViewProps} from './types';
import {getHorizontalLayout, getVerticalLayout, ifTrueFullScreen} from './utils';

const {width, height} = Dimensions.get('window');

export default class ModalView extends React.PureComponent<ModalViewProps> {
  static defaultProps: ModalViewProps = {
    horizontalLayout: 'fullScreen',
    verticalLayout: 'fullScreen',
    animateType: 'slide-up',
    mask: true,
    maskCloseable: true,
    backgroundColor: '#fff',
  };

  private getTransform(key: string, outputRange: number[]) {
    return {
      transform: [
        {
          [key]: this.props.animValue!.interpolate({
            inputRange: [0, 1],
            outputRange: outputRange,
          }),
        },
      ],
      opacity: this.props.animValue!,
    };
  }

  private getOpacity() {
    return {
      opacity: this.props.animValue!

      //   .interpolate({
      //   inputRange: [0, 1],
      //   outputRange: [0, 1],
      // }),
    }
  }

  private getInterpolate() {
    const {animateType} = this.props;
    const animateTypeArr = animateType!.split('-');

    switch (animateTypeArr[0]) {
      case 'fade':
        return this.getOpacity();
      case 'scale':
        switch (animateTypeArr[1]) {
          case 'in':
            return this.getTransform('scale', [3, 1]);
          case 'out':
            return this.getTransform('scale', [0, 1]);
          default:
            throw new Error('如果使用放大缩小动画，animateType 值必须是 "scale-in" 或者 "scale-out"');
        }
      case 'slide':
        switch (animateTypeArr[1]) {
          case 'up':
            return this.getTransform('translateY', [height, 0]);
          case 'down':
            return this.getTransform('translateY', [height * -1, 0]);
          case 'left':
            return this.getTransform('translateX', [width, 0]);
          case 'right':
            return this.getTransform('translateX', [width * -1, 0]);
          default:
            throw new Error('如果使用平移动画，animateType 值必须是 "slide-up"、"slide-down"、"slide-left" 或者 "slide-right"');
        }
      default:
        throw new Error('animateType 的值必须是 "scale-in" | "scale-out" | "slide-up" | "slide-down" | "slide-left" | "slice-right" | "fade"');
    }
  }

  private renderMask() {
    const {maskCloseable, mask, close} = this.props;
    if (!mask) {
      return null;
    }

    const maskComponent = <Animated.View pointerEvents="auto" style={[styles.mask, this.getOpacity()]}/>;

    if (!maskCloseable) {
      return maskComponent;
    }

    return (
      <View style={StyleSheet.absoluteFillObject} pointerEvents="auto">
        <TouchableWithoutFeedback onPress={close}>
          {maskComponent}
        </TouchableWithoutFeedback>
      </View>
    );
  }


  render() {
    const {
      children,
      horizontalLayout,
      verticalLayout,
      backgroundColor,
    } = this.props;

    return (
      <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
        {this.renderMask()}
        <Animated.View
          pointerEvents="box-none"
          style={[
            StyleSheet.absoluteFillObject,
            {
              alignItems: getHorizontalLayout(horizontalLayout!),
              justifyContent: getVerticalLayout(verticalLayout!),
            },
            this.getInterpolate(),
          ]}
        >
          <View
            pointerEvents="auto"
            style={[
              {
                backgroundColor,
                width: ifTrueFullScreen(horizontalLayout!),
                height: ifTrueFullScreen(verticalLayout!),
              },
            ]}
          >
            {children}
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, .2)',
  }
});
