import 'react-native-portal-view';
import { DefaultStore } from 'react-native-portal-view';
import { Modal as ModalInternal } from './Modal';
import { extend } from './extend';
import * as animations from './animations';
export type {
  ModalProps,
  ModalityProps,
  ModalInternalProps,
  AnimationPresupposition,
  HorizontalLayout,
  VerticalLayout,
} from './types';

const Modal = extend(ModalInternal, DefaultStore);

export default Modal;
export { animations, Modal, extend, ModalInternal };
