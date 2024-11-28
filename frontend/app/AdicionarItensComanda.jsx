import React, { useEffect, useState } from "react";
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { NativeBaseProvider, Heading, Input, Button } from "native-base";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

import { dominioAzure } from "./index";

function AdicionarItensComanda() {
  const navigation = useNavigation();

  const [id_comanda, setId_comanda] = useState("");
  const [id_item, setId_item] = useState("");
  const [itemNome, setItemNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoItem, setPrecoItem] = useState(0);
  const [total, setTotal] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [itens, setItens] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { id_comanda: comandaId } = route.params || {};

  useEffect(() => {
    if (comandaId) {
      setId_comanda(comandaId);
    }
  }, [comandaId]);

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

  const adicionarAoCarrinho = () => {
    if (!id_item || !quantidade) {
      alert("Selecione um item e quantidade válidos.");
      return;
    }

    const novoItem = {
      id_item,
      itemNome,
      quantidade,
      precoItem,
      total: precoItem * quantidade,
    };
    setCarrinho([...carrinho, novoItem]);

    setId_item("");
    setItemNome("");
    setQuantidade("");
    setPrecoItem(0);
    setTotal(0);
  };

  const removerDoCarrinho = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  const enviarPedidos = async () => {
    if (carrinho.length === 0) {
      alert("Adicione itens ao carrinho antes de enviar.");
      return;
    }

    setLoading(true);
    try {
      await Promise.all(
        carrinho.map((item) =>
          axios.post(`${dominioAzure}/pedido`, {
            id_comanda,
            id_item: item.id_item,
            quantidade: item.quantidade,
          })
        )
      );
      alert("Pedidos enviados com sucesso!");
      setCarrinho([]);
    } catch (error) {
      alert("Erro ao enviar pedidos.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Heading size="lg" style={styles.heading}>
          Adicionar itens à comanda: {id_comanda}
        </Heading>

        <TouchableOpacity onPress={buscarItens} style={styles.inputContainer}>
          <Input
            placeholder="Selecione o Item"
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
          value={`Unidade(s): ${quantidade}`}
          onChangeText={(text) => {
            const apenasInteiro = text.replace(/[^0-9]/g, '');
            setQuantidade(apenasInteiro);
          }}
          style={styles.input}
        />

        <Input placeholder="Total" value={`R$ ${total}`} isReadOnly style={styles.input} />

        <Button onPress={adicionarAoCarrinho} style={styles.button}>
          Adicionar ao Carrinho
        </Button>

        <FlatList
          data={carrinho}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.cartItem}>
              <Text style={styles.cartText}>
                {`${item.itemNome} - ${item.quantidade}x - R$ ${item.total.toFixed(2).replace('.', ',')}`}
              </Text>              
              <Button size="sm" colorScheme="red" onPress={() => removerDoCarrinho(index)}>
                Remover
              </Button>
            </View>
          )}
        />
        <Button onPress={enviarPedidos} isLoading={loading} style={styles.submitButton}>
          Enviar Pedidos
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
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cartText: {
    flex: 1,
    fontSize: 14,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: "#28a745",
  },
});

export default AdicionarItensComanda;
