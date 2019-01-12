import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class LoginForm extends React.Component {
    render() {
        return (
            <View style={styles.fromContainer}>
                <View style={styles.textInputContainer}>
                    <Icon name={"email-outline"} size={18} color="#000" />
                    <TextInput
                        placeholder='Username'
                        placeholderTextColor='rgba(0,0,0,0.8)'
                        style={styles.textInput}
                        underlineColorAndroid={'transparent'}

                    />
                </View>
                <View style={styles.textInputContainer}>
                    <Icon name={"lock"} size={18} color="#000" />
                    <TextInput
                        placeholder='Password'
                        placeholderTextColor='rgba(0,0,0,0.8)'
                        style={styles.textInput}
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={true}

                    />
                </View>

                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        this.props.navigation.navigate("Main");
                    }}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ paddingRight: 10 }} onPress={
                        () => {
                            alert("Forgot password Prompt")
                        }
                    }>Forgot your password?</Text>
                    <Text onPress={
                        () => {
                            alert('Signup prompt')
                        }}>Signup</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fromContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    textInput: {
        flex: 1,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        borderWidth: .5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        margin: 10,
        alignSelf: 'stretch'
    },
    btnText: {
        color: '#fff',
        fontSize: 20
    },
    textInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: '#000',
        height: 40,
        borderRadius: 5,
        margin: 10
    },
    iconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center'
    }
})