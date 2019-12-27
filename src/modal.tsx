import * as React from 'react';
import {createPortal} from 'react-native-portal-view';
import ModalView, {ModalViewProps} from './view';

type ModalProps = ModalViewProps & {
  fullScreen?: boolean;
};

export default function() {
  const portal = createPortal();
  const {Portal} = portal;

  const Modal: React.FC<ModalProps> = (props: ModalProps) => {
    const modal = React.createElement(
      ModalView as React.ComponentClass<ModalViewProps>,
      props,
    );
    if (!props.fullScreen) {
      return modal;
    }

    return <Portal>{modal}</Portal>;
  };

  Modal.defaultProps = {
    fullScreen: true,
  };

  return {
    Modal: React.memo(Modal),
    portal,
  };
}
