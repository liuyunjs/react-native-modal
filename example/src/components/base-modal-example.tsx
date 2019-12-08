/**
 * @Description : modal example
 * @Create on : 2019/11/24 19:02
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import {View, Text} from 'react-native';
import Modal, {ModalProps, hide} from 'react-native-smart-modal';

export default class extends React.PureComponent<ModalProps> {
  state = {
    visible: false,
  };

  ref: React.Ref<any> = React.createRef();

  onChange = (visible: boolean) => this.setState({visible});

  close = () => this.onChange(false);

  open = () => {
    this.onChange(true);

    console.log(this.ref);
  };

  renderChild(): React.ReactElement | null {
    return null;
  }

  getProps(): ModalProps | null {
    return null;
  }

  render() {
    return (
      <>
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <Text onPress={this.open}>open</Text>
        </View>
        <Modal
          {...this.getProps()}
          ref={this.ref}
          onChange={this.onChange}
          visible={this.state.visible}>
          <View
            style={{
              alignItems: 'center',
              height: 300,
              justifyContent: 'center',
              backgroundColor: 'red',
            }}>
            {this.renderChild()}

            <Text onPress={this.close}>close</Text>

            <Text onPress={() => hide()}>close use static function</Text>
          </View>
        </Modal>
      </>
    );
  }
}
