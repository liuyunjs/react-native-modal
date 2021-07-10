import React from 'react';
import { AnimatePresence } from 'rmotion';
import { Portal } from 'react-native-portal-view/lib/Portal';
import { useReactCallback } from '@liuyunjs/hooks/lib/useReactCallback';
import { useReactionState } from '@liuyunjs/hooks/lib/useReactionState';
import { useConst } from '@liuyunjs/hooks/lib/useConst';
import { ModalBaseWithOverlay } from './ModalBaseWithOverlay';
import { ModalProps } from './types';

export const Modal: React.FC<ModalProps> = ({
  visible: visibleInput,
  onChange,
  onWillChange,
  fabric,
  fullScreen,
  ...rest
}) => {
  const [visible, setVisible] = useReactionState(!!visibleInput);

  const onDidAnimate = useReactCallback((exit: boolean) => {
    onChange?.(!exit);
  });

  const onWillAnimate = useReactCallback((exit: boolean) => {
    onWillChange?.(!exit);
  });

  const onRequestClose = useConst(() => setVisible(false));

  const elem = (
    <AnimatePresence>
      {visible && (
        <ModalBaseWithOverlay
          {...rest}
          onWillAnimate={onWillAnimate}
          onDidAnimate={onDidAnimate}
          onRequestClose={onRequestClose}
        />
      )}
    </AnimatePresence>
  );

  if (!fullScreen) return elem;

  return <Portal>{elem}</Portal>;
};
