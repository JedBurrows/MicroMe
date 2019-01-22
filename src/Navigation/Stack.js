import { createStackNavigator, createAppContainer } from "react-navigation";
import { Login, Signup } from "../components/screens";
import TabContainer from "./Tabs";


const AppNavigator = createStackNavigator({
    Login: {
      screen: Login,
     navigationOptions: () => ({
      header: null,
      headerBackTitle: null
     }),
    },
    Signup: {
      screen: Signup,
     navigationOptions: () => ({
      header: null,
      headerBackTitle: null
     }),
    },
    Main: {
      screen: TabContainer,
      navigationOptions: () => ({
        headerLeft: null
       })
    }
},
{
    defaultNavigationOptions: {
        title: "MicroMe",
        headerStyle: {
          backgroundColor: '#84D2F6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
}); 


const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;