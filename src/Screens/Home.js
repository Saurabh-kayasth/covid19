import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  Dimensions,
} from 'react-native';
import HeaderComponent from '../Components/HeaderComponent';
import CaseComponent from '../Components/CaseComponent';
import PostComponent from '../Components/PostComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CreatePostComponent from '../Components/CreatePostComponent';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const axios = require('react-native-axios');
const {width, height} = Dimensions.get('window');

function Home(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState();
  const [countries, setCountries] = useState();
  const [done, setDone] = useState(false);

  useEffect(() => {
    listenForItems(getRef().child('posts'));
    getCountries();
  }, [props]);

  function getRef() {
    return database().ref();
  }

  function listenForItems(friendsRef) {
    var user = auth().currentUser;
    console.log('============================', user);
    // auth().onAuthStateChanged(user => {
    //   if (user) {
    friendsRef.on('value', snap => {
      var items = [];
      snap.forEach(child => {
        // if (child.val().email === user.email) {
        items.push({
          // name: child.val().name,
          uid: child.val().uid,
          message: child.val().message,
          dateTime: child.val().dateTime,
          postId: child.val().postId,
        });
        // }
      });

      setPosts(items, () => {});
      console.log(items);
    });
  }

  const makeModalVisible = () => {
    if (modalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  };

  const getCountries = () => {
    setDone(false);
    axios({
      method: 'GET',
      url: 'https://covid19.mathdro.id/api/countries',
    })
      .then(response => {
        var items = [];
        for (var i = 0; i < response.data.countries.length; i++) {
          items.push(response.data.countries[i].name);
        }
        setCountries(items);
        setDone(true);
        // console.log(this.state.countries);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <HeaderComponent header={'Home'} navigation={props.navigation} />
      <ScrollView>
        {done && <CaseComponent countries={countries} />}
        <PostComponent items={posts} navigation={props.navigation} />
      </ScrollView>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={makeModalVisible}>
        <View style={styles.modalContainer}>
          <CreatePostComponent cancelModal={setModalVisible} />
        </View>
      </Modal>
      <TouchableOpacity style={styles.btn} onPress={makeModalVisible}>
        <Icon name="pencil" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  modalContainer: {
    width: width,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  btn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    backgroundColor: '#48bb78',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});
