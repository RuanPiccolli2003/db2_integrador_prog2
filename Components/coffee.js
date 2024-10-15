import React from "react";
import { Text } from "react-native";
import { View } from "react-native";


const Cat = (props) => {
    return(
        <View>
            <Text>Hello, im {props.name}</Text>
        </View>
    )
}


const Coffee = () => {
    return(
        <View>
            <Cat name="asd"/>
        </View>
    )
}



export default Coffee;
