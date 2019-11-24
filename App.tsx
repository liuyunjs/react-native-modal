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
  TextInput
} from 'react-native';
import Modal, {show, hide, destroy} from './src';

const App = () => {
  const [visible, set] = React.useState(false);
  const input = React.useRef();
  return (
    <View style={{marginTop: 100, flex: 1, overflow: 'hidden'}}>
      <Modal
        visible={visible}
        fullScreen={false}
        onChange={(v: boolean) => set(v)}
        verticalLayout="bottom"
        ifHideDestroy={false}
        // style={{justifyContent: 'flex-end'}}
        // maskCloseable={false}
        // avoidKeyboard
        // onSwipeComplete={() => set(false)}
        // fullScreen={false}
        // animationIn="slideInDown"
        // animationOut="slideOutUp"
        // onWillChange={(visible: boolean) => {
        //   if (!visible) {
        //     (input.current as any).blur();
        //   }
        // }}
        avoidKeyboard
      >

        <View style={{alignItems: 'center', height: 300, justifyContent: 'center', backgroundColor: 'red'}}>
          <Text onPress={() => {
            hide()
          }}>
            close
          </Text>
          <TextInput ref={input as any} defaultValue="defaultValue"/>
          <TextInput ref={input as any} defaultValue="defaultValue1"/>
          <TextInput ref={input as any} defaultValue="defaultValue2"/>
          <TextInput ref={input as any} defaultValue="defaultValue3"/>
          <TextInput ref={input as any} defaultValue="defaultValue4"/>
          <TextInput ref={input as any} defaultValue="defaultValue5"/>
        </View>
      </Modal>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {/*<Text onPress={() => set(true)}>*/}
        <Text onPress={() => {
          set(true)
          // show(
          //   <View style={{alignItems: 'center', height: 300, justifyContent: 'center', backgroundColor: 'red'}}>
          //     <Text onPress={() => {
          //       // set(false)
          //       hide();
          //     }}>
          //       close
          //     </Text>
          //     <TextInput ref={input as any} defaultValue="defaultValue" />
          //   </View>,
          //   {
          //     visible: true,
          //     verticalLayout: 'bottom',
          //     avoidKeyboard: true,
          //     onWillChange(visible: boolean) {
          //       if (!visible) {
          //         (input.current as any).blur();
          //       }
          //     }
          //   },
          // )
        }}>
          open
        </Text>
      </View>
    </View>
  );
};

export default App;
