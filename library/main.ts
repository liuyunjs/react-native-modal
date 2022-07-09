import 'react-native-portal-view';
import { darkly } from 'rn-darkly';
import { Modal as ModalInternal } from './ModalInternal';
import { withModal } from './withModal';
export type {
  ModalProps,
  ModalityProps,
  ModalInternalProps,
  HorizontalLayout,
  VerticalLayout,
} from './types';

export const DarklyModalInternal = darkly(
  ModalInternal,
  'style',
  'containerStyle',
  'contentContainerStyle',
  'maskBackgroundColor',
);

const Modal = withModal(DarklyModalInternal);

export default Modal;

export { Modal, ModalInternal, withModal };
