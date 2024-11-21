import React, { useEffect, useState } from "react";
import { View, Text, Modal, FlatList, TouchableOpacity } from "react-native";
import { NativeBaseProvider, Heading, Input, Button, Select, CheckIcon } from "native-base";
import styles from "./Design/Estilos";
import axios from 'axios';
import { meuIPv4 } from "./index";
import { useNavigation, useRoute } from '@react-navigation/native';

function AdicionarItensComanda() {
  const navigation = useNavigation();

  const [id_comanda, setId_comanda] = useState("");
  const [id_item, setId_item] = useState("");
  const [itemNome, setItemNome] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [precoItem, setPrecoItem] = useState(0);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('');
  const [destino, setDestino] = useState('');
  const [loading, setLoading] = useState(false);
  const [comandaStatus, setComandaStatus] = useState('');
  const [itens, setItens] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const route = useRoute();
  const { id_comanda: comandaId } = route.params || {};

  useEffect(() => {
    if (comandaId) {
      setId_comanda(comandaId);
    }
  }, [comandaId]);


  useEffect(() => {
    if (id_item) {
      axios.get(`http://${meuIPv4}:3000/itemcardapio/${id_item}`)
        .then(response => {
          if (response.data && response.data.preco) {
            setPrecoItem(response.data.preco);
            setItemNome(response.data.nome);
          }
        })
        .catch(error => {
          console.error('Erro ao buscar o preço do item', error);
        });
    }
  }, [id_item]);

  useEffect(() => {
    if (id_comanda) {
      axios.get(`http://${meuIPv4}:3000/comanda/${id_comanda}`)
        .then(response => {
          if (response.data && response.data.status) {
            setComandaStatus(response.data.status);
          }
        })
        .catch(error => {
          console.error('Erro ao buscar status da comanda', error);
        });
    }
  }, [id_comanda]);

  useEffect(() => {
    const totalPreco = quantidade ? precoItem * parseInt(quantidade, 10) : 0;
    setTotal(totalPreco.toFixed(2));
  }, [quantidade, precoItem]);

  useEffect(() => {
    const limparCampos = navigation.addListener('blur', () => {
      setId_comanda("");
      setItemNome("");
      setQuantidade(1);
      setPrecoItem(0);
      setStatus("");
    });

    return limparCampos;
  }, [navigation]);


  const buscarItens = async () => {
    try {
      const response = await axios.get(`http://${meuIPv4}:3000/itemcardapio`);
      setItens(response.data);
      setMostrarModal(true);
    } catch (error) {
      console.error('Erro ao buscar itens', error);
    }
  };

  const adicionaritem = async () => {
    if (comandaStatus === 'Fechada') {
      alert("Não é possível adicionar itens a uma comanda fechada");
      return;
    }

    if (!id_comanda) {
      alert("Deve informar o Id da comanda.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`http://${meuIPv4}:3000/pedido`, {
        id_comanda,
        id_item,
        quantidade,
        status,
        destino,
      });

      alert("Item vinculado a comanda!");
      console.log(response.data);
      setId_comanda(id_comanda);
      setId_item("");
      setItemNome("");
      setQuantidade(1);
      setPrecoItem(0);
      setTotal(0);
      setStatus('');
      setDestino('');
      setMostrarModal(false);
      navigation.navigate('Adicionar itens em comandas');
    } catch (error) {
      alert("Erro ao vincular item a comanda");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.NavigationContainer}>
      <NativeBaseProvider style={styles.base}>
        <Heading margin={10}>Adicionar itens comanda: {id_comanda}</Heading>

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

        <Button
          style={{
            width: '50%',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 30,
          }}
          isLoading={loading}
          onPress={adicionaritem}
        >
          Adicionar itens na comanda
        </Button>
      </NativeBaseProvider>
    </View>
  );
}

export default AdicionarItensComanda;
