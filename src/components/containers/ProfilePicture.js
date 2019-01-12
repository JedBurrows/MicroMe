import React from "react";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';

const icon = <Icon name={"plus"} size={30} color="#01a699" />

export default class ProfilePicture extends React.Component {

    buttonPress(){
        alert("Change profile picture function call");
    }

    render() {
        return (
                <TouchableOpacity title="Profile Picture" style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0)',
                    width: 120,
                    height: 120,
                    backgroundColor: 'white',
                    borderRadius: 120/2,
                    
                }} onPress={this.buttonPress.bind(this)}>
                <Image
                style={{width: 120, height: 120, borderRadius: 120/2,}}
                source={{uri: this.props.imgsrc}}>
                </Image>
                </TouchableOpacity>
           
        );
    }
}