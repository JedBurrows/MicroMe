import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ProfilePicture } from "../containers";
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from "react-native-vector-icons/Entypo";

class Profile extends React.Component {

    static navigationOptions = {
        title: '',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name="user"
                color={tintColor}
                size={24}
            />
        ),
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <ProfilePicture imgsrc='https://scontent-lhr3-1.xx.fbcdn.net/v/t31.0-8/25182460_1751488461568556_3776172208600565036_o.jpg?_nc_cat=102&_nc_ht=scontent-lhr3-1.xx&oh=9f39c6acbd9244bbe2bf921fd9a2a86d&oe=5C96D314' />
                    <Text style={{ fontSize: 30 }}>Jed Burrows</Text>
                </View>
                <View style={styles.middleSection}>
                    <EntypoIcon name='star' color='#000' size={28}/>
                    <Icon name='users' color='#000' size={28}/>
                    <Icon name='trophy' color='#000' size={28}/>
                </View>
                <View style={styles.stats}>
                    <Text style={{ fontSize: 30 }}>Running</Text>
                    <Text style={{ fontSize: 30 }}>|</Text>
                    <Text style={{ fontSize: 30 }}>Cycling</Text>
                </View>
                <View style={styles.runningStats}>
                    <Text style={{ fontSize: 25 }}>Calories Burned: 200kcal</Text>
                    <Text style={{ fontSize: 25 }}>Top speed this week: 20m/s </Text>
                    <Text style={{ fontSize: 25 }}>Distance Travelled: 6.2 </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topSection: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    middleSection: {
        width: 100 + '%',
        height: 10 + '%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    middleText: {
        paddingLeft: 5 + '%',
        paddingRight: 5 + '%',
        fontSize: 18
    },
    stats: {
        width: 100 + '%',
        height: 20 + '%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',

    },
    runningStats: {
        flexDirection: 'column',
        alignItems: 'center'
    }
});

export default Profile;