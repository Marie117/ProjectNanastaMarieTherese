import React from 'react';   
import { createAppContainer } from 'react-navigation';  
import { createStackNavigator } from 'react-navigation-stack';
import Liste from './Liste'
import Login from './Login'
import Add from './Add'
import List from './List'
import DateTime from './DateTime'



const AppNavigator = createStackNavigator(  
    {  
        Login: Login,  
        Liste: Liste,
        Add: Add,
        List: List,
        DateTime : DateTime
      
    },  
    {  
        initialRouteName: "Login"  
    }  
);  
  
const AppContainer = createAppContainer(AppNavigator);  
export default class App extends React.Component {
    render() {  
        return <AppContainer />
             
    }  
}  