import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

class Login extends React.Component{

    login(){
        this.props.navigation.navigate("Main");
    }


    render(){
        return(
            <TouchableOpacity style={{
                height: 100 + "%",
                width: 100 + "%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
            onPress={() => {
                this.login();
            }}
            >
                <Text>This is the Login Page</Text>
            </TouchableOpacity>
        )
    }
}

export default Login;