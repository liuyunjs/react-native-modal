import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';
import { RMotionView } from 'rmotion';
import { Overlay } from './Overlay';
import { getLayout } from './utils';
import { slideDown } from './animations';
import { ModalBaseWithOverlayProps } from './types';
import { styles } from './styles';

const useKeyboardShowRef = (keyboardDismissWillHide: boolean) => {
  const isShowRef = React.useRef(false);
  React.useEffect(() => {
    if (keyboardDismissWillHide) {
      const str = Platform.select({ ios: 'Will', default: 'Did' });

      // @ts-ignore
      const hideHandler = Keyboard.addListener(`keyboard${str}Hide`, () => {
        isShowRef.current = false;
      });

      // @ts-ignore
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
  onRequestClose: () => void;
  backHandlerType?: ModalBaseWithOverlayProps['backHandlerType'];
}) => {
  React.useEffect(() => {
    if (backHandlerType && backHandlerType !== 'none') {
      const handler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (backHandlerType === 'reaction') onRequestClose();
        return true;
      });
      return () => handler.remove();
    }
  }, [backHandlerType]);
};

export const ModalBaseWithOverlay: React.FC<ModalBaseWithOverlayProps> = ({
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
  z = 1,
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

  const content = (
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

  return (
    <View style={[styles.root, { zIndex: z }]} pointerEvents="box-none">
      {mask && (
        <Overlay
          config={animationConf}
          tintColor={maskBackgroundColor}
          onPress={onRequestClose}
          disabled={!maskCloseable}
        />
      )}

      <RMotionView
        onWillAnimate={onWillAnimateCallback}
        config={animationConf}
        onDidAnimate={onDidAnimate}
        pointerEvents="box-none"
        style={styles.container}
        exit={animation!.exit || animation!.from}
        from={animation!.from}
        animate={animation!.animate}>
        {avoidKeyboard ? (
          <KeyboardAvoidingView
            pointerEvents="box-none"
            style={styles.container}>
            {content}
          </KeyboardAvoidingView>
        ) : (
          content
        )}
      </RMotionView>
    </View>
  );
};

ModalBaseWithOverlay.defaultProps = {
  animation: slideDown,
  mask: true,
  maskCloseable: true,
  verticalLayout: 'bottom',
  backHandlerType: 'reaction',
};
