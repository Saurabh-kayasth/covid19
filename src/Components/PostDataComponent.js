import React, {useEffect, useState} from 'react';

import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OptionsMenu from 'react-native-options-menu';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import CommentsComponent from './CommentsComponent';
import {secondarColor} from '../Constants/Theme';
import moment from 'moment';

const {width} = Dimensions.get('window');

export default function PostDataComponent(props) {
  console.log(props);
  const [userName, setUserName] = useState();
  const [userProfile, setUserProfile] = useState();
  const [dateTime, setDateTime] = useState();
  const [message, setMessage] = useState();
  const [uid, setUid] = useState();
  const [value, setValue] = useState();
  const [postId, setPostId] = useState();
  const [likesCount, setLikesCount] = useState();
  const [liked, setLiked] = useState(false);

  function getRef() {
    return database().ref();
  }

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

  useEffect(() => {
    // setLoading(false);
    var item = props.route.params.item;
    console.log('-=-=-=-=-=-=-=--=--=-=-=-=-=--=--=-', item);
    setDateTime(item.dateTime);
    setMessage(item.message);
    setUid(item.uid);
    setLiked(props.route.params.liked);
    setLikesCount(props.route.params.likesCount);
    setUserName(props.route.params.name);
    setUserProfile(props.route.params.profile);
    setPostId(item.postId);
  }, [props]);

  const unlike = () => {
    var user = auth().currentUser;
    var likesRef = getRef().child('PostLikes');
    likesRef.child(postId + '/' + user.uid).remove();
    setLiked(false);
  };

  const like = () => {
    var user = auth().currentUser;
    var likesRef = getRef().child('PostLikes');
    likesRef.child(postId + '/' + user.uid).set(true);
    setLiked(true);
    getRef()
      .child('PostLikes/' + postId)
      .on('value', snap => {
        setLikesCount(snap.numChildren());
      });
  };

  const whatsAppShare = () => {
    var shareOptions = {
      title: 'Covid-19',
      message:
        'Username : ' + userName + '\n' + message + '\nCredit : Covid Tracker',
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

  const sendComment = async () => {
    var user = auth().currentUser;
    var key = getRef()
      .child('comments')
      .push().key;
    var now_time = moment()
      .utcOffset('+05:30')
      .format(' hh:mm a');
    getRef()
      .child('comments/' + postId + '/' + key)
      .set({
        uid: user.uid,
        comment: value,
        cmtId: key,
        dateTime: formatDate(new Date()) + ' ' + now_time,
      });
  };

  return (
    <>
      <View style={styles.postContainer}>
        <View style={styles.header}>
          <Image source={{uri: userProfile}} style={styles.img} />
          <View style={{width: width - 100}}>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.dateTime}>{dateTime}</Text>
          </View>
          {/* <View style={styles.menu}>
            <OptionsMenu
              customButton={<Icon name="menu" size={25} color="#000" />}
              options={['Delete', 'Cancel']}
              // actions={[this.shareContact, this.editPost, this.deletePost]}
            />
          </View> */}
        </View>
        <View style={styles.data}>
          <Text style={styles.dataText}>{message}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.btn, {flexDirection: 'row'}]}
            onPress={liked ? unlike : like}>
            <Text style={{color: '#000', fontSize: 18, marginRight: 7}}>
              {likesCount}
            </Text>
            <Icon
              name={liked ? 'heart' : 'heart-outline'}
              size={22}
              color={liked ? '#ff5b77' : '#000'}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.btn}>
            <Icon name="comment-outline" size={22} color="#000" />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.btn} onPress={whatsAppShare}>
            <Icon name="share-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.heading}>Comments</Text>
      <View style={styles.comment}>
        <TextInput
          value={value}
          placeholder="Enter your thoughts..."
          placeholderTextColor="gray"
          onChangeText={text => setValue(text)}
          style={styles.input}
        />
        <TouchableOpacity style={styles.btnComment} onPress={sendComment}>
          <Text style={styles.btnText}>POST</Text>
        </TouchableOpacity>
      </View>
      <CommentsComponent postId={postId} />
    </>
  );
}

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
    marginTop: 10,
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
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#333333',
  },

  //===========comment================
  comment: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 0,
  },
  input: {
    width: width - 100,
    height: 45,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  btnComment: {
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: secondarColor,
    width: 70,
    color: '#000',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
