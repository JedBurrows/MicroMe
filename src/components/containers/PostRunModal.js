import React from "react";
import { View, Text, TouchableHighlight, StyleSheet, Modal, Alert, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';

const icon = <Icon name={"plus"} size={30} color="#01a699" />

export default class PostRunModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: this.props.modalVisible,
            RouteName: String
        }
    }

    setModalVisible = (bool) => {
        this.setState({
            modalVisible: bool
        })
    }

    postRoute = () => {
        if(this.state.RouteName === '' || this.state.RouteName === null){
            alert('Please enter a valid route name');
        }
        else{
            fetch('http://151.231.2.64:3000/users/PostRoute', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                RouteName: this.state.RouteName,
                //coords: this.props.coords
            })
        })

            .then((response) => response.json())
            .then((res) => {

                if (res.success === true) {
                    alert(res.message);
                }
                else {
                    alert(res.message);
                }
            })
            .done();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text>Saving your Route!</Text>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    placeholder='RouteName'
                                    placeholderTextColor='rgba(0,0,0,0.8)'
                                    style={styles.textInput}
                                    underlineColorAndroid={'transparent'}
                                    onChangeText={(RouteName) => this.setState({ RouteName })}
                                />
                            </View>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={() => {
                                    this.postRoute();
                                }}>
                                <Text>Save Route</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: null,
        justifyContent: 'center',
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#84D2F6'
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
    textInput: {
        flex: 1,
    }
})