import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
  },
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});
