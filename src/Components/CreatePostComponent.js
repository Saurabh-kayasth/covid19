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
import moment from 'moment';

function CreatePostComponent(props) {
  const [value, setValue] = useState();

  const cancelModalVisible = () => {
    props.cancelModal(false);
  };

  const formatDate = date => {
    var monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  };

  function getRef() {
    return database().ref();
  }

  const sendPost = async () => {
    var user = auth().currentUser;
    var key = getRef()
      .child('posts')
      .push().key;
    // auth().onAuthStateChanged(user => {
    //   if (user) {
    var now_time = moment()
      .utcOffset('+05:30')
      .format(' hh:mm a');
    getRef()
      .child('posts/' + key)
      .set({
        uid: user.uid,
        message: value,
        postId: key,
        dateTime: formatDate(new Date()) + ' ' + now_time,
      });
    props.cancelModal(false);
    // this.setState({
    //   loading: false,
    //   isLoggedIn: true,
    // });
    // this.props.navigation.navigate('tabs');
    //   }
    // });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* <View style={styles.container}> */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Share your thoughts about covid-19
        </Text>
        <TouchableOpacity onPress={cancelModalVisible}>
          <Icon name="arrow-down" size={25} color="#000" />
        </TouchableOpacity>
      </View>

      <TextInput
        value={value}
        onChangeText={text => setValue(text)}
        placeholder="Enter your thoughts..."
        placeholderTextColor="gray"
        style={styles.input}
        multiline
      />
      <TouchableOpacity onPress={sendPost} style={styles.btn}>
        <Text style={styles.btnText}>POST</Text>
      </TouchableOpacity>
      {/* </View> */}
    </KeyboardAvoidingView>
  );
}

export default CreatePostComponent;

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
