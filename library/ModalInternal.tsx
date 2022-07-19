import * as React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';
import { RMotionProps, RMotionView } from 'rmotion';
import * as animations from 'rmotion/dist/animations/main';
import { Mask } from 'rn-mask';
import { darkly } from 'rn-darkly';
import { getLayout } from './utils';
import { AnimationPresupposition, ModalInternalProps } from './types';
import { styles } from './styles';

const useKeyboardShowRef = (keyboardDismissWillHide: boolean) => {
  const isShowRef = React.useRef(false);
  React.useEffect(() => {
    if (keyboardDismissWillHide) {
      const str = Platform.select({
        ios: 'Will' as const,
        default: 'Did' as const,
      });

      const hideHandler = Keyboard.addListener(`keyboard${str}Hide`, () => {
        isShowRef.current = false;
      });

      const showHandler = Keyboard.addListener(`keyboard${str}Show`, () => {
        isShowRef.current = true;
      });

      return () => {
        hideHandler.remove();
        showHandler.remove();
      };
    }
  }, [keyboardDismissWillHide]);

  return isShowRef;
};

const useBackHandler = ({
  onRequestClose,
  backHandlerType,
}: {
  onRequestClose?: () => void;
  backHandlerType?: ModalInternalProps['backHandlerType'];
}) => {
  React.useEffect(() => {
    if (backHandlerType && backHandlerType !== 'none') {
      const handler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (backHandlerType === 'reaction') onRequestClose?.();
        return true;
      });
      return () => handler.remove();
    }
  }, [backHandlerType]);
};

export const ModalInternal: React.FC<ModalInternalProps> = ({
  mask,
  maskBackgroundColor,
  maskCloseable,
  animationConf,
  animation,
  avoidKeyboard,
  horizontalLayout,
  verticalLayout,
  style,
  children,
  onRequestClose,
  onWillAnimate,
  onDidAnimate,
  keyboardDismissWillHide,
  backHandlerType,
  containerStyle,
  contentContainerStyle,
  forceDark,
  animationIn,
  animationOut,
}) => {
  const isShowRef = useKeyboardShowRef(!!keyboardDismissWillHide);

  const onWillAnimateCallback = (exit: boolean) => {
    if (exit) {
      if (isShowRef.current) {
        isShowRef.current = false;
        Keyboard.dismiss();
      }
    }
    onWillAnimate?.(exit);
  };

  if (Platform.OS === 'android') {
    useBackHandler({
      onRequestClose,
      backHandlerType,
    });
  }

  let content = (
    <View
      pointerEvents="box-none"
      style={[
        styles.container,
        {
          justifyContent: getLayout(verticalLayout),
          alignItems: getLayout(horizontalLayout),
        },
        style,
      ]}>
      {children}
    </View>
  );

  const animationProps: RMotionProps = {};
  if (animation) {
    animationProps.keyframes = false;
    // @ts-ignore
    animationProps.exit = animation.exit || animation.from;
    // @ts-ignore
    animationProps.from = animation.from;
    // @ts-ignore
    animationProps.animate = animation.animate;
  }

  if (!animationProps.animate) {
    // @ts-ignore
    animationProps.keyframes = true;
    delete animationProps.from;
    // @ts-ignore
    animationProps.animate = animations[animationIn!];
  }

  if (!animationProps.exit) {
    // @ts-ignore
    animationProps.exit = animations[animationOut!];
  }

  content = (
    <RMotionView
      {...animationProps}
      {...animationConf}
      onWillAnimate={onWillAnimateCallback}
      onDidAnimate={onDidAnimate}
      pointerEvents="box-none"
      style={[styles.container, contentContainerStyle]}>
      {avoidKeyboard ? (
        <KeyboardAvoidingView pointerEvents="box-none" style={styles.container}>
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </RMotionView>
  );

  return (
    <View style={[styles.root, containerStyle]} pointerEvents="box-none">
      {mask && (
        <Mask
          {...animationConf}
          forceDark={forceDark}
          tintColor={maskBackgroundColor}
          onPress={onRequestClose}
          disabled={!maskCloseable}
        />
      )}
      {content}
    </View>
  );
};

ModalInternal.defaultProps = {
  animationIn: 'fadeInDownBig',
  animationOut: 'fadeOutDownBig',
  mask: true,
  maskCloseable: true,
  verticalLayout: 'bottom',
  backHandlerType: 'reaction',
};

export const DarklyModalInternal = darkly(
  ModalInternal,
  'style',
  'containerStyle',
  'contentContainerStyle',
  'maskBackgroundColor',
);
