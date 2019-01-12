import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import { Constants, Location, Permissions } from 'expo';
import Icon from 'react-native-vector-icons/Entypo';
import MapView, { Marker } from "react-native-maps";
import { MapButton } from "../containers/";
import { styles } from "../screens/Styles";



class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            }
        }
        this.handlePress = this.handlePress.bind(this);
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let currentLoc = await Location.getCurrentPositionAsync({});
        this.setState({
            location: {
                latitude: currentLoc.coords.latitude,
                longitude: currentLoc.coords.longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.09
            },
            markerPosition: {
                latitude: currentLoc.coords.latitude,
                longitude: currentLoc.coords.longitude,
            }
        });
        console.log("Location");
        console.log(this.state.location);
        console.log('values');
        console.log(currentLoc);
    };


    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    handleMapButtonPress() {
        alert("functioncall");
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name="home"
                color={tintColor}
                size={24}
            />
        ),
    };

    handlePress(e) {
        this.setState({
            markers: [
                ... this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate
                }
            ]
        })
    }



    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    region={this.state.location}
                    onPress={this.handlePress}
                >
                    <Marker
                        coordinate={this.state.markerPosition}
                    >
                        <View style={styles.radius}>
                                    <Image
                                        source={{ uri: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t31.0-8/25182460_1751488461568556_3776172208600565036_o.jpg?_nc_cat=102&_nc_ht=scontent-lhr3-1.xx&oh=9f39c6acbd9244bbe2bf921fd9a2a86d&oe=5C96D314' }}
                                        style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                                    />
                                </View>
                    </Marker>
                </MapView>
                <View>
                    <MapButton style={{
                        position: "absolute",
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        backgroundColor: '#fff',
                        borderRadius: 40,
                        top: 200,
                        left: 100
                    }} handlePress={this.handleMapButtonPress} />

                </View>

            </View>
        )
    }
}


export default Main;