import React, { useEffect, useState } from "react";
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { NativeBaseProvider, Heading, Input, Button, Select, CheckIcon } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from 'axios';

import { dominioAzure } from "./index";s

function AlterarItensComanda() {
  const navigation = useNavigation();

  const [id_comanda, setId_comanda] = useState("");
  const [id_item, setId_item] = useState("");
  const [itemNome, setItemNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoItem, setPrecoItem] = useState(0);
  const [total, setTotal] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itens, setItens] = useState([]);
  const [pedidostatus, setPedidostatus] = useState("Registrado");
  const [exibirStatus, setExibirStatus] = useState(true);

  const route = useRoute();

  const { 
    id_comanda: comandaId, 
    id_pedido: pedidoId, 
    iditemcapturado, 
    itemnomecapturado, 
    quantidadecapturado,
    statuspedidocapturado,
  } = route.params || {};

  useEffect(() => {
    if (comandaId) {
      setId_comanda(comandaId);
    }
    if (iditemcapturado) {
      setId_item(iditemcapturado);
      setExibirStatus(false); 
    }
    if (itemnomecapturado) {
      setItemNome(itemnomecapturado);
    }
    if (quantidadecapturado) {
      setQuantidade(quantidadecapturado);
    }
    if (statuspedidocapturado) {
      setPedidostatus(statuspedidocapturado);
    }
  }, [comandaId, iditemcapturado, itemnomecapturado, quantidadecapturado, statuspedidocapturado]);

  console.log(comandaId);


  useEffect(() => {
    const totalPreco = quantidade ? precoItem * parseInt(quantidade, 10) : 0;
    setTotal(totalPreco.toFixed(2));
  }, [quantidade, precoItem]);

  const buscarItens = async () => {
    try {
      const response = await axios.get(`${dominioAzure}/itemcardapio`);
      setItens(response.data);
      setMostrarModal(true);
    } catch (error) {
      console.error("Erro ao buscar itens", error);
    }
  };

  const alterarPedido = async () => {
    if (!id_item || !quantidade) {
      alert("Selecione um item e quantidade válidos.");
      return;
    }

    const data = {
      id_comanda: comandaId,
      id_item: id_item,
      quantidade: quantidade,
      status: pedidostatus, 
    };

    try {
      if (pedidoId) {
        await axios.put(`${dominioAzure}/pedido/${pedidoId}`, data);
        alert("Pedido alterado com sucesso!");
        navigation.navigate("Visualizar Comanda Completa", { id_comanda: comandaId });
        setId_comanda("");
        setItemNome("");
        setQuantidade("");
        setTotal("");
        setPedidostatus("");
      } else {
        alert("ID do pedido não encontrado.");
      }
    } catch (error) {
      alert("Erro ao alterar pedido.");
      console.error(error);
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Heading size="lg" style={styles.heading}>
          Alterar item do Pedido: {pedidoId || "Novo Pedido"}
        </Heading>

        <TouchableOpacity onPress={buscarItens} style={styles.inputContainer}>
          <Input
            placeholder={`Item Atual: ${itemnomecapturado}`}
            value={itemNome}
            isReadOnly
            style={styles.input}
          />
        </TouchableOpacity>

        <Modal
          visible={mostrarModal}
          animationType="slide"
          onRequestClose={() => setMostrarModal(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={itens}
              keyExtractor={(item) => item.id_item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => {
                    setId_item(item.id_item);
                    setItemNome(item.nome);
                    setPrecoItem(item.preco);
                    setMostrarModal(false);
                  }}
                >
                  <Text style={styles.itemText}>{`${item.nome} - R$ ${item.preco}`}</Text>
                </TouchableOpacity>
              )}
            />
            <Button onPress={() => setMostrarModal(false)} style={styles.closeButton}>
              Fechar
            </Button>
          </View>
        </Modal>

        <Input
          placeholder="Quantidade"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={(text) => {
            const apenasInteiro = text.replace(/[^0-9]/g, "");
            setQuantidade(apenasInteiro);
          }}
          style={styles.input}
        />

        <Input placeholder="Total" value={`R$ ${total}`} isReadOnly style={styles.input} />

        <Button onPress={alterarPedido} style={styles.button}>
          Alterar Pedido
        </Button>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    marginVertical: 8,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 16,
  },
  statusContainer: {
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  select: {
    marginTop: 4,
  },
});

export default AlterarItensComanda;
