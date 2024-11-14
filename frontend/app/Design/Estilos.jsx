import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  NavigationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  formulario: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  visua: {
    padding: "5",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "85%",
  },
  container: {
    flex: 1,
  },
  footer: {
    backgroundColor: "#ebf8ff",
    height: "100%",
  },
  camp: {
    justifyContent: "center",
    alignContent: 'center',
  },
  inp: {
    height: 50,
    width: '100%',
    marginTop: 10,  
    marginBottom: 10, 
    borderRadius: 10,
    backgroundColor: '#ebf8ff',  
    paddingLeft: 10,
    
  },
  cotacao: {
    height: 50,
    width: '100%',
    marginTop: 10,  
    marginBottom: 10, 
    borderRadius: 10,
    backgroundColor: '#ebf8ff',  
    paddingLeft: 10,
  },
  curr: {
    margin: 20,
    flexDirection: 'row',
    marginBottom: '10',
  }
});

export default styles;
