import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';

const icon = <Icon name={"plus"} size={30} color="#01a699" />

export default class MapButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: 'Go'
        }
    }

    buttonPress() {
        this.props.handlePress();
    }

    changeText() {
        if (this.state.text === 'Go') {
            this.setState({
                text: 'Stop'
            })
        }
        else {
            this.setState({
                text: 'Go'
            })
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={this.props.style} onPress={this.buttonPress.bind(this)}>
                    <Text style={styles.text} >{this.state.text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20
    }
})