/**
 * @Description : modal with textInput example
 * @Create on : 2019/11/24 19:10
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import {View, TextInput} from 'react-native';
import BaseModalExample from './base-modal-example';

export default class AAA extends BaseModalExample {
  getProps() {
    return {
      ...this.props,
      avoidKeyboard: true,
      keyboardDismissWillHide: true,
      verticalLayout: 'bottom',
      ifHideDestroy: true,
      // fullScreen: false,
    } as any;
  }

  renderChild() {
    return (
      <View>
        <TextInput defaultValue="aaa" autoFocus />
      </View>
    );
  }
}
