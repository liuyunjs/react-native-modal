/**
 * @Description : modal
 * @Create on : 2019/11/18 22:37
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import {PortalModal} from './portal';
import {LocalModal} from './local';
import {ModalProps} from './types';

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const {fullScreen} = props;

  if (!fullScreen) {
    return React.createElement(LocalModal, props);
  }

  return React.createElement(PortalModal, props);
};


Modal.defaultProps = {
  visible: true,
  fullScreen: true,
};

export default Modal;
