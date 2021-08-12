import 'react-native-portal-view';
import { Modal as ModalInternal } from './Modal';
import { extend } from './extend';
import * as animations from './animations';
export type { ModalProps } from './types';

const Modal = extend(ModalInternal);

export default Modal;
export { animations, Modal };
