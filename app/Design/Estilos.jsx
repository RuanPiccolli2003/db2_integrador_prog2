import { Card, Center, Container, Flex, Row } from "native-base";
import { StyleSheet } from "react-native";
import { ScreenWidth } from "react-native-elements/dist/helpers";

//estilo em que todas as paginas irão ter

const styles = StyleSheet.create({
  NavigationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    
  },

  formulario:{
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  
  
  
  visua:{
  padding: "5",
  alignItems: "center",

  },

  




});


export default styles