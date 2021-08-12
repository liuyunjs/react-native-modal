import React from 'react';
import { AnimatePresence } from 'rmotion';
import { LegacyPortal, PortalStore } from 'react-native-portal-view';
import { useReactCallback } from '@liuyunjs/hooks/lib/useReactCallback';
import { useReactionState } from '@liuyunjs/hooks/lib/useReactionState';
import { useConst } from '@liuyunjs/hooks/lib/useConst';
import { ModalInternalMemo as ModalInternal } from './ModalInternal';
import { ModalProps } from './types';

export const Modal: React.FC<ModalProps> = ({
  visible: visibleInput,
  onChange,
  onWillChange,
  fullScreen = true,
  namespace,
  override,
  store,
  ...rest
}) => {
  const [visible, setVisible] = useReactionState<boolean | undefined>(
    !!visibleInput,
  );
  PortalStore.getUpdater(namespace).setContainer(AnimatePresence);

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
      key="modal"
      onDidAnimate={onDidAnimate}
      onRequestClose={onRequestClose}
      onWillAnimate={onWillAnimate}
    />
  ) : null;

  if (!fullScreen) return elem;

  return (
    <LegacyPortal store={store} namespace={namespace} override={override}>
      {elem!}
    </LegacyPortal>
  );
};
