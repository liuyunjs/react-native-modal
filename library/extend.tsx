import { PortalStore } from 'react-native-portal-view';
import { AnimatePresence } from 'rmotion';
import React from 'react';
import { isAnyObject } from '@liuyunjs/utils/lib/isAnyObject';
import { isNil } from '@liuyunjs/utils/lib/isNil';
import { ModalInternalProps } from './types';
import { ModalInternalMemo as ModalInternal } from './ModalInternal';

function add(namespace: string, props: ModalInternalProps): string;
function add(props: ModalInternalProps): string;
function add(
  namespaceOrProps: string | ModalInternalProps,
  props?: ModalInternalProps,
) {
  if (isAnyObject(namespaceOrProps)) {
    props = namespaceOrProps as ModalInternalProps;
    namespaceOrProps = '';
  }
  const updater = PortalStore.getUpdater(namespaceOrProps);
  updater.setContainer(AnimatePresence);
  return updater.add(React.createElement(ModalInternal, props));
}

function update(
  namespace: string,
  key: string,
  props: ModalInternalProps,
): void;
function update(key: string, props: ModalInternalProps): void;
function update(
  namespaceOrKey: string,
  keyOrProps: string | ModalInternalProps,
  props?: ModalInternalProps,
) {
  if (isAnyObject(keyOrProps)) {
    props = keyOrProps as ModalInternalProps;
    keyOrProps = namespaceOrKey;
    namespaceOrKey = '';
  }

  PortalStore.getUpdater(namespaceOrKey).update(
    keyOrProps,
    React.createElement(ModalInternal, props),
  );
}
function remove(namespace: string, key: string): void;
function remove(key: string): void;
function remove(namespaceOrKey: string, key?: string) {
  if (isNil(key)) {
    key = namespaceOrKey;
    namespaceOrKey = '';
  }
  PortalStore.getUpdater(namespaceOrKey).remove(key);
}

export const extend = <T extends React.ComponentType<any>>(Component: T) => {
  return Object.assign(Component, {
    add,
    update,
    remove,
  });
};
