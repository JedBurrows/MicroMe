import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';

const icon = <Icon name={"plus"} size={30} color="#01a699" />

export default class MapButton extends React.Component {

    buttonPress(){
        this.props.handlePress();
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={this.props.style} onPress={this.buttonPress.bind(this)}>
                <Text>Go!</Text>

                {/* <Icon name={"plus"} size={30} color="#84D2F6" /> */}
                </TouchableOpacity>
            </View>
        );
    }
}