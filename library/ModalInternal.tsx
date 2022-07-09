import * as React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Mask } from 'rn-mask';
import type { DarklyProps } from 'rn-darkly/dist/darkly';
import { getLayout } from './utils';
import { ModalInternalProps } from './types';
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
        if (backHandlerType === 'reaction') {
          onRequestClose?.();
        }
        return true;
      });
      return () => handler.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backHandlerType]);
};

export const Modal: React.FC<ModalInternalProps & DarklyProps> = ({
  mask,
  maskBackgroundColor,
  maskCloseable,
  avoidKeyboard,
  horizontalLayout,
  verticalLayout,
  style,
  onRequestClose,
  keyboardDismissWillHide,
  backHandlerType,
  containerStyle,
  contentContainerStyle,
  forceDark,
  children,
  animationIn,
  animationOut,
  maskAnimationOut,
  maskAnimationIn,
}) => {
  const isShowRef = useKeyboardShowRef(!!keyboardDismissWillHide);

  React.useEffect(() => {
    return () => {
      if (isShowRef.current) {
        isShowRef.current = false;
        Keyboard.dismiss();
      }
    };
  }, [isShowRef]);

  if (Platform.OS === 'android') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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

  content = (
    <Animated.View
      entering={animationIn}
      exiting={animationOut}
      pointerEvents="box-none"
      style={[styles.container, contentContainerStyle]}>
      {avoidKeyboard ? (
        <KeyboardAvoidingView pointerEvents="box-none" style={styles.container}>
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </Animated.View>
  );

  return (
    <View style={[styles.root, containerStyle]} pointerEvents="box-none">
      {mask && (
        <Mask
          animationIn={maskAnimationIn}
          animationOut={maskAnimationOut}
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

Modal.defaultProps = {
  animationIn: SlideInDown,
  animationOut: SlideOutDown,
  mask: true,
  maskCloseable: true,
  verticalLayout: 'bottom',
  backHandlerType: 'reaction',
};
