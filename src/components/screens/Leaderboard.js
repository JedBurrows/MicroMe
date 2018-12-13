import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

class LeaderBoard extends React.Component{

    static navigationOptions = {
        title: '',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="list"
                color={tintColor}
                size={24}
            />
        ),
    };

    render(){
        return(
            <View style={{
                height: 100 + "%",
                width: 100 + "%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text>This is the LeaderBoard Page</Text>
            </View>
        )
    }
}

export default LeaderBoard;