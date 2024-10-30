import { Card, Center, Container, Flex } from "native-base";
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
  conteudo:{
    flex: 1,
    justifyContent: 'center',
    alignItems:  'center',
    alignContent: 'center',
    
  },
  container:{
    backgroundColor: "white",
    borderRadius: 15,
    justifyContent: "top",
    alignItems: "left",
    alignContent: "center",
    
  },
  input:{
    backgroundColor: "red"


  },

  B_mod:{
  
    width: "15%"

  }
  
  
  
  

  
  




});


export default styles