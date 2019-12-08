/**
 * @Description : modal
 * @Create on : 2019/11/18 23:08
 * @author liuyunjs
 * @version 0.0.1
 **/

import Modal from './src/container';
import {
  PortalModal,
  show,
  hide,
  destroy,
  destroyAll,
  update,
} from './src/portal';
import {LocalModal} from './src/local';
import {ModalProps, LocalModalProps} from './src/types';

export {
  LocalModal,
  Modal,
  PortalModal,
  ModalProps,
  LocalModalProps,
  show,
  hide,
  destroy,
  destroyAll,
  update,
};

export default Modal;
