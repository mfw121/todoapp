import React from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";

import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import AddTodo from "./screens/AddTodo";

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null
    }
  }
});
const tabBarColor = {
  active: "#96cb7f",
  inactive: "#333"
};
export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name={"th-list"}
            color={focused ? tabBarColor.active : tabBarColor.inactive}
          />
        )
      }
    },
    Add: {
      screen: AddTodo,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            size={20}
            name={"plus"}
            color={focused ? tabBarColor.active : tabBarColor.inactive}
          />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            size={20}
            name={"user"}
            color={focused ? tabBarColor.active : tabBarColor.inactive}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      },
      showIcon: true,
      showLabel: false,
      activeTintColor: "white",
      inactiveTintColor: "black"
    }
  }
);

export const appNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
