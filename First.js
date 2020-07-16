import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  Linking,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import App from './App';
import {secondarColor} from './src/Constants/Theme';

const {width, height} = Dimensions.get('window');

function First(props) {
  const nextScreen = () => {
    props.navigation.navigate('second');
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={secondarColor} />
      <ScrollView>
        <View style={styles.aboutContainer}>
          <View style={styles.header}>
            <Text style={styles.heading}>About Me</Text>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.data}>
              <Text style={styles.dataHeading}>Name : </Text>
              <Text style={styles.dataValue}>Saurabh Kayasth</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.dataHeading}>Contact : </Text>
              <Text style={styles.dataValue}>8655237533</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.dataHeading}>Email : </Text>
              <Text style={styles.dataValue}>
                i.am.saurabh.kayasth@gmail.com
              </Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.dataHeading}>Class : </Text>
              <Text style={styles.dataValue}>TYBSc. Computer Science</Text>
            </View>
            <View style={[styles.data, {flexDirection: 'column'}]}>
              <Text style={styles.dataHeading}>College : </Text>
              <Text style={styles.dataValue}>
                Ruia Autonomous College (Dadar East)
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.aboutContainer}>
          <View style={styles.header}>
            <Text style={styles.heading}>About My Project</Text>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.data}>
              <Text style={styles.dataHeading}>Name : </Text>
              <Text style={styles.dataValue}>Covid-19</Text>
            </View>
            <View
              style={[
                styles.data,
                {flexDirection: 'column', paddingRight: 20},
              ]}>
              <Text style={styles.dataHeading}>Description : </Text>
              <Text style={styles.dataValue}>
                Covid-19 is an Android App which shows latest information about
                Covid-19 and allows its users to post their thought about
                Covid-19.
              </Text>
            </View>
            <View style={[styles.data, {flexDirection: 'column'}]}>
              <Text style={styles.dataHeading}>Features : </Text>
              <Text style={styles.dataValue}>
                - User can{' '}
                <Text style={{color: 'red', fontWeight: 'bold'}}>
                  Register.
                </Text>
              </Text>
              <Text style={styles.dataValue}>
                - User can{' '}
                <Text style={{color: 'red', fontWeight: 'bold'}}>Login.</Text>
              </Text>
              <Text style={styles.dataValue}>
                - User can{' '}
                <Text style={{color: 'red', fontWeight: 'bold'}}>
                  post their thoughts
                </Text>{' '}
                about Covid-19.
              </Text>
              <Text style={styles.dataValue}>
                - User can{' '}
                <Text style={{color: 'red', fontWeight: 'bold'}}>comment</Text>{' '}
                on other users post.
              </Text>
              <Text style={styles.dataValue}>
                - User can{' '}
                <Text style={{color: 'red', fontWeight: 'bold'}}>like</Text>{' '}
                other users post.
              </Text>
              <Text style={styles.dataValue}>
                - User can{' '}
                <Text style={{color: 'red', fontWeight: 'bold'}}>delete</Text>{' '}
                their post.
              </Text>
              <Text style={styles.dataValue}>
                - User can{' '}
                <Text style={{color: 'red', fontWeight: 'bold'}}>share</Text>{' '}
                other users post.
              </Text>
              <Text style={styles.dataValue}>
                - User can{' '}
                <Text style={{color: 'red', fontWeight: 'bold'}}>
                  see other users post
                </Text>
                .
              </Text>
              <Text style={styles.dataValue}>
                - User can{' '}
                <Text style={{color: 'red', fontWeight: 'bold'}}>
                  read latest articles
                </Text>{' '}
                about Covid-19.
              </Text>
              <Text style={styles.dataValue}>
                - User can{' '}
                <Text style={{color: 'red', fontWeight: 'bold'}}>
                  see latest stats
                </Text>{' '}
                of Covid-19.
              </Text>
              <Text style={styles.dataValue}>
                - User can{' '}
                <Text style={{color: 'red', fontWeight: 'bold'}}>
                  see stats of other countres.
                </Text>
              </Text>
              <Text style={styles.dataValue}>
                - User can{' '}
                <Text style={{color: 'red', fontWeight: 'bold'}}>
                  see stats of other states.
                </Text>
              </Text>
            </View>
            <View style={[styles.data, {flexDirection: 'row'}]}>
              <Text style={styles.dataHeading}>Technologies Used : </Text>
              <Text style={styles.dataValue}>React Native</Text>
              <Text style={styles.dataValue}> + Firebase</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={nextScreen} style={styles.btn}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Second(props) {
  const nextScreen = () => {
    props.navigation.navigate('mainApp');
  };

  const openLink = async link => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={secondarColor} />
      <View style={styles.aboutContainer}>
        <View style={styles.header}>
          <Text style={styles.heading}>API List</Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={[styles.data, {flexDirection: 'column'}]}>
            <Text style={styles.dataHeading}>Countries : </Text>
            <TouchableOpacity
              onPress={() =>
                openLink('https://covid19.mathdro.id/api/countries')
              }>
              <Text style={[styles.dataValue, {color: 'blue'}]}>
                https://covid19.mathdro.id/api/countries
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.data, {flexDirection: 'column'}]}>
            <Text style={styles.dataHeading}>States : </Text>
            <TouchableOpacity
              onPress={() =>
                openLink('https://api.covid19india.org/data.json')
              }>
              <Text style={[styles.dataValue, {color: 'blue'}]}>
                https://api.covid19india.org/data.json
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.data, {flexDirection: 'column'}]}>
            <Text style={styles.dataHeading}>Articles : </Text>
            <TouchableOpacity
              onPress={() =>
                openLink(
                  'http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=',
                )
              }>
              <Text
                style={[styles.dataValue, {color: 'blue', paddingRight: 20}]}>
                http://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.aboutContainer}>
        <View style={styles.header}>
          <Text style={styles.heading}>Documentation</Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={[styles.data, {flexDirection: 'column'}]}>
            <Text style={styles.dataHeading}>React Native : </Text>
            <TouchableOpacity
              onPress={() => openLink('https://devdocs.io/react_native/')}>
              <Text style={[styles.dataValue, {color: 'blue'}]}>
                https://devdocs.io/react_native/
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.data, {flexDirection: 'column'}]}>
            <Text style={styles.dataHeading}>RN Firebase: </Text>
            <TouchableOpacity
              onPress={() => openLink('https://rnfirebase.io/')}>
              <Text style={[styles.dataValue, {color: 'blue'}]}>
                https://rnfirebase.io/
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.aboutContainer}>
        <View style={styles.header}>
          <Text style={styles.heading}>For Review Purpose</Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={[styles.data, {flexDirection: 'row'}]}>
            <Text style={styles.dataHeading}>Email : </Text>
            <Text style={[styles.dataValue, {color: 'blue'}]}>
              demo@gmail.com
            </Text>
          </View>
          <View style={[styles.data, {flexDirection: 'row'}]}>
            <Text style={styles.dataHeading}>Password: </Text>
            <Text style={[styles.dataValue, {color: 'blue'}]}>demo@123</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={nextScreen} style={styles.btn}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

function Stacks() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={First}
          name="first"
          options={{
            headerStyle: {
              backgroundColor: secondarColor,
            },
            headerTitle: 'Introduction',
            headerTintColor: '#fff',
            headerTitleStyle: {fontSize: 25},
          }}
        />
        <Stack.Screen
          component={Second}
          name="second"
          options={{
            headerStyle: {
              backgroundColor: secondarColor,
            },
            headerTitle: 'References',
            headerTintColor: '#fff',
            headerTitleStyle: {fontSize: 25},
          }}
        />
        <Stack.Screen
          component={App}
          name="mainApp"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Stacks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  aboutContainer: {
    width: width - 20,
    alignSelf: 'center',
    marginTop: 10,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    // padding: 10,
    // paddingTop: 5,
    overflow: 'hidden',
  },
  header: {
    width: width - 20,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: secondarColor,
    elevation: 15,
  },
  heading: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  btn: {
    width: width - 20,
    height: 45,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: secondarColor,
    elevation: 10,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  dataContainer: {
    padding: 10,
  },
  data: {
    flexDirection: 'row',
    width: width - 20,
  },
  dataHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  dataValue: {
    fontSize: 17,
    color: '#000',
  },
});
