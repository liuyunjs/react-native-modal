import * as React from 'react';
import { DefaultStore, Portal, PortalStore } from 'react-native-portal-view';
import { useReactionState } from '@liuyunjs/hooks/lib/useReactionState';
import { useReactCallback } from '@liuyunjs/hooks/lib/useReactCallback';
import type { DarklyProps } from 'rn-darkly/dist/darkly';
import { extend } from './extend';
import { ModalityProps } from './types';

export const withModal = <T extends {}>(
  Component: React.ComponentType<T>,
  store: PortalStore = DefaultStore,
) => {
  const Modal: React.FC<ModalityProps & DarklyProps & T> = ({
    visible: visibleInput,
    onChange,
    fullScreen = true,
    useCustomStore = true,
    namespace,
    ...rest
  }) => {
    const [visible, setVisible] = useReactionState(!!visibleInput);

    const onRequestClose = useReactCallback(() => {
      onChange?.(false);
      setVisible(false);
    });

    const elem = visible ? (
      <Component {...(rest as any)} onRequestClose={onRequestClose} />
    ) : null;

    return fullScreen ? (
      <Portal
        useCustomStore={useCustomStore as true}
        store={store}
        namespace={namespace}>
        {elem}
      </Portal>
    ) : (
      elem
    );
  };

  Modal.displayName = `withModal(${
    Component.displayName || Component.name || 'Component'
  })`;

  return Object.assign(Modal, extend(store, Component));
};
