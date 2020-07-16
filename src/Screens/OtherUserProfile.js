import React, {useEffect, useState} from 'react';

import {View, StyleSheet, StatusBar} from 'react-native';
import HeaderComponent from '../Components/HeaderComponent';
import ProfileComponent from '../Components/ProfileComponent';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Spinner from 'react-native-loading-spinner-overlay';
import PostComponent from '../Components/PostComponent';

function OtherUserProfile(props) {
  const [posts, setPosts] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState();
  const [loginChecked, setLoginChecked] = useState(false);
  const [postChecked, setPostChecked] = useState(false);

  useEffect(() => {
    setLoading(true);
    setLoginChecked(false);
    setPostChecked(false);
    listenForItems(getRef().child('users'));
    listenForPosts(getRef().child('posts'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  function getRef() {
    return database().ref();
  }

  function listenForItems(friendsRef) {
    console.log(props.route.params.item.email);
    setLoading(true);
    auth().onAuthStateChanged(user => {
      if (user) {
        friendsRef.on('value', snap => {
          var items = [];
          snap.forEach(child => {
            if (child.val().email === props.route.params.item.email) {
              items.push({
                name: child.val().name,
                uid: child.val().uid,
                email: child.val().email,
                avt: child.val().avatar,
                status: child.val().status,
              });
            }
          });
          setUserData(items, () => {});
          setLoginChecked(true);
        });
      }
    });
  }

  function listenForPosts(friendsRef) {
    setLoading(true);
    setPostChecked(false);
    var user = auth().currentUser;
    friendsRef.on('value', snap => {
      var items = [];
      snap.forEach(child => {
        if (child.val().uid === props.route.params.item.uid) {
          items.push({
            uid: child.val().uid,
            message: child.val().message,
            dateTime: child.val().dateTime,
            postId: child.val().postId,
          });
        }
      });
      setPosts(items, () => {});
      setPostChecked(true);
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <HeaderComponent header={'Profile'} />
      {!loginChecked ? (
        <Spinner visible={loading} />
      ) : (
        <ProfileComponent navigation={props.navigation} item={userData} />
      )}
      {!postChecked ? (
        <Spinner visible={loading} />
      ) : (
        <PostComponent navigation={props.navigation} items={posts} />
      )}
    </View>
  );
}

export default OtherUserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
});
