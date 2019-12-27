import { PortalProvider } from 'react-native-portal-view';
import createModal from './src/modal';
import ModalView from './src/view';

const { portal, Modal } = createModal();

const ModalProvider = PortalProvider;

export { Modal, ModalView, ModalProvider, createModal, portal };

export default Modal;
