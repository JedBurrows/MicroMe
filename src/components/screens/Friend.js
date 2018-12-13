import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

class Friend extends React.Component{

    static navigationOptions = {
        title: '',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="users"
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
                <Text>This is the Friend Page</Text>
            </View>
        )
    }
}

export default Friend;