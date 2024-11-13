import React, { useState } from "react";
import { View, Text } from "react-native";
import { NativeBaseProvider, Heading, Input, Button } from "native-base";
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
      navigation.navigate('Cadastro_Itens');
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
        <Heading margin={10}>Cadastrar Item</Heading>

        <Input
          style={styles.inp}
          backgroundColor={'blue.100'}
          placeholderTextColor={"black"}
          justifyContent={"center"}
          h="50"
          marginTop={5}
          placeholder="Nome do Item"
          value={nome}
          onChangeText={setNome}
        />

        <Input
          style={styles.inp}
          backgroundColor={'blue.100'}
          placeholderTextColor={"black"}
          justifyContent={"center"}
          h="50"
          marginTop={5}
          placeholder="Tipo (Bebida ou Prato)"
          value={tipo}
          onChangeText={setTipo}
        />

        <CurrencyInput
          style={styles.cotacao}
          backgroundColor={'blue.100'}
          placeholderTextColor={"black"}
          justifyContent={"center"}
          h="50"
          marginTop={5}
          placeholder="Valor R$ 0,00"
          value={preco}
          onChangeValue={setPreco}
          delimiter="."
          separator=","
          precision={2}
          prefix="R$ "
        />

        <Button
          style={{
            width: '30%',
            alignItems: 'center',
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
