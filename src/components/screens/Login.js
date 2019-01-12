import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import { LoginForm } from "../containers/";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    login() {
        this.props.navigation.navigate("Main");
    }


    render() {
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior='padding'>
                <View style={styles.container}>
                    <Text style={styles.header}>MicroMe</Text>
                    <LoginForm navigation={this.props.navigation}/>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: null,
        justifyContent: 'center',
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#84D2F6',
    },
    wrapper:{
        flex: 1
    },
    header:{
        fontSize: 38,
        fontWeight: 'bold',
        color: 'white'

    }
})

export default Login;