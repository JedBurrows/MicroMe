import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Main, Profile, Friend, LeaderBoard, More } from "../components/screens/";

const Tabs = createBottomTabNavigator({
    Friend: Friend,
    LeaderBoard: LeaderBoard,
    Home: Main,
    Profile: Profile,
    More: More
},
    {
        tabBarOptions: {
            showLabel: false, // hide labels
            activeTintColor: 'white', // active icon color
            inactiveTintColor: '#042A2B',  // inactive icon color
            style: {
                backgroundColor: '#84D2F6' // TabBar background
            }
        },
        initialRouteName: "Home"

    });


const TabContainer = createAppContainer(Tabs);

export default TabContainer;