import React, {useState, useEffect} from 'react';

import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const {width, height} = Dimensions.get('window');

function CommentData(props) {
  const [userName, setUserName] = useState();
  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState();
  // const [loading, setLoading] = useState();
  // const [loginChecked, setLoginChecked] = useState(false);
  // console.log('============================');

  useEffect(() => {
    setLoading(true);
    // setLoginChecked(false);
    console.log('============================');
    listenForItems(getRef().child('users'));
    // setLoading(false);
  }, [listenForItems, props]);

  function getRef() {
    return database().ref();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const listenForItems = friendsRef => {
    friendsRef.on('value', snap => {
      snap.forEach(child => {
        if (child.val().uid === props.item.uid) {
          console.log(child.val().name);
          setUserName(child.val().name);
          setUserProfile(child.val().avatar);
        }
      });
    });
  };
  return (
    <View style={styles.commentContainer}>
      <View style={styles.header}>
        <Image source={{uri: userProfile}} style={styles.img} />
        <View style={{width: width - 100}}>
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.dateTime}>{props.item.dateTime}</Text>
        </View>
        {/* <View style={styles.menu}>
            <OptionsMenu
              customButton={<Icon name="menu" size={25} color="#000" />}
              options={['Delete', 'Cancel']}
              // actions={[this.shareContact, this.editPost, this.deletePost]}
            />
          </View> */}
      </View>
      <Text>{props.item.comment}</Text>
    </View>
  );
}

function CommentsComponent(props) {
  const [comments, setComments] = useState();
  useEffect(() => {
    listenForItems(getRef().child('comments/' + props.postId));
  }, [listenForItems, props]);

  function getRef() {
    return database().ref();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const listenForItems = friendsRef => {
    friendsRef.on('value', snap => {
      var items = [];
      snap.forEach(child => {
        // if (child.val().uid === props.item.uid) {
        console.log(child.val());
        items.push({
          cmtId: child.val().cmtId,
          comment: child.val().comment,
          dateTime: child.val().dateTime,
          uid: child.val().uid,
        });
        // }
        setComments(items);
      });
    });
  };
  const data = [1, 2, 3, 4, 5, 6, 7];
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <FlatList
        data={comments}
        renderItem={({item, index}) => {
          return <CommentData item={item} />;
        }}
      />
    </View>
  );
}

export default CommentsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  commentContainer: {
    width: width,
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: '#e5e5e5',
    padding: 10,
  },
  //================header=========================
  header: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    // borderBottomWidth: 0.5,
    // borderBottomColor: 'gray',
  },
  img: {
    width: 37,
    height: 37,
    borderRadius: 37 / 2,
    backgroundColor: '#000',
    marginRight: 10,
  },
  name: {
    fontSize: 17,
  },
  dateTime: {
    fontSize: 11,
  },
});
