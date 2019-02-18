import React from "react";
import { View, Text, TouchableHighlight, StyleSheet, Modal, Alert, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const icon = <Icon name={"plus"} size={30} color="#01a699" />

export default class PostRunModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: this.props.modalVisible,
            RouteName: String
        }
    }

    hideModal = () => {
        this.setState({
            modalVisible: false
        })
    }

    showModal = () => {
        this.setState({
            modalVisible: true
        })
    }

    postRoute = () => {
        if (this.state.RouteName === '' || this.state.RouteName === null) {
            alert('Please enter a valid route name');
        }
        else {
            fetch('http://151.231.2.64:3000/users/PostRoute', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    RouteName: this.state.RouteName,
                    coords: JSON.stringify(this.props.coords),
                    creator: this.props.username
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.hideModal();
                }}>
                <View style={styles.container}>
                    <View style={styles.inner}>
                        <View style={styles.title}>
                            <Text style={styles.text}>Route Debrief</Text>
                        </View>
                        <View style={styles.topSection}>
                            <View style={styles.icon}>
                                <Icon name='run' color='#000' size={28} />
                                <Text style={styles.text}>5 km</Text>
                            </View>
                            <View style={styles.icon}>
                                <Icon name='timer-sand' color='#000' size={28} />
                                <Text style={styles.text}>40 mins 5 sec</Text>
                            </View>
                        </View>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                placeholder='RouteName'
                                placeholderTextColor='rgba(0,0,0,0.8)'
                                style={styles.textInput}
                                underlineColorAndroid={'transparent'}
                                onChangeText={(RouteName) => this.setState({ RouteName })}
                            />
                        </View>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                this.postRoute();
                            }}>
                            <Text style={styles.btnText}>Save Route</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton}
                            onPress={() => {
                                this.hideModal();
                            }}>
                            <Text style={styles.btnText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    inner:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
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
    },
    btnText: {
        color: '#fff',
        fontSize: 20
    }, button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#84D2F6',
        borderWidth: .5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        margin: 10,
        alignSelf: 'stretch'
    },
    topSection: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    title: {
        alignItems: 'center',
        paddingBottom: 10 + '%',
        height: 5 + '%',
    },
    text: {
        fontSize: 20
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    icon: {
        flexDirection: 'row',
    },
    closeButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderWidth: .5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        margin: 10,
        alignSelf: 'stretch'
    }
})