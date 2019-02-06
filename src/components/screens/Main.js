import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Platform, Alert } from "react-native";
import { Constants, Location, Permissions } from 'expo';
import Icon from 'react-native-vector-icons/Entypo';
import MapView, { Marker, Polyline as MapPolyline } from "react-native-maps";
import { MapButton } from "../containers/";
import { styles } from "../screens/Styles";
import Polyline from '@mapbox/polyline';


const API_KEY = 'AIzaSyAmrK1oa7p6dAZwcqRZJ1Ut4eBI3uw67oU';



class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            },
            markers: [],
            coords: [],
            isTracking: false,
        }
        this.handlePress = this.handlePress.bind(this);
    }

    componentDidMount() {
        // this.getDirections("55.814018,-4.322100", "55.824791,-4.349150")
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    async getDirections(startLoc, destinationLoc) {
        try {
            // let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&mode=walking&key=${API_KEY}`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            this.setState({ coords: coords })
            return coords
        } catch (error) {
            alert(error)
            return error
        }
    }


    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        //let currentLoc = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        const options = {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 5000,
            distanceInterval: 5
        }
        Location.watchPositionAsync(options, (currentLoc) => {
            console.log(currentLoc.coords);
            if (this.state.region.latitude !== currentLoc.coords.latitude && this.state.region.longitude !== currentLoc.coords.longitude) {
                this.setState({
                    region: {
                        latitude: currentLoc.coords.latitude,
                        longitude: currentLoc.coords.longitude,
                        latitudeDelta: 0.0009,
                        longitudeDelta: 0.0001
                    },
                    markerPosition: {
                        latitude: currentLoc.coords.latitude,
                        longitude: currentLoc.coords.longitude,
                    }
                }, () => {
                    console.log('Marker position' + this.state.markerPosition.latitude);
                })
            }
        })
    };


    handleMapButtonPress = () => {
        this.setState({ isTracking: !this.state.isTracking }, () => {
            if (this.state.isTracking === true) {
                alert('beginning tracking');
                let interval = setInterval(() => {
                    if (this.state.isTracking === false) {
                        alert("stopping tracking");
                        clearInterval(interval);
                    }
                    this.setState({
                        markers: [
                            ... this.state.markers,
                            {
                                coordinate: this.state.markerPosition
                            }
                        ],
                        coords: [
                            ... this.state.coords,
                            {
                                latitude: this.state.markerPosition.latitude,
                                longitude: this.state.markerPosition.longitude
                            }
                        ]
                    }, () =>{
                        console.log('adding marker');
                    })
                }, 2000);
            }
        })
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
        // const newMarkersArray = [...this.state.markers, e.nativeEvent.coordinate];
        // this.setState({ markers: newMarkersArray })
        // console.log(this.state.markers);

        console.log(e.nativeEvent.coordinate);
    }

    onRegionChange(region) {
        this.setState({ region });
    }


    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChange.bind(this)}
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
                    {/* {this.state.markers.map(marker => (
                        <Marker
                            coordinate={marker.coordinate}
                        />
                    ))} */}

                    <MapPolyline
                        coordinates={this.state.coords}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                    />

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
                    }} handlePress={this.handleMapButtonPress.bind(this)} />

                </View>

            </View>
        )
    }
}


export default Main;