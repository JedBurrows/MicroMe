import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Platform, AppState, Dimensions } from "react-native";
import { Constants, Location, Permissions, TaskManager } from 'expo';
import Icon from 'react-native-vector-icons/Entypo';
import MapView, { Marker, Polyline as MapPolyline, AnimatedRegion } from "react-native-maps";
import { MapButton, PostRunModal } from "../containers/";
import Polyline from '@mapbox/polyline';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const API_KEY = 'AIzaSyAmrK1oa7p6dAZwcqRZJ1Ut4eBI3uw67oU';
const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
        // Error occurred - check `error.message` for more details.
        return;
    }
    if (data) {
        const locations = data.locations;
        let newArr = locations.concat(global.locations);
        global.locations = newArr;
        console.log('length');
        console.log(newArr.length);
    }
});

class Main extends Component {

    constructor(props) {
        super(props);
        this.modalElement = React.createRef();
        this.state = {
            enabled: Boolean,
            isMoving: Boolean,
            showsUserLocation: false,
            location: [],
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009
            },
            markerPosition: new AnimatedRegion({
                latitude: 22,
                longitude: 19
            }),
            markers: [],
            coords: [],
            isTracking: false,
            appState: AppState.currentState,
            interval: null,
            hasAnimated: false
        }
        this.handlePress = this.handlePress.bind(this);
    }

    componentDidMount() {
        // this.getDirections("55.814018,-4.322100", "55.824791,-4.349150")
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        }
        const options = {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 2000,
            distanceInterval: 0
        }
        AppState.addEventListener('change', this._handleAppStateChange);
        Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, options);
        const interval = setInterval(this._getLocationAsync, 1000);
        this.setState({ interval })
        alert('newVersion 5');
        global.locationOnStateChange = {
            coords: {
                latitude: 0,
                longitude: 0
            }
        }
    }

    componentWillUnmount() {
        Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        AppState.removeEventListener('change', this._handleAppStateChange);
        clearInterval(this.state.interval);
    }


    _handleAppStateChange = (nextAppState) => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            console.log('App has come to the foreground!');
            this._map.forceUpdate();
            if (global.length > 0) {
                this.updateCoords();
            }
        }
        else {
            console.log('App is in the background');
            if (this.state.isTracking === true) {
                global.length = global.locations.length;
                global.locationOnStateChange = global.locations[0];
                console.log('setting length');
            }
        }
        this.setState({ appState: nextAppState });
    };

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
        let currentLoc = await global.locations[0];
        if (this.state.hasAnimated === false) {
            await this.setState({
                region: {
                    latitude: currentLoc.coords.latitude,
                    longitude: currentLoc.coords.longitude,
                    latitudeDelta: 0.0009,
                    longitudeDelta: ASPECT_RATIO * 0.009
                },
                hasAnimated: true
            }, () => {
                this._map.animateToRegion(this.state.region, 1000);
                console.log('animating to region');
            })
        }
        await this.setState({
            markerPosition: {
                latitude: currentLoc.coords.latitude,
                longitude: currentLoc.coords.longitude,
            }
        })

    };

    showModal = () => {
        this.modalElement.current.showModal();
    }

    updateCoords = async () => {
        const arrLength = global.length;
        const locations = global.locations;

        let length = locations.length - arrLength;
        for (i = length; i >= 0; i--) {
            if (global.locations[i].coords.latitude !== global.locationOnStateChange.coords.latitude && global.locations[i].coords.longitude !== global.locationOnStateChange.coords.longitude) {
                await this.setState({
                    coords: [
                        ... this.state.coords,
                        {
                            latitude: global.locations[i].coords.latitude,
                            longitude: global.locations[i].coords.longitude,
                        }
                    ]
                }, () => {
                    console.log('updated array value locations[%d]', i);
                })
            }
        }
        global.length = 0;
        console.log('setting length to 0');
    }


    handleMapButtonPress = () => {
        this.setState({ isTracking: !this.state.isTracking }, () => {
            if (this.state.isTracking === true) {
                alert('beginning tracking');
                let interval = setInterval(() => {
                    if (this.state.isTracking === false) {
                        alert("stopping tracking");
                        clearInterval(interval);
                        this.showModal();
                    }
                    if (this.state.markerPosition.latitude !== global.locationOnStateChange.coords.latitude && this.state.markerPosition.longitude !== global.locationOnStateChange.coords.longitude) {
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

                        }, () => {
                            console.log('tracking updated');
                        })
                    }


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
                    ref={(map) => this._map = map}
                    initalRegion={this.state.region}
                    onRegionChangeComplete={this.onRegionChange.bind(this)}
                    onPress={this.handlePress}
                    showsMyLocationButton={true}
                    showsIndoorLevelPicker={false}
                    showsIndoors={false}

                >
                    <Marker.Animated
                        ref={(marker) => this._marker = marker}
                        coordinate={this.state.markerPosition}

                    >
                        <View style={styles.radius}>
                            <Image
                                source={{ uri: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t31.0-8/25182460_1751488461568556_3776172208600565036_o.jpg?_nc_cat=102&_nc_ht=scontent-lhr3-1.xx&oh=9f39c6acbd9244bbe2bf921fd9a2a86d&oe=5C96D314' }}
                                style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                            />
                        </View>
                    </Marker.Animated>
                    {/* {this.state.markers.map(marker => (
                        <Marker
                            coordinate={marker.coordinate}
                        />
                    ))} */}


                    <MapPolyline
                        coordinates={this.state.coords}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
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
                <View style={styles.modal}>
                    <PostRunModal modalVisible={false} coords={this.state.coords} ref={this.modalElement} />
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        height: 100 + "%",
        width: 100 + "%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    mapbtn: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        top: 520,
        left: 270,
        backgroundColor: '#fff',
        borderRadius: 40,
    },
    profiletop: {
        height: 10,
        width: 100 + '%',

    },
    radius: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,112,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0,223,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {

    }

});


export default Main;