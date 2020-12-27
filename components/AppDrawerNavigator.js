import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import NotificationScreen from '../screens/NotificationScreen';

 export const AppDrawerNavigator = createDrawerNavigator({
     Home : {
         screen : AppTabNavigator
     },
     Settings : {
         screen : SettingScreen
     },
     Notifications : {
         screen : NotificationScreen
     }
    },
    {
        contentComponent : CustomSideBarMenu
    },
    { 
        initialRouteName : "Home"
 })