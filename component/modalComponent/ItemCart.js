import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, Button} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const Appbutton = ({item,removeItem}) => {
  return (
    <TouchableWithoutFeedback onPressOut={() => removeItem(item.name)}>
        <View style={{ flexDirection: 'row', width: '100%', height: 70, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 15, marginBottom: 20 }}>
          <View style={{ width: 200, marginLeft: 15 }}>
            <Text style={styles.textcart}>{item.name}</Text>
          </View>
          <View style={{ width: 100 }}>
            <Text style={styles.textcart}>{item.actionType}</Text>
          </View>
          <View style={{ width: 70 }}>
            <Text style={styles.textcart}>{item.stock}</Text>
          </View>
        </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    textcart: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14
      }
});

export default Appbutton;
