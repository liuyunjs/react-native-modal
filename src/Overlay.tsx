import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { OneOfAnimConf, RMotionView } from 'rmotion';
import { fade } from './animations';
import { styles } from './styles';

export type OverlayProps = {
  tintColor?: string;
  onPress?: () => void;
  disabled?: boolean;
  config?: OneOfAnimConf;
};

export const Overlay: React.FC<OverlayProps> = ({
  tintColor,
  onPress,
  disabled,
  config,
}) => {
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <RMotionView
        from={fade.from}
        animate={fade.animate}
        exit={fade.from}
        style={[styles.root, { backgroundColor: tintColor }]}
      />
    </TouchableWithoutFeedback>
  );
};

Overlay.defaultProps = {
  tintColor: 'rgba(0, 0, 0, .2)',
};
