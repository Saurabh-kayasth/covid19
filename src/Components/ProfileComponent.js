/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';

import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import {secondarColor} from '../Constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PostComponent from './PostComponent';
import auth from '@react-native-firebase/auth';
import ChangeStatusComponent from './ChangeStatusComponent';

const {width, height} = Dimensions.get('window');

function ProfileComponent(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [done, setDOne] = useState(false);
  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        props.navigation.navigate('login');
      });
  };

  useEffect(() => {
    setDOne(false);
    if (props.item[0].avt != undefined) {
      setDOne(true);
    }
  }, [props]);

  const makeModalVisible = () => {
    if (modalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={makeModalVisible}>
        <View style={styles.modalContainer}>
          <ChangeStatusComponent cancelModal={setModalVisible} />
        </View>
      </Modal>
      <View style={styles.profileContainer}>
        {done && <Image source={{uri: props.item[0].avt}} style={styles.img} />}

        <View style={styles.profileData}>
          <Text style={styles.name}>{props.item[0].name}</Text>
          <Text style={styles.status} numberOfLines={3}>
            {props.item[0].status}
          </Text>
          <View style={styles.btns}>
            {/* {auth().currentUser.uid !== props.item[0].uid ? (
              <TouchableOpacity style={[styles.btn, {marginRight: 10}]}>
                <Text style={styles.btnText}>Message</Text>
              </TouchableOpacity>
            ) : null} */}
            {auth().currentUser.uid === props.item[0].uid ? (
              <>
                <TouchableOpacity
                  style={[styles.btn, {marginRight: 10}]}
                  onPress={makeModalVisible}>
                  <Text style={styles.btnText}>
                    <Icon name="pencil" size={16} /> Status
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logout} onPress={logout}>
                  <Text style={[styles.btnText, {color: '#000'}]}>Logout</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </View>
      </View>
      {/* <PostComponent navigation={props.navigation} /> */}
    </View>
  );
}

export default ProfileComponent;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#e5e5e5',
  },
  modalContainer: {
    width: width,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  profileContainer: {
    width: width,
    height: 145,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    elevation: 5,
    flexDirection: 'row',
  },
  img: {
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
    marginRight: 20,
    backgroundColor: secondarColor,
  },
  profileData: {
    width: width - 160,
    // backgroundColor: '#333333',
  },
  name: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: secondarColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 35,
    marginTop: 5,
    elevation: 5,
  },
  logout: {
    // backgroundColor: secondarColor,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 35,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#000',
    // elevation: 5,
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
  status: {
    width: width - 160,
  },
  btns: {
    flexDirection: 'row',
  },
});
