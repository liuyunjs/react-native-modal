import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { Modal, animations } from './library/main';

export default function App() {
  const [v, setV] = React.useState(false);
  const keyRef = React.useRef<string>();

  const elem = (
    <View style={{ backgroundColor: 'red', height: 300 }}>
      <Text>Text</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        onPress={() => {
          setV(!v);
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
      <Modal
        animationIn="slideInDown"
        // mask={false}
        // animationConf={{ duration: 1000 }}
        // contentContainerStyle={{
        //   backfaceVisibility: 'hidden',
        // }}
        // verticalLayout="center"
        // horizontalLayout="center"
        // animation={animations.flipXInOut}
        visible={v}
        onWillChange={setV}>
        {elem}
      </Modal>
    </SafeAreaView>
  );
}
