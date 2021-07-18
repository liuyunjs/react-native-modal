import React from 'react';
import { AnimatePresence } from 'rmotion';
import { Portal, PortalProps } from 'react-native-portal-view/lib/Portal';
import { useReactCallback } from '@liuyunjs/hooks/lib/useReactCallback';
import { useReactionState } from '@liuyunjs/hooks/lib/useReactionState';
import { useConst } from '@liuyunjs/hooks/lib/useConst';
import { modalZIndex } from './modalZIndex';
import { ModalifyProps } from './types';

export const modality = <T extends any>(Component: React.ComponentType<T>) => {
  function Modal({
    visible: visibleInput,
    onChange,
    onWillChange,
    fullScreen = true,
    legacy,
    // @ts-ignore
    namespace,
    // @ts-ignore
    override,
    ...rest
  }: ModalifyProps &
    PortalProps &
    Omit<T, 'onWillAnimate' | 'onDidAnimate' | 'onRequestClose'>) {
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
          // @ts-ignore
          <Component
            {...rest}
            onDidAnimate={onDidAnimate}
            onRequestClose={onRequestClose}
            onWillAnimate={onWillAnimate}
          />
        )}
      </AnimatePresence>
    );

    if (!fullScreen) return elem;

    return (
      // @ts-ignore
      <Portal legacy={legacy} namespace={namespace} override={override}>
        {elem}
      </Portal>
    );
  }

  Modal.displayName = `modalify(${
    Component.displayName || Component.name || 'Component'
  })`;

  return modalZIndex(Modal);
};
