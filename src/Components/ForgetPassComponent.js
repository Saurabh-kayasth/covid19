import React, {useState} from 'react';

import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {secondarColor} from '../Constants/Theme';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

function ForgetPassComponent(props) {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const cancelModalVisible = () => {
    props.cancelModal(false);
  };

  function getRef() {
    return database().ref();
  }

  const forgetPass = async () => {
    setLoading(true);
    auth()
      .sendPasswordResetEmail(value)
      .then(() => {
        setLoading(false);
        alert('The email has been sent to reset password.');
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setErrorMsg(errorMessage);
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* <View style={styles.container}> */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Forget Password</Text>
        <TouchableOpacity onPress={cancelModalVisible}>
          <Icon name="arrow-down" size={25} color="#000" />
        </TouchableOpacity>
      </View>

      <TextInput
        value={value}
        onChangeText={text => setValue(text)}
        placeholder="Enter your email..."
        placeholderTextColor="gray"
        style={styles.input}
        multiline
      />
      <TouchableOpacity onPress={forgetPass} style={styles.btn}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
      {/* </View> */}
      <Text style={{color: 'red'}}>{errorMsg}</Text>
    </KeyboardAvoidingView>
  );
}

export default ForgetPassComponent;

const styles = StyleSheet.create({
  container: {
    height: 170,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  input: {
    height: 45,
    padding: 10,
    color: '#000',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 10,
    marginTop: 10,
    fontSize: 16,
    textAlign: 'left',
  },
  btn: {
    height: 45,
    padding: 10,
    backgroundColor: secondarColor,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  btnText: {
    color: '#fff',
  },
});
