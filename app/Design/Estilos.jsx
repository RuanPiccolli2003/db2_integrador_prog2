import { StyleSheet } from "react-native";

//estilo em que todas as paginas irão ter

const styles = StyleSheet.create({
  NavigationContainer: {
    flex: 1,
    backgroundColor: '#E9967A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },

  InputArea:{
    gap: 15,
    flexDirection: 'col',
    width: '50%',
    height: 50,
    backgroundColor: 'white',
    
  },

  Input:{
    width: '95%',
    height: 50,
    backgroundColor: 'white',
    fontSize: 20,
    padding: 5,

    textAlign: 'center',

    
  },

  Input2:{
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    fontSize: 20,
    padding:10,
    

  },

  
  




});


export default styles