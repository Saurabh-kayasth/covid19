import React from 'react';

import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import {secondarColor, primaryColor} from '../Constants/Theme';
// import HeaderComponent from '../Components/HeaderComponent';

function ErrorLogin() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text>To see profile, you need to login first.</Text>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      {/* <HeaderComponent header={'Statistics'} /> */}
    </View>
  );
}

export default ErrorLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 100,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: secondarColor,
  },
  text: {
    color: '#fff',
  },
});
