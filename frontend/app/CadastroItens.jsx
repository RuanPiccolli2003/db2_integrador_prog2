import React, { useState } from "react";
import { View, StyleSheet, TextInput, } from "react-native";
import { NativeBaseProvider, Heading, Input, Button, Select, CheckIcon } from "native-base";
import CurrencyInput from 'react-native-currency-input';
import axios from 'axios';
import { meuIPv4 } from "./index";
import { dominioAzure} from './index';
import { useNavigation } from '@react-navigation/native';
import styles from "./Design/Estilos";

function CadastroItem() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [preco, setPreco] = useState("");
  const [loading, setLoading] = useState(false);

  const cadastrarItem = async () => {
    if (tipo.toLowerCase() !== 'bebida' && tipo.toLowerCase() !== 'prato') {
      alert("Tipo deve ser Bebida ou Prato");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${dominioAzure}/itemcardapio`, {
        nome: nome,
        tipo: tipo,
        preco: preco,
      });

      alert("Item cadastrado com sucesso!");
      setNome("");
      setTipo("");
      setPreco("");
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
        <Heading margin={10}>Cadastrar Item</Heading>

        <TextInput
          style={styles.inp}
          placeholder="Nome do Item"
          value={nome}
          onChangeText={setNome}
        />

        <Select
          style={styles.inp}
          placeholder="Tipo: Selecionar"
          selectedValue={tipo}
          onValueChange={setTipo}
          _selectedItem={{
            bg: "gray.200",
            endIcon: <CheckIcon size="5" />,
          }}
        >
          <Select.Item label="Bebida" value="Bebida" />
          <Select.Item label="Prato" value="Prato" />
        </Select>

        <CurrencyInput
          style={styles.inp}
          placeholder="Valor R$ 0,00"
          value={preco}
          onChangeValue={setPreco}
          delimiter="."
          separator=","
          precision={2}
          prefix="R$ "
        />

        <Button
          onPress={cadastrarItem}
          isLoading={loading}
          style={styles.button}
          _text={{ fontWeight: "bold" }}
        >
          Cadastrar Item
        </Button>
      </NativeBaseProvider>
    </View>
  );
}



export default CadastroItem;
