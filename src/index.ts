/**
 * @Description : modal
 * @Create on : 2019/11/18 23:08
 * @author liuyunjs
 * @version 0.0.1
 **/

import {portalHOC} from 'react-native-portal-view';
import ModalAction from './action';
export * from './types';

export default portalHOC(ModalAction);
