import * as React from 'react';
import { View, Text } from 'react-native';
import useGetSetState from 'react-use/lib/useGetSetState';
import { Modal } from '../lib';
import ModalExample from './components/modal';

export default function App(props: any) {
  const [getState, setState] = useGetSetState({
    visible: false,
    visible2: false,
  });

  const { visible, visible2 } = getState();

  console.log(visible);

  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          onPress={() => {
            setState({ visible: true });
            console.log('click open');
          }}>
          open
        </Text>
      </View>
      <Modal
        key="0"
        onChange={(v) => setState({ visible: v })}
        visible={visible}
        verticalLayout="bottom">
        <ModalExample
          text="modal1"
          onPress={() => setState({ visible2: true })}
        />
      </Modal>
      <Modal
        key="1"
        onChange={(v) => setState({ visible2: v })}
        visible={visible2}
        verticalLayout="bottom">
        <ModalExample
          text="modal2"
          onPress={() => setState({ visible2: !visible2 })}
        />
      </Modal>
    </>
  );
}
