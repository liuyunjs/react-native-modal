import React from 'react';
import { AnimatePresence } from 'rmotion';
import { PortalStore } from 'react-native-portal-view';
import { ModalBaseWithOverlay } from './ModalBaseWithOverlay';
import { modalify } from './modalify';
import { modalZIndex } from './modalZIndex';
import { ModalBaseWithOverlayProps } from './types';

const IndexedModal = modalZIndex(ModalBaseWithOverlay);

const ModalifyModal = modalify(ModalBaseWithOverlay);

// @ts-ignore
export const Modal: typeof ModalifyModal & {
  add: (namespace: string, props: ModalBaseWithOverlayProps) => string;
  update: (
    namespace: string,
    key: string,
    props: ModalBaseWithOverlayProps,
  ) => void;
  remove: (namespace: string, key: string) => void;
} = ModalifyModal;

Modal.add = (namespace: string, props: ModalBaseWithOverlayProps) => {
  const updater = PortalStore.getUpdater(namespace);
  updater.setContainer(AnimatePresence);
  return updater.add(<IndexedModal {...props} />);
};
Modal.update = (
  namespace: string,
  key: string,
  props: ModalBaseWithOverlayProps,
) => {
  PortalStore.getUpdater(namespace).update(key, <IndexedModal {...props} />);
};
Modal.remove = (namespace: string, key: string) => {
  PortalStore.getUpdater(namespace).remove(key);
};
