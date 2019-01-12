import React from "react";
import { StyleSheet } from "react-native";

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
    profiletop:{
        height:10,
        width: 100 + '%',
        
    },
    radius:{
        height:60,
        width: 60,
        borderRadius: 60/2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0,112,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0,223,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },

});

export { styles };