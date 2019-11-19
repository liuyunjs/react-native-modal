/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {PortalProvider} from 'react-native-portal-view';
import Modal from './src/index';

const App = () => {
  const [visible, set] = React.useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <Modal verticalLayout="center" visible={visible} onChange={(v) => set(v)}>

        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'red'}}>
          <Text onPress={() => set(false)}>
            close
          </Text>
        </View>
      </Modal>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text onPress={() => set(true)}>
          open
        </Text>
      </View>
      <PortalProvider/>
    </>
  );
};

export default App;
