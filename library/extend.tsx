import { PortalStore } from 'react-native-portal-view';
import * as React from 'react';
import { isAnyObject } from '@liuyunjs/utils/lib/isAnyObject';
import { isNil } from '@liuyunjs/utils/lib/isNil';

export const extend = <T extends {}>(
  store: PortalStore,
  ModalComponent: React.ComponentType<T>,
) => {
  function show(namespace: string, props: T): string;
  function show(props: T): string;
  function show(namespaceOrProps: string | T, props?: T) {
    if (isAnyObject(namespaceOrProps)) {
      props = namespaceOrProps as T;
      namespaceOrProps = '';
    }
    const updater = store.getUpdater(namespaceOrProps);
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
  };
};
