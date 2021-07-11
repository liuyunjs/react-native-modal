import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useWillMount } from '@liuyunjs/hooks/lib/useWillMount';

let modalIndex = 0,
  zIndex = 1;
export const useIndexManager = () => {
  React.useEffect(
    () => () => {
      modalIndex--;
      if (modalIndex <= 0) {
        zIndex = 1;
      }
    },
    [],
  );

  return useWillMount(() => {
    modalIndex++;
    return zIndex++;
  });
};

export const modalZIndex = <
  T extends { z?: number; style?: StyleProp<ViewStyle> },
>(
  Component: React.ComponentType<T>,
) => {
  function ModalZ({ z = 0, style: styleInput, ...rest }: T) {
    const style = StyleSheet.flatten(styleInput);

    const zIndex = useIndexManager() + z + (style?.zIndex || 0);
    // @ts-ignore
    return <Component {...rest} style={style} z={zIndex} />;
  }

  ModalZ.displayName = `modalZ(${
    Component.displayName || Component.name || 'Component'
  })`;
  return ModalZ;
};
