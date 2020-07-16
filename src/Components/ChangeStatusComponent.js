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

function ChangeStatusComponent(props) {
  const [value, setValue] = useState();

  const cancelModalVisible = () => {
    props.cancelModal(false);
  };

  function getRef() {
    return database().ref();
  }

  const changeStatus = async () => {
    var user = auth().currentUser;
    getRef()
      .child('users/' + user.uid)
      .update({
        status: value,
      });
    props.cancelModal(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* <View style={styles.container}> */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Change Status</Text>
        <TouchableOpacity onPress={cancelModalVisible}>
          <Icon name="arrow-down" size={25} color="#000" />
        </TouchableOpacity>
      </View>

      <TextInput
        value={value}
        onChangeText={text => setValue(text)}
        placeholder="Enter your status..."
        placeholderTextColor="gray"
        style={styles.input}
        multiline
      />
      <TouchableOpacity onPress={changeStatus} style={styles.btn}>
        <Text style={styles.btnText}>Change</Text>
      </TouchableOpacity>
      {/* </View> */}
    </KeyboardAvoidingView>
  );
}

export default ChangeStatusComponent;

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
