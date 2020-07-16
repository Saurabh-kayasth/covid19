import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import MainTabs from './src/Config/router';
// import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
// import Spinner from 'react-native-loading-spinner-overlay';

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginChecked, setLoginChecked] = useState(false);
  // const [setLoading] = useState();

  useEffect(() => {
    // setLoading(true);
    auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setLoginChecked(true);
        // setLoading(false);
        console.log(user);
      } else {
        setIsLoggedIn(false);
        setLoginChecked(true);
        // setLoading(false);
        console.log('false');
      }
    });
  }, []);

  console.disableYellowBox = true;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {loginChecked && <MainTabs routeName={isLoggedIn ? 'tabs' : 'login'} />}
      {/* {loading && <Spinner visible={loading} />} */}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
});
