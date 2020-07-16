import React, {useEffect, useState} from 'react';

import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OptionsMenu from 'react-native-options-menu';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {secondarColor} from '../Constants/Theme';

const {width} = Dimensions.get('window');

function PostData(props) {
  const [userName, setUserName] = useState();
  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState();
  const [likesCount, setLikesCount] = useState();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLoading(true);
    var user = auth().currentUser;
    getRef()
      .child('PostLikes/' + props.item.postId)
      .on('value', snap => {
        var len = snap.numChildren();
        var key;
        for (key in snap.val()) {
          if (key == user.uid) {
            setLiked(true);
          }
        }
        setLikesCount(len);
      });
    listenForItems(getRef().child('users'));
  }, [listenForItems, props]);

  function getRef() {
    return database().ref();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const listenForItems = friendsRef => {
    friendsRef.on('value', snap => {
      snap.forEach(child => {
        if (child.val().uid === props.item.uid) {
          setUserName(child.val().name);
          setUserProfile(child.val().avatar);
        }
      });
    });
  };

  const unlike = () => {
    var user = auth().currentUser;
    var likesRef = getRef().child('PostLikes');
    likesRef.child(props.item.postId + '/' + user.uid).remove();
    setLiked(false);
  };

  const like = () => {
    var user = auth().currentUser;
    var likesRef = getRef().child('PostLikes');
    likesRef.child(props.item.postId + '/' + user.uid).set(true);

    getRef()
      .child('PostLikes/' + props.item.postId)
      .on('value', snap => {
        setLikesCount(snap.numChildren());
      });
  };

  const navigateToData = () => {
    props.navigation.navigate('postData', {
      item: props.item,
      name: userName,
      profile: userProfile,
      liked: liked,
      likesCount: likesCount,
    });
  };

  const deletePost = () => {
    var postsRef = getRef().child('posts');
    postsRef.child(props.item.postId).remove();
  };

  const whatsAppShare = () => {
    var shareOptions = {
      title: 'Covid-19',
      message:
        'Name : ' +
        userName +
        '\n' +
        props.item.message +
        '\nCredit : Covid Tracker',
      // message: video.content + " " + "http://freehitnews.com?link=" + video.media_uri,
      // url: this.props.item.img_url,
      // subject: this.props.item.img_url, //  for email
    };
    Share.share(
      Object.assign(shareOptions, {
        social: 'whatsapp',
      }),
    );
  };

  return (
    <TouchableWithoutFeedback onPress={navigateToData}>
      <View style={styles.postContainer} onPress={navigateToData}>
        <View style={styles.header}>
          <Image source={{uri: userProfile}} style={styles.img} />
          <View style={{width: width - 100}}>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.dateTime}>{props.item.dateTime}</Text>
          </View>
          {auth().currentUser.uid == props.item.uid ? (
            <View style={styles.menu}>
              <OptionsMenu
                customButton={<Icon name="menu" size={25} color="#000" />}
                options={['Delete']}
                actions={[deletePost]}
              />
            </View>
          ) : null}
        </View>
        <View style={styles.data}>
          <Text style={styles.dataText} numberOfLines={4}>
            {props.item.message}
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.btn} onPress={liked ? unlike : like}>
            <Text style={{fontSize: 20, marginRight: 10}}>{likesCount}</Text>
            <Icon
              name={liked ? 'heart' : 'heart-outline'}
              size={22}
              color={liked ? '#ff5b77' : '#000'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={navigateToData}>
            <Icon name="comment-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={whatsAppShare}>
            <Icon name="share-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function PostComponent(props) {
  // const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Posts</Text>
      <FlatList
        data={props.items}
        renderItem={({item, index}) => {
          return <PostData item={item} navigation={props.navigation} />;
        }}
      />
    </View>
  );
}

export default PostComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  heading: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
  postContainer: {
    width: width,
    // height: 150,
    backgroundColor: '#fff',
    borderBottomWidth: 5,
    borderBottomColor: '#e5e5e5',
    padding: 10,
    paddingTop: 10,
    paddingBottom: 0,
  },
  menu: {
    paddingRight: 10,
    // backgroundColor: 'red',
    alignSelf: 'stretch',
  },
  //================header=========================
  header: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
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
  //xxxxxxxxxxxxxxheaderxxxxxxxxxxxxxxxxxxxxxxxxx
  //==================data====================
  data: {
    width: width,
    padding: 10,
  },
  dataText: {
    fontSize: 16,
  },
  //xxxxxxxxxxxxxxxxxxxdataxxxxxxxxxxxxxxxxx
  //============footer=====================
  footer: {
    width: width,
    height: 40,
    flexDirection: 'row',
  },
  btn: {
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: '#333333',
  },
});
