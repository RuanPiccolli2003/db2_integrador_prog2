import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { NativeBaseProvider, Heading, Button, VStack } from "native-base";
import CurrencyInput from 'react-native-currency-input';
import axios from 'axios';
import { dominioAzure } from './index';
import { useNavigation } from '@react-navigation/native';

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
      await axios.post(`${dominioAzure}/itemcardapio`, {
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
    <View style={styles.container}>
      <NativeBaseProvider>
        <Heading style={styles.heading}>Cadastrar Item</Heading>

        <TextInput
          style={styles.input}
          placeholder="Nome do Item"
          value={nome}
          onChangeText={setNome}
        />

        <VStack space={4}>
          <View style={styles.buttonGroup}>
            <Button
              style={[
                styles.buttonTipo,
                tipo === "Bebida" ? styles.buttonSelected : null,
              ]}
              onPress={() => setTipo("Bebida")}
            >
              Bebida
            </Button>
            <Button
              style={[
                styles.buttonTipo,
                tipo === "Prato" ? styles.buttonSelected : null,
              ]}
              onPress={() => setTipo("Prato")}
            >
              Prato
            </Button>
          </View>
        </VStack>

        <CurrencyInput
          style={styles.input}
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
          style={styles.buttonSubmit}
          _text={{ fontWeight: "bold" }}
        >
          Cadastrar Item
        </Button>
      </NativeBaseProvider>
    </View>
  );
}

export default CadastroItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  buttonTipo: {
    flex: 1,
    height: 50,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  buttonSelected: {
    backgroundColor: "#007bff",
    borderColor: "#0056b3",
  },
  buttonSubmit: {
    marginTop: 20,
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 8,
  },
});
