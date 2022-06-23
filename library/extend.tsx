import { DefaultStore, PortalStore } from 'react-native-portal-view';
import * as React from 'react';
import { isAnyObject } from '@liuyunjs/utils/lib/isAnyObject';
import { isNil } from '@liuyunjs/utils/lib/isNil';
import { AnimatePresence } from 'rmotion';
import { DarklyModalInternal } from './ModalInternal';

export const extendInternal = <T extends {}>(
  store: PortalStore,
  ModalComponent: React.ComponentType<T>,
  Container: React.ComponentType<any>,
) => {
  function show(namespace: string, props: T): string;
  function show(props: T): string;
  function show(namespaceOrProps: string | T, props?: T) {
    if (isAnyObject(namespaceOrProps)) {
      props = namespaceOrProps as T;
      namespaceOrProps = '';
    }
    const updater = store.getUpdater(namespaceOrProps);
    updater.setContainer(Container);
    return updater.add(React.createElement(ModalComponent, props));
  }

  function update(namespace: string, key: string, props: T): void;
  function update(key: string, props: T): void;
  function update(namespaceOrKey: string, keyOrProps: string | T, props?: T) {
    if (isAnyObject(keyOrProps)) {
      props = keyOrProps as T;
      keyOrProps = namespaceOrKey;
      namespaceOrKey = '';
    }

    store
      .getUpdater(namespaceOrKey)
      .update(keyOrProps, React.createElement(ModalComponent, props));
  }
  function hide(namespace: string, key: string): void;
  function hide(key: string): void;
  function hide(namespaceOrKey: string, key?: string) {
    if (isNil(key)) {
      key = namespaceOrKey;
      namespaceOrKey = '';
    }
    store.getUpdater(namespaceOrKey).remove(key);
  }

  return {
    show,
    hide,
    update,
    /**
     * @deprecated 请使用 show 方法替代
     */
    add: show,
    /**
     * @deprecated 请使用 hide 方法替代
     */
    remove: hide,
  };
};

export const extend = <T extends React.ComponentType<any>>(
  Component: T,
  store: PortalStore = DefaultStore,
) =>
  Object.assign(
    Component,
    extendInternal(store, DarklyModalInternal, AnimatePresence),
  );
