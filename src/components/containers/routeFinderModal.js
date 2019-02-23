import React from "react";
import { View, Text, TouchableHighlight, StyleSheet, Modal, Alert, TextInput, TouchableOpacity, FlatList } from "react-native";
import { List, ListItem, Button } from 'react-native-elements';

export default class RouteFinderModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: this.props.modalVisible,
            data: [],
            error: null,


        }
    }

    componentDidMount() {
        this.makeRequest();
    }

    componentDidUpdate(prevProps) {
        if(this.props.modalVisible !== prevProps.modalVisible){
            this.setState({
                modalVisible: !this.state.modalVisible
            })
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

    onPress = (item) => {
        this.props.handlePress(item);
        this.hideModal();
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
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.hideModal();
                }}>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Routes</Text>
                </View>
                <View style={styles.listContainer}>
                    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => (
                                <ListItem
                                    button onPress={() => this.onPress(item)} 
                                    roundAvatar
                                    title={`${item.Name}`}
                                    subtitle={item.routeCreator}
                                />
                            )}
                            keyExtractor={item => item.Name}
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
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    button: {
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
    },
    listContainer: {
        flex: 1,
    }
})