import * as React from 'react';
import { AnimatePresence } from 'rmotion';
import {
  DefaultStore,
  Portal,
  PortalStore,
  PortalStoreContext,
} from 'react-native-portal-view';
import { useReactCallback } from '@liuyunjs/hooks/lib/useReactCallback';
import { useReactionState } from '@liuyunjs/hooks/lib/useReactionState';
import { useConst } from '@liuyunjs/hooks/lib/useConst';
import { ComposeModalProps } from './types';
import { extendInternal } from './extend';

export const withModal = <T extends {}>(
  Component: React.ComponentType<T>,
  Container: React.ComponentType<any> = AnimatePresence,
  store: PortalStore = DefaultStore,
) => {
  const Modal: React.FC<ComposeModalProps<T>> = ({
    visible: visibleInput,
    onChange,
    onWillChange,
    fullScreen = true,
    namespace,
    ...rest
  }) => {
    const store = React.useContext(PortalStoreContext);

    const [visible, setVisible] = useReactionState<boolean | undefined>(
      !!visibleInput,
    );

    const onDidAnimate = useReactCallback((exit: boolean) => {
      onChange?.(!exit);
    });

    const onWillAnimate = useReactCallback((exit: boolean) => {
      onWillChange?.(!exit);
    });

    const onRequestClose = useConst(() => setVisible(false));

    const elem = visible ? (
      <Component
        {...(rest as any)}
        onDidAnimate={onDidAnimate}
        onRequestClose={onRequestClose}
        onWillAnimate={onWillAnimate}
      />
    ) : null;

    if (!fullScreen) return <Container>{elem}</Container>;

    store!.getUpdater(namespace).setContainer(Container);

    return <Portal namespace={namespace}>{elem!}</Portal>;
  };

  Modal.displayName = `withModal${
    Component.displayName || Component.name || 'Component'
  }`;

  return Object.assign(Modal, extendInternal(store, Component, Container));
};
