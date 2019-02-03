import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, AsyncStorage } from "react-native";
//import { LoginForm } from "../containers/";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: String,
            password: String,
        }

    }

    login() {
        fetch('http://ip:3000/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })

            .then((response) => response.json())
            .then((res) => {

                if (res.success === true) {
                    try {
                        AsyncStorage.setItem('user', res.user);
                    }
                    catch (err) {
                        console.log(err);
                    }
                    this.props.navigation.navigate('Main');
                }
                else {
                    alert(res.message);
                }
            })
            .done();
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    async _loadInitialState() {
        try {
            const value = await AsyncStorage.getItem(user);
            if (value !== null) {
                this.props.navigation.navigate('Main');
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior='padding'>
                <View style={styles.container}>
                    <Text style={styles.header}>MicroMe</Text>
                    <View style={styles.fromContainer}>
                        <View style={styles.textInputContainer}>
                            <Icon name={"email-outline"} size={18} color="#000" />
                            <TextInput
                                placeholder='Username'
                                placeholderTextColor='rgba(0,0,0,0.8)'
                                style={styles.textInput}
                                underlineColorAndroid={'transparent'}
                                onChangeText={(username) => this.setState({username: username.trim()})}

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
                                onChangeText={(password) => this.setState({ password })}

                            />
                        </View>

                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                this.login();
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
                                    this.props.navigation.navigate('Signup');
                                }}>Signup</Text>
                        </View>
                    </View>
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
    wrapper: {
        flex: 1
    },
    header: {
        fontSize: 38,
        fontWeight: 'bold',
        color: 'white'

    },
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

export default Login;