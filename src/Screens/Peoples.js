import React, {useEffect, useState} from 'react';

import {View, StyleSheet, StatusBar} from 'react-native';
import HeaderComponent from '../Components/HeaderComponent';
import UsersComponent from '../Components/UsersComponent';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

function Peoples(props) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    listenForItems(getRef().child('users'));
  }, []);

  function getRef() {
    return database().ref();
  }

  function listenForItems(friendsRef) {
    var user = auth().currentUser;
    // alert(user);

    friendsRef.on('value', snap => {
      var items = [];
      snap.forEach(child => {
        if (child.val().email !== user.email) {
          items.push({
            name: child.val().name,
            uid: child.val().uid,
            email: child.val().email,
            avt: child.val().avatar,
            status: child.val().status,
          });
          // this.setState({
          //   username: child.val().name,
          //   usercontact: child.val().contact,
          //   useraddress: child.val().address,
          //   userprofile: child.val().avatar,
          // });
        }
      });

      setUserData(items);
    });
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <HeaderComponent header={'People'} />
      <UsersComponent navigation={props.navigation} items={userData} />
    </View>
  );
}

export default Peoples;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
