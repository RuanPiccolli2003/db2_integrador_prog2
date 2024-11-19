import React, { useState } from "react";
import { View, Text } from "react-native";
import { NativeBaseProvider, Heading, Input, Button, Select, CheckIcon } from "native-base";
import styles from "./Design/Estilos";
import CurrencyInput from 'react-native-currency-input';
import axios from 'axios';
import { meuIPv4 } from "./index";
import { useNavigation } from '@react-navigation/native';

function Cadastro_item() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(false);

  const cadastrarItem = async () => {
    if (tipo.toLowerCase() !== 'bebida' && tipo.toLowerCase() !== 'prato') {
      alert("Tipo deve ser Bebida ou Prato");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`http://${meuIPv4}:3000/itemcardapio`, {
        nome: nome,
        tipo: tipo,
        preco: preco,
        quantidade: quantidade,
      });

      alert("Item cadastrado com sucesso!");
      console.log(response.data);
      setNome("");
      setTipo("");
      setPreco(0);
      navigation.navigate('Cadastrar Itens');
    } catch (error) {
      alert("Erro ao cadastrar o item");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.NavigationContainer}>
      <NativeBaseProvider style={styles.base}>
        <Heading marginTop={20} marginBottom={10} textAlign="center">Cadastrar Item</Heading>

        <Input
          style={styles.inp}
          backgroundColor="blue.100"
          placeholderTextColor="black"
          justifyContent="center"
          h="50"
          marginTop={5}
          marginBottom={5}
          placeholder="Nome do Item"
          value={nome}
          onChangeText={setNome}
          overflow="hidden"
        />

        <Select
          style={styles.inp}
          backgroundColor="blue.100"
          placeholderTextColor="black"
          justifyContent="center"
          h="50"
          marginTop={5}
          marginBottom={5}
          placeholder="Tipo: Selecionar"
          selectedValue={tipo}
          onValueChange={setTipo}
          overflow="hidden"
          _selectedItem={{
            bg: "blue.200",
            endIcon: <CheckIcon size="5" />,
          }}
        >
          <Select.Item label="Bebida" value="Bebida" />
          <Select.Item label="Prato" value="Prato" />
        </Select>

        <CurrencyInput
          style={{
            ...styles.inp,
            borderWidth: 1,         
            borderColor: '#ebf8ff',
            paddingLeft: 10,        
            paddingRight: 10,      
            backgroundColor: '#ebf8ff',
            height: 50,            
            width: 210,
          }}
          placeholderTextColor="black"
          justifyContent="center"
          h="50"
          marginTop={5}
          marginBottom={5}
          placeholder="Valor R$ 0,00"
          keyboardType="numeric"
          value={preco}
          onChangeValue={setPreco}
          delimiter="."
          separator=","
          precision={2}
          prefix="R$ "
          overflow="hidden"
        />
        
        <Button
          style={{
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 20,
          }}
          isLoading={loading}
          onPress={cadastrarItem}
        >
          Cadastrar Item
        </Button>
      </NativeBaseProvider>
    </View>
  );
}

export default Cadastro_item;
