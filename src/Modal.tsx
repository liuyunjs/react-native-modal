import React from 'react';
import { PortalStore } from 'react-native-portal-view';
import { ModalBaseWithOverlay } from './ModalBaseWithOverlay';
import { modality } from './modality';
// import { modalZIndex } from './modalZIndex';
import { ModalContainer } from './ModalContainer';
import { ModalBaseWithOverlayProps } from './types';

// const IndexedModal = modalZIndex(ModalBaseWithOverlay);

const ModalityModal = modality(ModalBaseWithOverlay);

// @ts-ignore
export const Modal: typeof ModalityModal & {
  add: (namespace: string, props: ModalBaseWithOverlayProps) => string;
  update: (
    namespace: string,
    key: string,
    props: ModalBaseWithOverlayProps,
  ) => void;
  remove: (namespace: string, key: string) => void;
} = ModalityModal;

Modal.add = (namespace: string, props: ModalBaseWithOverlayProps) => {
  const updater = PortalStore.getUpdater(namespace);
  updater.setContainer(<ModalContainer z={props.z} />);
  return updater.add(<ModalBaseWithOverlay {...props} />);
};
Modal.update = (
  namespace: string,
  key: string,
  props: ModalBaseWithOverlayProps,
) => {
  PortalStore.getUpdater(namespace).update(
    key,
    <ModalBaseWithOverlay {...props} />,
  );
};
Modal.remove = (namespace: string, key: string) => {
  PortalStore.getUpdater(namespace).remove(key);
};
