/**
 * @Description : portal modal
 * @Create on : 2019/11/23 15:50
 * @author liuyunjs
 * @version 0.0.1
 **/

import {createPortal} from 'react-native-portal-view';
import {LocalModal} from './local';

const portalModal = createPortal(LocalModal);

export const show = portalModal.show;
export const hide = portalModal.hide;
export const update = portalModal.update;
export const destoryAll = portalModal.destroyAll;
export const destroy = portalModal.destroy;
export const PortalModal = portalModal.Component;

