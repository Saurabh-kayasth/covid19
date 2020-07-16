import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
  AsyncStorage,
  KeyboardAvoidingView,
} from 'react-native';
import {primaryColor, secondarColor} from '../Constants/Theme';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Spinner from 'react-native-loading-spinner-overlay';
const logo =
  'https://firebasestorage.googleapis.com/v0/b/covid19-5a2e1.appspot.com/o/Assets%2Flogo.png?alt=media&token=99e880a2-582a-4ed9-8433-852f7bc65ea4';

const {width} = Dimensions.get('window');

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
      errorMessage: null,
      displaySource:
        'https://firebasestorage.googleapis.com/v0/b/woak-cda27.appspot.com/o/avatar%2Favatar_1.png?alt=media&token=40f461d9-9296-4aed-a51d-4f17c597bab8',
      user_uid: '',
      user_profile: '',
      avatar_icon1:
        'https://firebasestorage.googleapis.com/v0/b/woak-cda27.appspot.com/o/avatar%2Favatar_3.png?alt=media&token=128fcda4-1ead-4538-9694-b317d2924abe',
      avatar_icon2:
        'https://firebasestorage.googleapis.com/v0/b/woak-cda27.appspot.com/o/avatar%2Favatar_2.png?alt=media&token=23fe8037-6a00-42e1-87ca-64913a3c9606',
      avatar_icon3:
        'https://firebasestorage.googleapis.com/v0/b/woak-cda27.appspot.com/o/avatar%2Favatar_1.png?alt=media&token=40f461d9-9296-4aed-a51d-4f17c597bab8',
      avatar_icon4:
        'https://firebasestorage.googleapis.com/v0/b/woak-cda27.appspot.com/o/avatar%2Favatar_4.png?alt=media&token=138b02a6-90ca-4f92-aad4-298549b871e3',
      avatar_selected: true,
      isLoggedIn: false,
    };
  }

  selectAvatar = avt => {
    this.setState({
      displaySource: avt,
      avatar_selected: true,
    });
  };

  getRef() {
    return database().ref();
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#2b2b39',
      elevation: null,
    },
    headerTitleStyle: {
      color: 'white',
    },
  };

  async onRegisterPress() {
    this.setState({errorMessage: null, loading: true});
    const {email, password, name} = this.state;
    console.log(email);
    console.log(name);
    console.log(password);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({loading: false});
      })
      .catch(error => {
        // var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({errorMessage, loading: false});
      });

    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('password', password);

    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('password', password);

    if (this.state.avatar_selected) {
      this.registerWithAvatar(this.state.displaySource, password);
    } else {
      // this.uploadImage(this.state.avatarSource);
    }
  }

  registerWithAvatar = async (uri, password) => {
    auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid, user.email);
        this.setState({
          loading: true,
          user_uid: user.uid,
        });
        this.getRef()
          .child('users/' + user.uid)
          .set({
            email: user.email,
            uid: user.uid,
            name: this.state.name,
            avatar: uri,
            status: '',
          });
        this.setState({
          loading: false,
          isLoggedIn: true,
        });
        this.props.navigation.navigate('tabs');
      }
    });
  };

  navigateToBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image style={styles.logoTop} source={{uri: logo}} />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.navigateToBack()}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={{uri: this.state.displaySource}} />
        </View>
        <View style={styles.avatarConatiner}>
          <TouchableOpacity
            onPress={() => this.selectAvatar(this.state.avatar_icon1)}>
            <Image
              style={styles.avatarUser}
              source={{uri: this.state.avatar_icon1}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.selectAvatar(this.state.avatar_icon2)}>
            <Image
              style={styles.avatarUser}
              source={{uri: this.state.avatar_icon2}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.selectAvatar(this.state.avatar_icon3)}>
            <Image
              style={styles.avatarUser}
              source={{uri: this.state.avatar_icon3}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.selectAvatar(this.state.avatar_icon4)}>
            <Image
              style={styles.avatarUser}
              source={{uri: this.state.avatar_icon4}}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          value={this.state.name}
          onChangeText={name => this.setState({name})}
          style={styles.input}
          placeholder="Enter Name..."
          placeholderTextColor="gray"
          returnKeyType="next"
          onSubmitEditing={() => this.emailInput.focus()}
        />
        <TextInput
          value={this.state.email}
          onChangeText={email => this.setState({email})}
          style={styles.input}
          placeholderTextColor="gray"
          returnKeyType="next"
          ref={input => (this.emailInput = input)}
          onSubmitEditing={() => this.passwordCInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter Email..."
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({password})}
          style={styles.input}
          placeholder="Enter Password..."
          secureTextEntry={true}
          placeholderTextColor="gray"
          ref={input => (this.passwordCInput = input)}
          onSubmitEditing={() => this.passwordInput.focus()}
          returnKeyType="next"
        />
        {/* <TextInput
          value={this.state.password}
          onChangeText={password_confirmation =>
            this.setState({password_confirmation})
          }
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          placeholderTextColor="gray"
          returnKeyType="go"
          ref={input => (this.passwordInput = input)}
        /> */}
        <TouchableHighlight
          onPress={this.onRegisterPress.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
        <Spinner visible={this.state.loading} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff',
    // padding: 20,
    // justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    padding: 10,
    backgroundColor: primaryColor,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 10,
  },
  headerLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoTop: {
    height: 40,
    width: 40,
    transform: [{rotateY: '180deg'}],
  },
  logoText: {
    fontSize: 22,
    color: secondarColor,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  btn: {
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: secondarColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
  },
  btnText: {
    color: '#fff',
  },
  avatarConatiner: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10,
    borderWidth: 0.5,
    marginBottom: 20,
    width: width - 40,
    height: 85,
    borderColor: '#7f7f88',
    padding: 17,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  avatarUser: {
    height: 50,
    width: 50,
    borderRadius: 25,
    elevation: 10,
  },
  logoContainer: {
    alignItems: 'center',
    // flexGrow: 1,
    marginBottom: 25,
    height: '25%',
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 30,
    borderWidth: 3,
    borderColor: secondarColor,
    borderRadius: 100,
    elevation: 10,
  },
  logoShadowContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '30%',
    width: '30%',
    borderRadius: 100,
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: secondarColor,
    alignSelf: 'center',
  },
  input: {
    height: 45,
    width: 350,
    marginBottom: 10,
    // backgroundColor: '#2b2b39',
    color: '#000',
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 10,
    alignSelf: 'center',
  },
  button: {
    width: width - 40,
    height: 50,
    backgroundColor: secondarColor,
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    paddingVertical: 15,
    marginBottom: 10,
    // borderWidth: 1,
    // borderColor: '#7f7f88',
    borderRadius: 10,
    elevation: 10,
  },
  buttonText: {
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
  },
  subtext: {
    color: '#ffffff',
    width: 160,
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 20,
  },
  error: {
    margin: 8,
    marginBottom: 0,
    color: 'red',
    textAlign: 'center',
  },
});
