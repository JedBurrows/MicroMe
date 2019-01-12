import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class Friend extends React.Component {

    static navigationOptions = {
        title: '',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name="users"
                color={tintColor}
                size={24}
            />
        ),
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            seed: 1,
            error: null,
            refreshing: false
        };
    }

    componentDidMount() {
        this.makeRequest();
    }

    makeRequest = () => {
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.results : [...this.state.data, ...res.results],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Friends</Text>
                    <Text style={styles.heading}>Sort By:</Text>
                </View>
                <View style={styles.listContainer}>
                    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => (
                                <ListItem
                                    roundAvatar
                                    title={`${item.name.first} ${item.name.last}`}
                                    subtitle={item.email}
                                    avatar={{ uri: item.picture.thumbnail }}
                                    containerStyle={{ borderBottomWidth: 0 }}
                                />
                            )}
                            keyExtractor={item => item.email}
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
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    heading: {
        fontSize: 30,
    },
    listContainer:{
        flex:1
    }
})

export default Friend;