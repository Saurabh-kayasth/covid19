import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
  AsyncStorage,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {primaryColor, secondarColor} from '../Constants/Theme';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import ForgetPassComponent from '../Components/ForgetPassComponent';

const {width, height} = Dimensions.get('window');
const logo =
  'https://firebasestorage.googleapis.com/v0/b/covid19-5a2e1.appspot.com/o/Assets%2Flogo.png?alt=media&token=99e880a2-582a-4ed9-8433-852f7bc65ea4';
const login =
  'https://firebasestorage.googleapis.com/v0/b/covid19-5a2e1.appspot.com/o/Assets%2Flogin.jpg?alt=media&token=4eaf5112-b4d6-46cf-8ffc-308857fe8bda';
function LoginScreen(props) {
  const [iconName, setIconName] = useState('ios-eye-off');
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState();

  const showPasswordFunc = () => {
    if (iconName === 'ios-eye') {
      setIconName('ios-eye-off');
      setShowPassword(true);
    } else {
      setIconName('ios-eye');
      setShowPassword(false);
    }
  };

  // async login = () => {
  const onLoginPress = async () => {
    // this.setState({errorMessage: null, loading: true});
    setLoading(true);
    // const {email, password} = this.state;
    console.log(email);
    console.log(password);
    if (email.length > 1 || password.length > 1) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setLoading(false);
          console.log('succesful');
          props.navigation.navigate('tabs');
        })
        .catch(error => {
          // var errorCode = error.code;
          var errorMessage = error.message;
          setError(errorMessage);
          setLoading(false);
        });
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);

      auth().onAuthStateChanged(user => {
        if (user) {
          setLoading(false);
        }
      });
    } else {
      setError('Please enter email and password.');
      setLoading(false);
    }
  };

  const makeModalVisible = () => {
    if (modalVisible) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  };
  // };

  const navigaateToRegister = () => {
    // setLoading(true);
    props.navigation.navigate('register');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image style={styles.logo} source={{uri: logo}} />
          <Text style={styles.logoText}>Covid-19</Text>
        </View>
        {/* <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Skip</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.loginContainer}>
        <Image style={styles.image} source={{uri: login}} />
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Icon name="ios-person" size={20} color={secondarColor} />
            <TextInput
              placeholder="Enter email address..."
              placeholderTextColor="gray"
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="ios-key" size={20} color={secondarColor} />
            <TextInput
              placeholder="Enter password..."
              placeholderTextColor="gray"
              style={styles.input}
              secureTextEntry={showPassword}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity onPress={showPasswordFunc}>
              <Icon name={iconName} size={20} color={secondarColor} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn2} onPress={onLoginPress}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.options}>
            <TouchableOpacity onPress={makeModalVisible}>
              <Text style={styles.text}>Forgot Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigaateToRegister}>
              <Text style={styles.text}>Create Account</Text>
            </TouchableOpacity>
          </View>
          <Text style={{color: '#ff0000', textAlign: 'center'}}>{error}</Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={makeModalVisible}
        onDismiss={makeModalVisible}>
        <View style={styles.modalContainer}>
          <ForgetPassComponent cancelModal={setModalVisible} />
        </View>
      </Modal>
      <Spinner visible={loading} />
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    backgroundColor: '#fff',
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
  logo: {
    height: 40,
    width: 40,
    transform: [{rotateY: '180deg'}],
  },
  logoText: {
    fontSize: 22,
    color: '#fff',
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
  image: {
    width: '100%',
    height: '50%',
    alignSelf: 'center',
    marginTop: 30,
  },
  formContainer: {
    width: '90%',
    padding: 10,
    alignSelf: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 45,
    width: '100%',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: secondarColor,
    padding: 10,
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 15,
  },
  input: {
    color: secondarColor,
    fontSize: 15,
    height: 40,
    paddingLeft: 15,
    width: '85%',
  },
  btn2: {
    width: '100%',
    height: 40,
    backgroundColor: secondarColor,
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 17,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  text: {
    color: secondarColor,
    marginTop: 5,
  },
  loginContainer: {
    justifyContent: 'center',
    // height: height - 60,
  },
  modalContainer: {
    width: width,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
});
