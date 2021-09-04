import React from 'react';
import { AnimatePresence } from 'rmotion';
import { Portal, PortalStore } from 'react-native-portal-view';
import { useReactCallback } from '@liuyunjs/hooks/lib/useReactCallback';
import { useReactionState } from '@liuyunjs/hooks/lib/useReactionState';
import { useConst } from '@liuyunjs/hooks/lib/useConst';
import { ModalInternalMemo as ModalInternal } from './ModalInternal';
import { ModalProps } from './types';

export const Modal: React.FC<ModalProps> = ({
  visible: visibleInput,
  onChange,
  onWillChange,
  fullScreen,
  namespace,
  override,
  store,
  ...rest
}) => {
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
    <ModalInternal
      {...rest}
      onDidAnimate={onDidAnimate}
      onRequestClose={onRequestClose}
      onWillAnimate={onWillAnimate}
    />
  ) : null;

  if (!fullScreen) return elem;

  store!.getUpdater(namespace).setContainer(AnimatePresence);

  return (
    <Portal store={store} namespace={namespace} override={override}>
      {elem!}
    </Portal>
  );
};

Modal.defaultProps = {
  store: PortalStore,
  fullScreen: true,
};
