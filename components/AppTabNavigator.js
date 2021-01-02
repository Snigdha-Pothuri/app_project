
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import petDonateScreen from '../screens/petDonateScreen';
import petAdoptScreen from '../screens/petAdoptScreen';



export const AppTabNavigator = createBottomTabNavigator({
 Adopt_Pet : {
    screen: petAdoptScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../images/adopt.jpg")} style={{width:20, height:20}}/>,
      tabBarLabel : "Adopt a Pet",
    }
  },
Donate_pet : {
    screen: petDonateScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../images/donate.jpg")} style={{width:20, height:20}}/>,
      tabBarLabel : "Donate a Pet",
    }
  }
});