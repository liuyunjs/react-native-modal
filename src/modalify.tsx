import React from 'react';
import { AnimatePresence } from 'rmotion';
import { Portal } from 'react-native-portal-view/lib/Portal';
import { useReactCallback } from '@liuyunjs/hooks/lib/useReactCallback';
import { useReactionState } from '@liuyunjs/hooks/lib/useReactionState';
import { useConst } from '@liuyunjs/hooks/lib/useConst';
import { useWillMount } from '@liuyunjs/hooks/lib/useWillMount';
import { ModalifyProps } from './types';

let modalIndex = 0,
  zIndex = 1;
export const useIndexManager = () => {
  React.useEffect(
    () => () => {
      modalIndex--;
      if (modalIndex <= 0) {
        zIndex = 1;
      }
    },
    [],
  );

  return useWillMount(() => {
    modalIndex++;
    return zIndex++;
  });
};

export const modalify = <T extends any>(Component: React.ComponentType<T>) => {
  function Modal({
    visible: visibleInput,
    onChange,
    onWillChange,
    fullScreen = true,
    ...rest
  }: ModalifyProps &
    Omit<T, 'onWillAnimate' | 'onDidAnimate' | 'onRequestClose' | 'zIndex'>) {
    const [visible, setVisible] = useReactionState(!!visibleInput);

    const onDidAnimate = useReactCallback((exit: boolean) => {
      onChange?.(!exit);
    });

    const onWillAnimate = useReactCallback((exit: boolean) => {
      onWillChange?.(!exit);
    });

    const onRequestClose = useConst(() => setVisible(false));

    const zIndex = useIndexManager();

    const elem = (
      <AnimatePresence>
        {visible && (
          // @ts-ignore
          <Component
            {...rest}
            zIndex={zIndex}
            onDidAnimate={onDidAnimate}
            onRequestClose={onRequestClose}
            onWillAnimate={onWillAnimate}
          />
        )}
      </AnimatePresence>
    );

    if (!fullScreen) return elem;

    return <Portal>{elem}</Portal>;
  }

  Modal.displayName = `modalify(${
    Component.displayName || Component.name || 'Component'
  })`;

  return Modal;
};
