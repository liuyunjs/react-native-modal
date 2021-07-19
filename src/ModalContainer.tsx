import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AnimatePresence } from 'rmotion';
import { Portal } from 'react-native-portal-view';

export const ModalContainer: React.FC<{ z?: number }> = ({
  z = 1,
  children,
}) => {
  return (
    <Portal>
      <View
        pointerEvents="box-none"
        style={[StyleSheet.absoluteFill, { zIndex: z }]}>
        <AnimatePresence>{children}</AnimatePresence>
      </View>
    </Portal>
  );
};
