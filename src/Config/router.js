import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Screens/Home';
import Peoples from '../Screens/Peoples';
import Profile from '../Screens/Profile';
import Stats from '../Screens/Stats';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../Screens/Login';
import RegisterComponent from '../Screens/RegisterComponent';
import PostDataComponent from '../Components/PostDataComponent';
import OtherUserProfile from '../Screens/OtherUserProfile';
import PhoneBook from '../Screens/PhoneBook';
import Info from '../Screens/Info';
import News from '../Screens/News';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        inactiveTintColor: 'gray',
        activeTintColor: '#48bb78',
        tabStyle: {
          backgroundColor: '#fff',
          height: 55,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={Info}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'book' : 'book-outline'}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Stats}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'chart-bar' : 'chart-bar'}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="People"
        component={Peoples}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'account-multiple' : 'account-multiple-outline'}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'account' : 'account-outline'}
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function MainStack(props) {
  console.log(props.routeName);
  const [routeName] = useState(props.routeName);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen
          component={Tabs}
          name="tabs"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={LoginScreen}
          name="login"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={RegisterComponent}
          name="register"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Profile}
          name="profile"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={PostDataComponent}
          name="postData"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={OtherUserProfile}
          name="otherUser"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={PhoneBook}
          name="phoneBook"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={News}
          name="news"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
