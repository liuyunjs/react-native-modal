import 'react-native-portal-view';
import { ModalInternal, DarklyModalInternal } from './ModalInternal';
import { withModal } from './withModal';
import { extend } from './extend';
import * as animations from './legacyAnimations';
export type {
  ModalProps,
  ModalityProps,
  ModalInternalProps,
  AnimationPresupposition,
  HorizontalLayout,
  VerticalLayout,
} from './types';

const Modal = withModal(DarklyModalInternal);

export default Modal;

export {
  animations,
  Modal,
  DarklyModalInternal,
  ModalInternal,
  withModal,
  extend,
};
