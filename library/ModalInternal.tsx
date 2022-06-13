import * as React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';
import { RMotionView } from 'rmotion';
import { Mask } from 'rn-mask';
import { darkly } from 'rn-darkly';
import { getLayout } from './utils';
import { slideDown } from './animations';
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
}) => {
  const isShowRef = useKeyboardShowRef(!!keyboardDismissWillHide);

  const onWillAnimateCallback = React.useCallback(
    (exit: boolean) => {
      if (exit) {
        if (isShowRef.current) {
          isShowRef.current = false;
          Keyboard.dismiss();
        }
      }
      onWillAnimate?.(exit);
    },
    [onWillAnimate],
  );

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

  content = (
    <RMotionView
      onWillAnimate={onWillAnimateCallback}
      config={animationConf}
      onDidAnimate={onDidAnimate}
      pointerEvents="box-none"
      style={[styles.container, contentContainerStyle]}
      exit={animation!.exit || animation!.from}
      from={animation!.from}
      animate={animation!.animate}>
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
          forceDark={forceDark}
          config={animationConf}
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
  animation: slideDown,
  mask: true,
  maskCloseable: true,
  verticalLayout: 'bottom',
  backHandlerType: 'reaction',
};

export const DarklyModalInternal = React.memo(
  darkly(
    ModalInternal,
    'style',
    'containerStyle',
    'contentContainerStyle',
    'maskBackgroundColor',
  ),
);
