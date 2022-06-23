import * as React from 'react';
import { AnimatePresence } from 'rmotion';
import {
  DefaultStore,
  Portal,
  PortalStore,
  PortalStoreContext,
} from 'react-native-portal-view';
import { useReactionState } from '@liuyunjs/hooks/lib/useReactionState';
import { useConst } from '@liuyunjs/hooks/lib/useConst';
import { ComposeModalProps } from './types';
import { extendInternal } from './extend';

export const withModal = <T extends {}>(
  Component: React.ComponentType<T>,
  Container: React.ComponentType<any> = AnimatePresence,
  storeInput: PortalStore = DefaultStore,
) => {
  const Modal: React.FC<ComposeModalProps<T>> = ({
    visible: visibleInput,
    onChange,
    onWillChange,
    fullScreen = true,
    namespace,
    useContextStore,
    ...rest
  }) => {
    const contextStore = React.useContext(PortalStoreContext);

    const store = useContextStore ? contextStore : storeInput;

    const [visible, setVisible] = useReactionState<boolean | undefined>(
      !!visibleInput,
    );

    const onDidAnimate = (exit: boolean) => {
      onChange?.(!exit);
    };

    const onWillAnimate = (exit: boolean) => {
      onWillChange?.(!exit);
    };

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

  Modal.displayName = `withModal(${
    Component.displayName || Component.name || 'Component'
  })`;

  return Object.assign(Modal, extendInternal(storeInput, Component, Container));
};
