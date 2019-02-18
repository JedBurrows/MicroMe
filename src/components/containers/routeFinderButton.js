import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, Modal } from "react-native";

export default class RouteFinderButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: 'find Route',
        }
    }

    handlePress = () => {
        this.props.onPress();
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={this.props.style} onPress={this.handlePress.bind(this)}>
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