import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class More extends React.Component{

    static navigationOptions = {
        title: '',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="dots-horizontal"
                color={tintColor}
                size={24}
            />
        ),
    };

    render(){
        return(
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Text>This is the More Page</Text>
            </View>
        )
    }
}

export default More;