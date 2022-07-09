import * as React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Modal } from './library/main';

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const keyRef = React.useRef<string>();

  const elem = (
    <View style={{ backgroundColor: 'red', height: 300 }}>
      <Text
        onPress={() => {
          setVisible(!visible);
        }}>
        Text
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        onPress={() => {
          setVisible(!visible);
        }}>
        Show Modal
      </Text>

      <Text
        onPress={() => {
          if (keyRef.current) return;
          keyRef.current = Modal.show({
            children: elem,
            onRequestClose: () => (
              Modal.hide(keyRef.current!), (keyRef.current = undefined)
            ),
          });
        }}>
        Show Modal2
      </Text>
      <Modal visible={visible} onChange={setVisible}>
        {elem}
      </Modal>
    </SafeAreaView>
  );
}
