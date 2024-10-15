import React from "react";
import { Text } from "react-native";
import { View } from "react-native-web";



const Cat = (props) =>{
    <View>
        <Text>hello, ím {props.name}</Text>
    </View>
}

export default Cat