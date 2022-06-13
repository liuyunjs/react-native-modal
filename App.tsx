import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Modal } from './library/main';

export default function App() {
  const [v, setV] = React.useState(false);
  const keyRef = React.useRef<string>();

  const elem = (
    <View
      style={{
        height: 300,
        backgroundColor: 'red',
      }}>
      <Text
        onPress={() => {
          if (keyRef.current) {
            Modal.hide(keyRef.current);
            keyRef.current = undefined;
            return;
          }
          setV(false);
        }}>
        Close Modal
      </Text>
    </View>
  );

  return (
    <SafeAreaView>
      <Text
        onPress={() => {
          setV(true);
        }}>
        Show Modal
      </Text>
      <Text
        onPress={() => {
          if (keyRef.current) return;
          keyRef.current = Modal.show({
            children: elem,
            onRequestClose: () => (
              Modal.remove(keyRef.current!), (keyRef.current = undefined)
            ),
          });
        }}>
        Show Modal2
      </Text>
      <Modal visible={v} onWillChange={setV}>
        {elem}
      </Modal>
    </SafeAreaView>
  );
}
