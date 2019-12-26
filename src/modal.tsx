import * as React from 'react';
import portal from './portal';
import ModalView, { ModalViewProps } from './view';

const { Portal } = portal;

type ModalProps = ModalViewProps & {
  fullScreen?: boolean;
};

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const modal = React.createElement(ModalView as React.ComponentClass<ModalViewProps>, props);
  if (!props.fullScreen) {
    return modal;
  }

  return <Portal>{modal}</Portal>;
};

Modal.defaultProps = {
  fullScreen: true,
};

export default React.memo(Modal);
