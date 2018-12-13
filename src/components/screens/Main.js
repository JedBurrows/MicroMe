import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import MapView from "react-native-maps";



class Main extends Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name="home"
                color={tintColor}
                size={24}
            />
        ),
    };


    render() {
        return (
            <View style={{
                height: 100 + "%",
                width: 100 + "%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <MapView style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }}
                    region={{
                        latitude: 55.86515,
                        longitude: -4.25763,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    }}
                >
                </MapView>
            </View>
        )
    }
}

export default Main;