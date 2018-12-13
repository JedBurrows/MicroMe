import React from 'react';
import { View, Text, Stylesheet } from 'react-native';
import { TabContainer } from "./Navigation";


class MicroMe extends React.Component{

    render(){
        return (
            <View>
                <Text>Hello</Text>
                <TabContainer />
            </View>
        );
    }
}

export default MicroMe;