import React from "react";
import { View, Text, TouchableHighlight, StyleSheet, Modal, Alert, TextInput, TouchableOpacity, FlatList } from "react-native";
import { List, ListItem } from 'react-native-elements';

export default class RouteFinderModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: true,
            data: [],
            error: null,


        }
    }

    componentDidMount() {
        this.makeRequest();
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

    makeRequest = () => {
        fetch('http://151.231.2.64:3000/users/getRoutes')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.data,
                    error: res.error || null,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({ error })
            })
    };

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.hideModal();
                }}>
                <View style={styles.container}>
                    <View style={styles.inner}>
                        <View style={styles.title}>
                            <Text style={styles.text}>Routes</Text>
                            <View style={styles.listContainer}>
                                <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                                    <FlatList
                                        data={this.state.data}
                                        renderItem={({ item }) => (
                                            <ListItem
                                                name={`${item.name}`}

                                            />
                                        )}
                                        ItemSeparatorComponent={this.renderSeparator}
                                        ListHeaderComponent={this.renderHeader}
                                        ListFooterComponent={this.renderFooter}
                                        onRefresh={this.handleRefresh}
                                        refreshing={this.state.refreshing}
                                        onEndReached={this.handleLoadMore}
                                        onEndReachedThreshold={50}
                                    />
                                </List>
                            </View>
                        </View>
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
    inner: {
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