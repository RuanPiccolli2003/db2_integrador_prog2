import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { NativeBaseProvider, Heading, Select, CheckIcon, Input, Button, Modal } from "native-base";
import CurrencyInput from 'react-native-currency-input';
import axios from 'axios';
import { meuIPv4 } from "./index";
import styles from "./Design/Estilos"
import { useNavigation, useRoute } from '@react-navigation/native';

const AlterarPedidoComanda = () => {
    const [id_pedido, setId_pedido] = useState('');
    const [id_comanda, setId_comanda] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [id_item, setId_item] = useState("");
    const [itemNome, setItemNome] = useState("");
    const [itemNomeArmazenar, setItemNomeArmazenar] = useState("");
    const [quantidade, setQuantidade] = useState(1);
    const [precoItem, setPrecoItem] = useState(0);
    const [total, setTotal] = useState(0);
    const [somaprecototal, setSomaprecototal] = useState(0);
    const [status, setStatus] = useState('');
    const [destino, setDestino] = useState('');
    const [comandaStatus, setComandaStatus] = useState('');
    const [itens, setItens] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);

    const route = useRoute();
    const navigation = useNavigation();
    const { id_pedido: pedidoId } = route.params || {};

    useEffect(() => {
        if (pedidoId) {
            setId_pedido(pedidoId);
        }
    }, [pedidoId]);

    useEffect(() => {
        if (pedidoId) {
            axios.get(`http://${meuIPv4}:3000/pedido/${pedidoId}`)
                .then(response => {
                    if (response.data) {
                        setId_item(response.data.id_item || "");
                        setId_comanda(response.data.id_comanda || "");
                        setQuantidade(response.data.quantidade || 1);
                        setSomaprecototal(response.data.somaprecototal || 0);
                        setStatus(response.data.status || "");
                        setDestino(response.data.destino || "");
                    }
                })
                .catch(error => console.error('Erro ao buscar item do pedido', error));
        }
    }, [pedidoId]);

    useEffect(() => {
        if (id_item) {
            axios.get(`http://${meuIPv4}:3000/itemcardapio/${id_item}`)
                .then(response => {
                    if (response.data) {
                        setPrecoItem(response.data.preco);
                        setItemNome(response.data.nome);
                    }
                })
                .catch(error => console.error('Erro ao buscar o preço do item', error));
        }
    }, [id_item]);

    useEffect(() => {
        if (id_comanda) {
            axios.get(`http://${meuIPv4}:3000/comanda/${id_comanda}`)
                .then(response => {
                    if (response.data) {
                        setComandaStatus(response.data.status || "");
                    }
                })
                .catch(error => console.error('Erro ao buscar status da comanda', error));
        }
    }, [id_comanda]);

    useEffect(() => {
        const totalPreco = quantidade * precoItem;
        setTotal(totalPreco.toFixed(2));
    }, [quantidade, precoItem]);

    const buscarItens = async () => {
        try {
            const response = await axios.get(`http://${meuIPv4}:3000/itemcardapio`);
            setItens(response.data || []);
            setMostrarModal(true);
        } catch (error) {
            console.error('Erro ao buscar itens', error);
        }
    };

    const alterarItem = async () => {
        if (comandaStatus === 'Fechada') {
            alert("Não é possível alterar itens de uma comanda fechada");
            return;
        }

        if (!id_pedido) {
            alert("Deve informar o Id do Pedido");
            return;
        }

        setLoading(true);

        try {
            await axios.put(`http://${meuIPv4}:3000/pedido/${pedidoId}`, {
                id_item,
                quantidade,
                status,
                destino
            });
            alert("Item alterado na comanda!");
        } catch (error) {
            alert("Erro ao vincular item à comanda");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.NavigationContainer}>
          <NativeBaseProvider style={styles.base}>
            <Heading margin={5}>Alterar itens Comanda: {id_comanda} Pedido: {pedidoId}</Heading>
            <TouchableOpacity onPress={buscarItens}>
              <Input
                style={styles.inp}
                backgroundColor={'blue.100'}
                placeholderTextColor={"black"}
                justifyContent={"center"}
                h="50"
                marginTop={5}
                marginBottom={5}
                placeholder="Selecione o Item"
                keyboardType="numeric"
                value={`Item: ${itemNome}`}
                isReadOnly
                overflow='hidden'
              />
            </TouchableOpacity>
    
            <Modal visible={mostrarModal} animationType="slide" onRequestClose={() => setMostrarModal(false)}>
              <View style={{ padding: 20 }}>
                <FlatList
                  data={itens}
                  keyExtractor={(item) => item.id_item.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { setId_item(item.id_item); setItemNome(item.nome); setMostrarModal(false); }}>
                      <Text>{`Item: ${item.nome}`} - {`Tipo: ${item.tipo}`} - {`Preço: ${item.preco}`}</Text>
                    </TouchableOpacity>
                  )}
                />
                <Button onPress={() => setMostrarModal(false)}>Fechar</Button>
              </View>
            </Modal>
    
            <Input
              style={styles.inp}
              backgroundColor={'blue.100'}
              placeholderTextColor={"black"}
              justifyContent={"center"}
              h="50"
              marginTop={5}
              marginBottom={5}
              placeholder="Quantidade"
              keyboardType="numeric"
              value={`Unidade(s): ${quantidade}`}
              onChangeText={(text) => {
                const apenasInteiro = text.replace(/[^0-9]/g, '');
                setQuantidade(apenasInteiro);
              }}
              overflow='hidden'
            />
    
            <Input
              style={styles.inp}
              backgroundColor={'gray.200'}
              placeholderTextColor={"black"}
              justifyContent={"center"}
              h="50"
              marginTop={5}
              marginBottom={5}
              placeholder="Total"
              value={`Preço Total: R$ ${total}`}
              isReadOnly={true}
              overflow='hidden'
            />
    
            <Select
              style={styles.inp}
              backgroundColor={'blue.100'}
              placeholderTextColor={"black"}
              justifyContent={"center"}
              h="50"
              marginTop={5}
              marginBottom={5}
              placeholder="Status: Selecionar"
              selectedValue={status}
              onValueChange={setStatus}
              overflow='hidden'
              _selectedItem={{
                bg: "blue.200",
                endIcon: <CheckIcon size="5" />,
              }}
            >
              <Select.Item label="Produzindo" value={"Produzindo"} />
              <Select.Item label="Entregue" value="Entregue" />
            </Select>
    
            <Button
              style={{
                width: '50%',
                alignItems: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 30,
              }}
              isLoading={loading}
              onPress={alterarItem}
            >
              Adicionar itens na comanda
            </Button>
          </NativeBaseProvider>
        </View>
      );
    }

export default AlterarPedidoComanda;
