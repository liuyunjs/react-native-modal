/**
 * @Description : example modal
 * @Create on : 2019/11/24 16:16
 * @author liuyunjs
 * @version 0.0.2
 **/
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Example(props: any) {
  return (
    <View style={styles.container} pointerEvents="auto">
      <Text onPress={props.onPress} style={styles.text}>
        Modal example {props.text}, click it
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 300,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 16,
    color: 'blue',
  },
});
