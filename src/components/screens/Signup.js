import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: String,
            password: String,
            confirmedPassword: String
        }
    }

    validateData(){
        if(this.state.password !== this.state.confirmedPassword){
            alert('Passwords do not match!');
            return false;
        }

        else if(this.state.password.length < 4){
            alert('Password needs to have at least 4 characters!');
            return false;
        }
        else{
            const regex = /^[a-zA-Z0-9]{3,}$/;
            if(!regex.test(this.state.username)){
                alert('username contains invalid characters');
                return false;
            }
            else{
                return true;
            }
        }
    }

    signup() {
        if (this.validateData() === true) {
            fetch('http://151.231.2.64:3000/users/signup', {
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

                    alert(res.message);
                    if(res.success){
                        this.props.navigation.navigate('Main');
                    }
                })
                
                .done();
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
                                onChangeText={(username) => this.setState({ username: username.trim() })}

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

                        <View style={styles.textInputContainer}>
                            <Icon name={"lock"} size={18} color="#000" />
                            <TextInput
                                placeholder='Confirm Password'
                                placeholderTextColor='rgba(0,0,0,0.8)'
                                style={styles.textInput}
                                underlineColorAndroid={'transparent'}
                                secureTextEntry={true}
                                onChangeText={(confirmedPassword) => this.setState({ confirmedPassword })}
                            />
                        </View>

                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                this.signup();
                            }}>
                            <Text style={styles.btnText}>Sign Up!</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ paddingRight: 10 }} onPress={
                                () => {
                                    alert("Forgot password Prompt")
                                }
                            }>Forgot your password?</Text>
                            <Text onPress={
                                () => {
                                    this.props.navigation.navigate('Login');
                                }}>Login</Text>
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